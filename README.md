# textlint-rule-ja-hiragana-fukushi

Check easy-to-read Fukushi(adverbs) written in Hiragana than Kanji.

漢字よりもひらがなで表記したほうが読みやすい副詞を指摘します。検出には形態素解析を使っています。自動修正にも対応しています。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-hiragana-fukushi

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-hiragana-fukushi": true
    }
}
```

Or you can specify custom dictionary as follows:

```json
{
    "rules": {
        "ja-hiragana-fukushi": {
          "rulePath": "path/to/fukushi.yml"
        }
    }
}
```

Via CLI

```
textlint --rule ja-hiragana-fukushi README.md
```

### Fixable

```
textlint --fix ja-hiragana-fukushi README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

    npm test


### List

| from | to |
| --- | --- |
| 生憎 | あいにく |
| 敢えて | あえて |
| 飽くまで | あくまで |
| 飽く迄 | あくまで |
| 一旦 | いったん |
| 薄々 | うすうす |
| 予め | あらかじめ |
| 粗方 | あらかた |
| 改めて | あらためて |
| 如何に | いかに |
| 如何にも | いかにも |
| 徒に | いたずらに |
| いち早く | いちはやく |
| 未だに | いまだに |
| 苟も | いやしくも |
| 言わば | いわば |
| 薄々 | うすうす |
| 概ね | おおむね |
| 押し並べて | おしなべて |
| 押しなべて | おしなべて |
| 自ずから | おのずから |
| 自ずと | おのずと |
| 凡そ | およそ |
| 却って | かえって |
| 且つ | かつ |
| 嘗て | かつて |
| 予て | かねて |
| 悉く | ことごとく |
| 尽く | ことごとく |
| 細々 | こまごま |
| 更に | さらに |
| 頻りに | しきりに |
| 暫く | しばらく |
| 所詮 | しょせん |
| 頗る | すこぶる |
| 既に | すでに |
| 精一杯 | せいいっぱい |
| 折角 | せっかく |
| 是非 | ぜひ |
| 是非とも | ぜひとも |
| 沢山 | たくさん |
| 立ち所に | たちどころに |
| 仮令 | たとえ |
| 縦令 | たとえ |
| 丁度 | ちょうど |
| 篤と | とくと |
| 土台 | どだい |
| 取り分け | とりわけ |
| 何故 | なぜ |
| 偏に | ひとえに |
| 一際 | ひときわ |
| 一入 | ひとしお |
| 一先ず | ひとまず |
| 独りでに | ひとりでに |
| 殆ど | ほとんど |
| 正しく | まさしく |
| 正に | まさに |
| 況して | まして |
| 先ず | まず |
| 丸で | まるで |
| 満更 | まんざら |
| 無碍に | むげに |
| 寧ろ | むしろ |
| 無理矢理 | 無理やり |
| 滅法 | めっぽう |
| 若しも | もしも |
| 若しくは | もしくは |
| 勿論 | もちろん |
| 最も | もっとも |
| 元々 | もともと |
| 素より | もとより |
| 最早 | もはや |
| 矢張り | やはり |
| 矢っ張り | やっぱり |
| 漸く | ようやく |
| 余程 | よほど |
| 僅かに | わずかに |

## License

MIT © Hiroshi Takase
