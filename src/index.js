"use strict";

const fs = require('fs');
const kuromojin = require("kuromojin");
const createMatcher = require("morpheme-match-all");
const yaml = require('js-yaml');
const data = yaml.safeLoad(fs.readFileSync(__dirname + "/../dict/fukushi.yml", 'utf8'));

let dictionaries = [];

data.dict.forEach(function (item) {
  var form = "";
  item.tokens.forEach(function (token) {
    form += token.surface_form;
  });
  dictionaries.push({
    message: data.message + ": \"" + form + "\" > \"" + item.fix_form + "\"",
    fix: item.fix_form,
    tokens: item.tokens
  });
});

const matchAll = createMatcher(dictionaries);

function reporter(context, options = {}) {
    const {Syntax, RuleError, report, getSource, fixer} = context;
    return {
      [Syntax.Str](node){ // "Str" node
        const text = getSource(node); // Get text
        return kuromojin(text).then((actualTokens) => {
          const results = matchAll(actualTokens);
/*
          console.log("/-----------------------");
          console.log(actualTokens);
          console.log(results);
          console.log("-----------------------/");
*/
          if (results.length == 0) {
            return;
          }

          results.forEach(function (result) {
            let tokenIndex = result.index;
            let index = getIndexFromTokens(tokenIndex, actualTokens);
            let replaceFrom = "";
            result.tokens.forEach(function(token){
              replaceFrom += token.surface_form;
            });
            let replaceTo = fixer.replaceTextRange([index, index + replaceFrom.length], result.dict.fix);
            let ruleError = new RuleError(result.dict.message, {
              index: index,
              fix:   replaceTo // https://github.com/textlint/textlint/blob/master/docs/rule-fixable.md
            });
            //console.log(node);
            //console.log("-----------------------");
            //console.log(result);
            report(node, ruleError);
          });
        });
      }
    }
};

function getIndexFromTokens(tokenIndex, actualTokens) {
  let index = 0;
  for ( let i = 0; i < tokenIndex; i++) {
    index += actualTokens[i].surface_form.length;
  }
  return index;
}

module.exports = {
  linter: reporter,
  fixer: reporter
};

