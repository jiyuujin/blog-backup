---
date: 2019-05-15
title: Tailwind CSS 1.0 リリース
description: Tailwind CSS v1.0 リリースされました、奇しくも同日リリースとなった Nuxt v2.7も合わせて軽く。
slug: major-update-to-tailwindcss-v1
category: Front
tags: 
 - Nuxt
 - CSS
 - Vue
---

## Nuxt Adminとは

当ブログの問い合わせを管理するため、裏側の管理画面を自作、バックエンドに Firestoreを採用しています。ちなみに管理画面のフロントエンドでも　Vue.jsのフレームワークの一つNuxt.jsを採用しています。

<a class="link-preview" href="https://admin.nekohack.app/">https://admin.nekohack.app/</a>

## Tailwind CSS v1.0 🎉

今回は現 v0.7.4からアップデートすることになる訳ですが、詳しくは [Upgrade steps for all users](https://tailwindcss.com/docs/upgrading-to-v1/#upgrade-steps-for-all-users) をご覧ください。とりあえず v1に更新するにあたって以下、掻い摘んで記載しておきます。

### 明示的に読み込む必要が無くなった

tailwindcss.jsが tailwindcss.config.jsに変更、また postcss.config.jsでこの tailwindcss.config.jsを明示的に読み込む必要が無くなったので修正しておきます。

```js
module.exports = {
  plugins: [
-    require('tailwindcss')('./tailwind.js'),
+    require('tailwindcss'),
  ]
}
```

### インポート先が変更された

下記の通り修正してあげる必要があります。

```scss
- @tailwind preflight;
+ @tailwind base;
```

### 指定方法も、

postcss.config.jsを確認していただければお分かりになるかと思います。具体的な数字を付加、色の濃い/薄いの表現をこの付加された数字を使って実現するように変更されています。

```scss
-  @apply bg-blue text-white font-bold py-2 px-4 rounded;
+  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
```

## Nuxt v2.7 🎉

Adminだけではなく、当ブログでもフロントに Nuxtを採用、奇しくも同日 v2.7 リリースされました。

- 開発環境でのみSSR時もconsole.log()が確認できるようになった
- storeのウォッチ対象が追加、serverMiddlewareのウォッチ改善

主に上記に示す通りですが、 TypeScriptが Node.js v8以下でサポートしなくなっていること。これは意外と大きなポイントかもしれません、タイミングを見つけて現 LTSでもある Node.js v10に早目に移行する必要があります。

```json
"dependencies": {
-    "nuxt": "^2.6.1",
+    "nuxt": "^2.7.1",
}
```

こちらは Admin、当ブログ共に問題無く v2.7にアップデートすることができました。詳しくは [Nuxt v2.7](https://github.com/nuxt/nuxt.js/releases/tag/v2.7.0) をご覧ください。
