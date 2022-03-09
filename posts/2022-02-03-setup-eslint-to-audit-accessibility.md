---
date: 2022-02-03
title: eslint-plugin-jsx-a11y を導入する
description: eslint-plugin-jsx-a11y を導入する際に気を付けることを簡単に書かせていただいた。
slug: setup-eslint-to-audit-accessibility
reaction: 🔦
category: Front
tags: 
 - A11Y
 - React
 - TypeScript
---

## eslint-plugin-jsx-a11y を導入する

当方 React (CRA/Vite) のプロジェクトにおけるアクセシビリティを考慮するため [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) をインストールすることとした。

```bash
# npm
npm i -D eslint-plugin-jsx-a11y

# yarn
yarn add -D eslint-plugin-jsx-a11y
```

### 実際に導入する

下記のように `.eslintrc.js` の `extends` と `plugins` に設定する。

```js
module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
}
```

### ルールセット

ルールセットは 2 種類ある。

- `jsx-a11y/recommended`
- `jsx-a11y/strict`

基本的にどちらのルールセットを使っても構わない。

対応ルール全てエラーと認識してくれる一方、一部ルールではエラーと見做さないケースも設定できたりなど、弾力的に運用できる。

まず、マウスやキーイベントのリスナーなどに role を付ける。

該当のルールは下記の通りです。

- no-static-element-interactions
- no-interactive-element-to-noninteractive-role

次に、非対話型の HTML 要素や WAI-ARIA ロールはマウスやキーイベントのハンドラーをサポートしないので role を付ける。

::: message is-primary

#### 非対話型の HTML 要素

- `<main>`
- `<area>`
- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`
- `<p>`
- `<img>`
- `<li>`
- `<ul>`
- `<ol>`

#### 非対話型の WAI-ARIA ロール

- `<article>`
- `<banner>`
- `<complementary>`
- `<img>`
- `<listitem>`
- `<main>`
- `<region>`
- `<tooltip>`

:::

該当のルールは下記の通りです。

- no-noninteractive-element-interactions
- no-noninteractive-element-to-interactive-role

最後に th 要素のみ scope を許容する。

該当のルールは scope です。

## あらゆる warning を解決する

eslint-plugin-jsx-a11y　を読み込んで `eslint --fix` してみる。

```bash
# eslint
npx eslint . --ext ts,tsx --fix
```

修正すべき warning に遭遇しなければ、導入完了とみて問題無いだろう。しかし、いくつかの warning に遭遇することがある。

具体的には `div` などに代表される静的な HTML 要素で `onClick` イベントを使ってしまっているケースなどが挙げられる。

### `jsx-a11y/click-events-have-key-events`

`onClick` イベントを使う場合、マウスを使用できないユーザのために `onKeyUp` / `onKeyDown` / `onKeyPress` を考慮する必要がある。

もちろん 1 つも無ければ、アクセシビリティ的にアウトだ。

```tsx
const Component = () => (
  <div onClick={() => {}}>
    {/* 何らかのコンテンツ */}
  </div>

)
```

なお、広くボタン用途に使われる `button` 要素で `onClick` イベントを使用した方が良い。

この `button` 要素では既に `onKeyUp` / `onKeyDown` / `onKeyPress` が考慮されている。

```tsx
const Component = () => (
  <button onClick={() => {}}>
    {/* 何らかのコンテンツ */}
  </button>
)
```

### `jsx-a11y/no-static-element-interactions`

`div` など静的な HTML 要素でマウスやキーイベントを設定する場合に、要素の role 属性を設定する必要がある。

```tsx
const Component = () => (
  <div onClick={() => {}} role="button">
    {/* 何らかのコンテンツ */}
  </div>
)
```

onClick イベントと合わせて role 属性を設定しても特に問題は無い。

ただし、広くボタン用途で使われる `button` 要素に変更する選択肢を取った方が良い。

```tsx
const Component = () => (
  <button onClick={() => {}}>
    {/* 何らかのコンテンツ */}
  </button>
)
```

## 最後に

とあるプロジェクトで ESLint を設定した当初 70 近い warning を観測した。

```bash
✘ 68 problems (68 errors, 0 warnings)

Errors:
  29  jsx-a11y/click-events-have-key-events
  28  jsx-a11y/no-static-element-interactions
   5  jsx-a11y/aria-role
   2  jsx-a11y/media-has-caption
   2  jsx-a11y/anchor-is-valid
   1  jsx-a11y/no-autofocus
   1  jsx-a11y/no-noninteractive-element-interactions
```

しかし、そのどれもが同じようなエラーであるため、そこまで怖がる必要は無い。

アクセシビリティの ESLint に伴う `--fix` をビルド時に強制したことで、最低限の品質を担保させるようにした。

## その他

[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) でサポートされているルール一覧です。

視覚によるチェックでは確認しきれない部分を補うため、コードベースでコンポーネントごとに自動チェックする。

Rule | Recommended | Strict
------------ | ------------- | -------------
[alt-text](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/alt-text.md) | error | error
[anchor-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-has-content.md) | error | error
[anchor-is-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md) | error | error
[aria-activedescendant-has-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-activedescendant-has-tabindex.md) | error | error
[aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-props.md) | error | error
[aria-proptypes](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-proptypes.md) | error | error
[aria-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-role.md) | error | error
[aria-unsupported-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-unsupported-elements.md) | error | error
[autocomplete-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/autocomplete-valid.md) | error | error
[click-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/click-events-have-key-events.md) | error | error
[heading-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/heading-has-content.md) | error | error
[html-has-lang](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/html-has-lang.md) | error | error
[iframe-has-title](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/iframe-has-title.md) | error | error
[img-redundant-alt](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/img-redundant-alt.md) | error | error
[interactive-supports-focus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/interactive-supports-focus.md) | error | error
[label-has-associated-control](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/label-has-associated-control.md) | error | error
[media-has-caption](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/media-has-caption.md) | error | error
[mouse-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/mouse-events-have-key-events.md) | error | error
[no-access-key](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-access-key.md) | error | error
[no-autofocus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-autofocus.md) | error | error
[no-distracting-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-distracting-elements.md) | error | error
[no-interactive-element-to-noninteractive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-interactive-element-to-noninteractive-role.md) | error, with options | error
[no-noninteractive-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-noninteractive-element-interactions.md) | error, with options | error
[no-noninteractive-element-to-interactive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-noninteractive-element-to-interactive-role.md) | error, with options | error
[no-noninteractive-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-noninteractive-tabindex.md) | error, with options | error
[no-onchange](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-onchange.md) | error | error
[no-redundant-roles](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-redundant-roles.md) | error | error
[no-static-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-static-element-interactions.md) | error, with options | error
[role-has-required-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/role-has-required-aria-props.md) | error | error
[role-supports-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/role-supports-aria-props.md) | error | error
[scope](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/scope.md) | error, with options | error
[tabindex-no-positive](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/tabindex-no-positive.md) | error | error

<!--
### eslint-plugin-vuejs-accessibility

[eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility) でサポートされているルール一覧です。

視覚によるチェックでは確認しきれない部分を補うため、コードベースでコンポーネントごとに自動チェックする。

Rule | Recommended
------------ | -------------
[accessible-emoji](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/accessible-emoji.ts) | error
[alt-text](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/alt-text.ts) | error
[anchor-has-content](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/anchor-has-content.ts) | error
[aria-props](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/aria-props.ts) | error
[aria-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/aria-role.md) | error
[aria-unsupported-elements](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/aria-role.ts) | error
[click-events-have-key-events](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/click-events-have-key-events.ts) | error
[form-control-has-label](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/form-control-has-label.ts) | error
[heading-has-content](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/heading-has-content.ts) | error
[iframe-has-title](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/iframe-has-title.ts) | error
[interactive-supports-focus](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/interactive-supports-focus.ts) | error
[label-has-for](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/label-has-for.ts) | error
[media-has-caption](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/media-has-caption.ts) | error
[mouse-events-have-key-events](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/mouse-events-have-key-events.ts) | error
[no-access-key](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/no-access-key.ts) | error
[no-autofocus](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/no-autofocus.ts) | error
[no-distracting-elements](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/no-distracting-elements.ts) | error
[no-onchange](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/no-onchange.ts) | error
[no-redundant-roles](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/no-redundant-roles.ts) | error
[role-has-required-aria-props](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/role-has-required-aria-props.ts) | error
[tabindex-no-positive](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/HEAD/src/rules/tabindex-no-positive.ts) | error
-->
