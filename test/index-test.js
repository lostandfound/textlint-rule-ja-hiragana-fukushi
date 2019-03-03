"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "text",
    ],

    invalid: [
        // single match fukushi
        {
            text: "僕は生憎風流人よりもずつと多慾に生まれついてゐる。",
            output: "僕はあいにく風流人よりもずつと多慾に生まれついてゐる。",
            errors: [
                {
                    message: "ひらがなで表記したほうが読みやすい副詞: \"生憎\" => \"あいにく\"",
                    line: 1,
                    column: 3
                }
            ]
        },
        {
            text: "人は僅かに岩と浪との間を行く",
            output: "人はわずかに岩と浪との間を行く",
            errors: [
                {
                    message: "ひらがなで表記したほうが読みやすい副詞: \"僅かに\" => \"わずかに\"",
                    line: 1,
                    column: 3
                }
            ]
        },
        {
            text: "一旦初期設定に戻す",
            output: "いったん初期設定に戻す",
            errors: [
                {
                    message: "ひらがなで表記したほうが読みやすい副詞: \"一旦\" => \"いったん\"",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "既に解決した",
            output: "すでに解決した",
            errors: [
                {
                    message: "ひらがなで表記したほうが読みやすい副詞: \"既に\" => \"すでに\"",
                    line: 1,
                    column: 1
                }
            ]
        },
        // multiple match
        {
            text: `僕は敢えて怠っていると言う。

飽くまで平民の間にのみ存在し了解されているのである。`,
            output: `僕はあえて怠っていると言う。

あくまで平民の間にのみ存在し了解されているのである。`,
            errors: [
                {
                    message: "ひらがなで表記したほうが読みやすい副詞: \"敢えて\" => \"あえて\"",
                    line: 1,
                    column: 3
                },
                {
                    message: "ひらがなで表記したほうが読みやすい副詞: \"飽くまで\" => \"あくまで\"",
                    line: 3,
                    column: 1
                }
            ]
        }
    ]

});