---
date: 2019-03-15
title: tslintから移行する
description: Nuxt v2.4.0台である当ブログのTS化に伴い @typescript-eslint/eslint-plugin を採用します。

slug: switched-tslint-to-typescript-eslint-plugin
category: Front
tags: 
 - TypeScript
---

## 実質公式のアナウンスメント

先日 ESLintチームが ESLintの TS対応に本腰を入れるという宣言がなされました。時代は今後、 ESLintに傾く可能性が高く、 tslintから @typescript-eslint/eslint-pluginを使うよう変更します。

<a class="link-preview" href="https://eslint.org/blog/2019/01/future-typescript-eslint">Future TypeScript ESLint</a>

```bash
yarn add @typescript-eslint/eslint-plugin eslint eslint-loader eslint-plugin-vue -D
yarn add @types/webpack
```

.eslintrc.jsも適宜変更、 `eslint:recommended` で ESLint Configを設定します。さらに Pluginには `@typescript-eslint` を追加し最低限 TypeScriptを使用する準備が整います。

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    'no-undef': 'error',
    'typeof': false,
    'strictFunctionTypes': false
  }
}
```

### これから使ってみて、という感じでした！

基本的な設定で、無事に動作することを確認しました。一人ひとりのエンジニアが必要に応じて手動で追加する要領で問題無さそうです。今後、 ESLintチームとしてサポートを拡大するとのことなのでそれに期待しましょう。

