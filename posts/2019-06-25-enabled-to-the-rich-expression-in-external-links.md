---
date: 2019-06-25
title: 外部リンクの表現をリッチにします
description: @microlin/vanillaを使って、外部リンクの表現をリッチにしました。
slug: enabled-to-the-rich-expression-in-external-links
category: Front
tags: 
 - Nuxt
 - Contentful
---

## Web猫ブログとは

フロントエンドにVue.jsのフレームワークの一つNuxt.jsを、Headless CMSの一つであるContentfulを採用しています。見えない裏側で Travisを使った自動化、Graphcool (GraphQL)やFirestoreも入っています。

<a class="link-preview" href="https://webneko.info/">https://webneko.info/</a>

## @microlink/vanilla をインストール

Markdown中のリンクをリッチな表現として使える @microlink/vanillaです。

<a class="link-preview" href="https://microlink.io/docs/sdk/getting-started/overview">@microlink/vanilla</a>

```bash
# @microlink/vanilla
yarn add @microink/vanilla
```

## Dependency Injectionを利用します

Nuxtでは Dependency Injectionを使えるので、以下のような Pluginを利用できるように準備します。

```ts
const microlink = require('@microlink/vanilla/umd/microlink');

export class MicrolinkPlugin {
  microlinkjs: string = '';

  constructor() {
    this.microlinkjs = microlink
  }
}

export default ({ app }, inject) => {
  inject('microlinkjs', (selector => microlink(selector)))
};
```

nuxt.config.tsで事前に準備したファイルを設定します。

```ts
module.export = {
    plugins: [
        '~plugins/microlink.ts'
    ]
};
```

### ライフサイクルからアプローチします。

リッチな表現を使う前提として、データを読み込んだ後に装飾されます。

```ts
export default Vue.extend ({
    mounted() {
        this.$microlinkjs('.link-preview')
    }
})
```

### Markdown中でこう使う！

指定のリンクに `link-preview` タグを設定するとリッチな表現として表示されるようになります。

```md
<a class="link-preview" href="#"></a>
```

![microlink-demo](//images.ctfassets.net/gzkue3szf85p/6WTpo4D8kdeJ5YCaurpYWT/b53ce3f6aa4ea201c7dfcebcbb07701c/microlink-demo.png)
