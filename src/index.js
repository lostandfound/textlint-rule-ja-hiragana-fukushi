"use strict";

const fs = require("fs");
const kuromojin = require("kuromojin");
const createMatcher = require("morpheme-match-all");
const yaml = require("js-yaml");

const path = require("path");
const untildify = require("untildify");

const defaultOptions = {
  rulePath: __dirname + "/../dict/fukushi.yml"
};

function loadDictionaries(rulePath, baseDir) {
  if (typeof rulePath === "undefined" || rulePath ==="") {
    return null;
  }
  const expandedRulePath = untildify(rulePath);
  const dictionaries = [];
  const data = yaml.safeLoad(fs.readFileSync(path.resolve(baseDir, expandedRulePath), "utf8"));

  data.dict.forEach(function (item) {
    var form = "";
    item.tokens.forEach(function (token) {
      form += token.surface_form;
    });
    dictionaries.push({
      message: data.message + ": \"" + form + "\" => \"" + item.expected + "\"",
      fix: item.expected,
      tokens: item.tokens
    });
  });

  return dictionaries;
}

function reporter(context, userOptions = {}) {
  const options = Object.assign(defaultOptions, userOptions);
  const matchAll = createMatcher(loadDictionaries(options.rulePath, getConfigBaseDir(context)));
  const {Syntax, RuleError, report, getSource, fixer} = context;
  return {
    [Syntax.Str](node){ // "Str" node
      const text = getSource(node); // Get text
      return kuromojin.tokenize(text).then((actualTokens) => {
        const results = matchAll(actualTokens);

        if (results.length == 0) {
          return;
        }

        results.forEach(function (result) {
          const tokenIndex = result.index;
          const index = getIndexFromTokens(tokenIndex, actualTokens);
          let replaceFrom = "";
          result.tokens.forEach(function(token){
            replaceFrom += token.surface_form;
          });
          const replaceTo = fixer.replaceTextRange([index, index + replaceFrom.length], result.dict.fix);
          const ruleError = new RuleError(result.dict.message, {
            index: index,
            fix:   replaceTo // https://github.com/textlint/textlint/blob/master/docs/rule-fixable.md
          });
          report(node, ruleError);
        });
      });
    }
  };
}

function getIndexFromTokens(tokenIndex, actualTokens) {
  let index = 0;
  for ( let i = 0; i < tokenIndex; i++) {
    index += actualTokens[i].surface_form.length;
  }
  return index;
}

// from https://github.com/textlint-rule/textlint-rule-prh/blob/master/src/textlint-rule-prh.js#L147
const getConfigBaseDir = context => {
  if (typeof context.getConfigBaseDir === "function") {
    return context.getConfigBaseDir() || process.cwd();
  }
  const textlintRcFilePath = context.config ? context.config.configFile : null;
  return textlintRcFilePath ? path.dirname(textlintRcFilePath) : process.cwd();
};

module.exports = {
  linter: reporter,
  fixer: reporter
};

