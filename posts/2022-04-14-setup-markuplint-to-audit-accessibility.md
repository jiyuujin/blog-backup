---
date: 2022-04-14
title: 手始めに markuplint をさわってみる
description: 毎週木曜の昼に内々でアクセシビリティ勉強会を開催しています、今回は markuplint おさわり会と称して、実際に導入する際気を付けることを簡単に書かせていただいた。
slug: setup-markuplint-to-audit-accessibility
reaction: 🏇
category: Front
tags: 
 - A11Y
 - HTML5
 - TypeScript
 - React
---

下記の通り示す順に見ていくこととする。

- Lint とは
   - 効果的に Lint を使う
- markuplint とは
- markuplint を導入する
- markuplint 大きな特長を挙げる
- markuplint v2 とは

記事と合わせ [登壇スライド](https://docs.google.com/presentation/d/1vvkYKVMRt6pYJSZC2Fm_eFKYxjhrqchfqn6UJBKikfU/edit?usp=sharing) も作成している。

https://docs.google.com/presentation/d/1vvkYKVMRt6pYJSZC2Fm_eFKYxjhrqchfqn6UJBKikfU/edit?usp=sharing

## Lint とは

まず Lint について、各個人によってコードの書き方は様々。機械的に体裁を整えることを目指し JavaScript や TypeScript の体裁を整える ESLint から CSS の体裁を整える StyleLint が存在している。

そこに HTML の体裁を整える MarkupLint が新たに登場、実際に JavaScript フレームワークで利用可能となった。

## 効果的に Lint を使う

エディタの機能を利用できれば、とりあえず十分。

- VSCode の `editor.codeActionsOnSave` を利用する
- JetBrains IDE の `autoFix` を利用する
- Git Hook (Husky) を利用する

ただ、これらの機能を利用するにしても設定ファイル (ESLint なら .eslintrc 、 MarkupLint なら .markuplintrc) を準備する必要がある。

## markuplint とは

2021 年 1 月 [W3C](https://www.w3.org/) が HTML Living Standard を正式な勧告として発表。実際に [HTML Living Standard](https://html.spec.whatwg.org/multipage/) の仕様に準拠した HTML となっているかを機械的に検証してくれる。

一時期、その W3C を起因としたゴタゴタもあり、かつて勧告された HTML5 はこれを機に廃止へ向かった。

## markuplint を導入する

下記条件を踏まえてインストールを進める。

- ネーミングに関する規約を定める
- HTML 規格に準拠しているかチェックする
- コードスタイルをチェックする

マークアップを巡るアクセシビリティを考慮するため [markuplint](https://github.com/markuplint/markuplint) をインストールする。

```bash
npx markuplint --init

✔ Which do you use template engines? · No items were selected
✔ May I install them automatically? (y/N) · true
✔ Do you customize rules? (y/N) · true
✔ Are you going to conformance check according to HTML standard? (y/N) · true
✔ Are you going to do with accessibility better practices? (y/N) · true
✔ Are you going to set the convention about naming? (y/N) · true
✔ Are you going to check for the code styles? (y/N) · true

```

なお、ローカルに [markuplint](https://github.com/markuplint/markuplint) をインストールしていただいても構いません。

```bash
# npm
npm i -D markuplint

# yarn
yarn add -D markuplint
```

この markuplint に加え JavaScript フレームワークごとお世話となるプラグインが異なる。

- React では markuplint と合わせ `@markuplint/jsx-parser` や `@markuplint/react-spec` をインストールする
- Vue では markuplint と合わせ `@markuplint/vue-parser` や `@markuplint/vue-spec` をインストールする

各々、設定ファイル `.markuplintrc` の parser でインストールしたプラグインを読み込む。

## markuplint 大きな特長を挙げる

markuplint 公式ウェブサイトには、 [Accessibility](https://markuplint.dev/rules#accessibility) の項目が存在する。

https://markuplint.dev/rules#accessibility

### [landmark-roles](https://markuplint.dev/rules/landmark-roles)

`banner` , `main` , `complementary` and `contentinfo` がトップレベルのランドマークであるか警告する。

どのランドマークにも知覚できるコンテンツが存在するか警告する (Work in Progress)

### [required-h1](https://markuplint.dev/rules/required-h1)

文書内に h1 要素が存在しない場合に警告する。

### [wai-aria](https://markuplint.dev/rules/wai-aria)

role 属性や `aria-*` 属性が WAI-ARIA や "ARIA in HTML " の仕様に準拠していない場合に警告する。

::: message is-primary

#### 明確な違反

- 仕様に存在しないロールを使用する
- 抽象的なロールを使用する
- 設定されたロール (または暗黙のロール) に属さないプロパティまたはステートを使用する
- プロパティ/ステートの無効な値を使用する
- HTML の ARIA に従って許可されていないロールを使用する
- 必須のプロパティまたは状態を設定しない

#### 推奨されない

- 非推奨のプロパティまたは状態を設定する
- HTML の ARIA に従って明示的に暗黙的な役割を設定する
- HTML の ARIA に従って、その要素がそれに相当するセマンティックな HTML 属性を持つ場合、そのプロパティ/ステートを明示的に設定する

:::

## markuplint v2 とは

今年 1 月 12 日には v2 がリリースされた。

- ルールプリセット
  - [`markuplint:recommended`](https://markuplint.dev/configuration/#properties/extends) を利用する
- [`plugins`](https://markuplint.dev/configuration/#properties/plugins) オプション
  - より自分たちのルールに合わせて拡張可能
    - ESLint でやってきたようなサードパーティ製をやっていき
- その他
  - [`selector`](https://markuplint.dev/configuration/#properties/node-rules-&-child-node-rules/selector) プロパティ
  - [`regexSelector`](https://markuplint.dev/configuration/#properties/node-rules-&-child-node-rules/regex-selector) プロパティ

詳細は [v2.0.0](https://github.com/markuplint/markuplint/releases/tag/v2.0.0) をご確認いただきたい。

その内 `extends` オプションの提供開始は大きい。なお、現時点で提供されている `markuplint:recommended` 1 種類のみ。

```.markuplintrc
{
  "extends": ["markuplint:recommended"]
}
```

とりあえずこれを設定しておけば良さそうです。

また、ルール並びに CLI オプションも追加されている。

- [disallowed-element](https://markuplint.dev/rules/disallowed-element)
- [end-tag](https://markuplint.dev/rules/end-tag)
- [ineffective-attr](https://markuplint.dev/rules/ineffective-attr)
- [no-boolean-attr-value](https://markuplint.dev/rules/no-boolean-attr-value)
- [no-default-value](https://markuplint.dev/rules/no-default-value)
- [no-hard-code-id](https://markuplint.dev/rules/no-hard-code-id)
- [no-refer-to-non-existent-id](https://markuplint.dev/rules/no-refer-to-non-existent-id)
- [no-use-event-handler-attr](https://markuplint.dev/rules/no-use-event-handler-attr)
- [required-element](https://markuplint.dev/rules/required-element)

## その他

記事と合わせ [登壇スライド](https://docs.google.com/presentation/d/1vvkYKVMRt6pYJSZC2Fm_eFKYxjhrqchfqn6UJBKikfU/edit?usp=sharing) も作成している。

https://docs.google.com/presentation/d/1vvkYKVMRt6pYJSZC2Fm_eFKYxjhrqchfqn6UJBKikfU/edit?usp=sharing

### ルール一覧

|Rule|
|:---|
|[attr-duplication](https://next.markuplint.dev/rules/attr-duplication)|
|[character-reference](https://next.markuplint.dev/rules/character-reference)|
|[deprecated-attr](https://next.markuplint.dev/rules/deprecated-attr)|
|[deprecated-element](https://next.markuplint.dev/rules/deprecated-element)|
|[doctype](https://next.markuplint.dev/rules/doctype)|
|[id-duplication](https://next.markuplint.dev/rules/id-duplication)|
|[permitted-contents](https://next.markuplint.dev/rules/permitted-contents)|
|[required-attr](https://next.markuplint.dev/rules/required-attr)|
|[invalid-attr](https://next.markuplint.dev/rules/invalid-attr)|
|[landmark-roles](https://next.markuplint.dev/rules/landmark-roles)|
|[required-h1](https://next.markuplint.dev/rules/required-h1)|
|[wai-aria](https://next.markuplint.dev/rules/wai-aria)|
|[class-naming](https://next.markuplint.dev/rules/class-naming)|
|[attr-equal-space-after](https://next.markuplint.dev/rules/attr-equal-space-after)|
|[attr-equal-space-before](https://next.markuplint.dev/rules/attr-equal-space-before)|
|[attr-spacing](https://next.markuplint.dev/rules/attr-spacing)|
|[attr-value-quotes](https://next.markuplint.dev/rules/attr-value-quotes)|
|[case-sensitive-attr-name](https://next.markuplint.dev/rules/case-sensitive-attr-name)|
|[case-sensitive-tag-name](https://next.markuplint.dev/rules/case-sensitive-tag-name)|
|[indentation](https://next.markuplint.dev/rules/indentation)|
