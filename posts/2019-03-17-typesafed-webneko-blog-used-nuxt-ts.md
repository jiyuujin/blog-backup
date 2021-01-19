---
date: 2019-03-17
title: Web猫ブログを TypeScript化しました
description: Nuxt3.0より本格サポート予定のTypeScriptを当ブログに入れたバージョンを作りました。ちなみにまだ本番稼働しておらず、今回は導入編の話のみとなります。
slug: typesafed-webneko-blog-used-nuxt-ts
category: Front
tags: 
 - Nuxt
 - TypeScript
 - Contentful
---

## Web猫ブログとは

フロントエンドにVue.jsのフレームワークの一つNuxt.jsを、Headless CMSの一つであるContentfulを採用しています。見えない裏側で Travisを使った自動化、Graphcool (GraphQL)やFirestoreも入っています。

<a class="link-preview" href="https://webneko.dev/">https://webneko.dev/</a>

## nuxt-tsを採用します

今回は `nuxt-ts` を採用しました。導入にあたってかれこれ1年以上、メンテストップ中の公式テンプレート。。　一切頼りにはできません。今年のどこかで必ず更新してほしさあり、新たに出していただけると大変嬉しいですね😊

<a class="link-preview" href="https://github.com/nuxt-community/typescript-template">https://github.com/nuxt-community/typescript-template</a>

当ブログでは発表直後でしたっけ、ちょうどひと月前に更新していました。アナウンスこそしていませんでしたが、今回この場を借りてという経緯です。つい最近、 `nuxt-ts` 不要になるのを見たのですが、　`nuxt-ts` をインストールするしかありません。ビルドコマンドも `nuxt` から `nuxt-ts` を使うよう変更してあげる必要があります。

```bash
yarn add nuxt-ts
yarn add typescript @types/node ts-loader -D
```

### nuxt-ts 不要になるの？

上記でも触れた `nuxt-ts` 不要になるかも、というのが以下 Issueを見たことでした。  `tslint` から `@typescript-eslint` に移行する一環と思いますが、気になる話でした。

<a class="link-preview" href="https://github.com/nuxt/nuxt.js/commit/920f444b6eb840b0f8a697539d4afa45c0b9abea#diff-e48f056d2618671df677bbec501445c9">https://github.com/nuxt/nuxt.js/commit/920f444b6eb840b0f8a697539d4afa45c0b9abea#diff-e48f056d2618671df677bbec501445c9</a>

## Nuxt.configを TypeScriptで書く

当ブログは Headless CMSに Contentfulを採用。 Sitemapの生成処理や Makdownのパース処理など単純な設定に縛られず比較的多いと思いますが、これらの実装箇所が全て型安全に書けるようになったことは今までと大きく違う点だと思います。


## APIを使うために型定義を設定する

`asyncData` や `fetch` などのAPIをを型安全に利用するために自分自身でVueのInterfaceを拡張してあげる必要があります (/types/nuxt.d.tsを作成すると良いでしょう) この辺りはさすがVue界隈と思う部分ですが、丁寧に書いてくださっていることに対しては感謝しかありません。Nuxt公式ページに [Context一覧](https://ja.nuxtjs.org/api/context)が存在します。そのページと照らし合わせながらぐりぐり型定義を設定します。

<a class="link-preview" href="https://ja.nuxtjs.org/api/context">https://ja.nuxtjs.org/api/context</a>

```js
declare module 'nuxt' {
  import { Store } from 'vuex';
  import { Route } from 'vue-router';

  export class Builder {
    constructor(nuxt: Nuxt);
  }

  export class Nuxt {
    constructor(config?: NuxtConfig);
  }

  export interface NuxtConfig {
    dev: boolean;
    [key: string]: any;
  }

  export interface NuxtContext<S = any> {
    app: NuxtApp;
    isClient: boolean;
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    isHMR: boolean;
    route: Route;
    req: any;
    res: any;
    store: Store<S>;
    env: any;
    params: any;
    query: any;
    redirect(path: string): void;
    error(params: { statusCode: number; message: string }): void;
    nuxtState: any;
    beforeNuxtRender(fn: Function): any;
  }
}
```

上記はあくまでミニマムな構成になっています。当ブログではこの構成に加えて、 `contentful` 用のModelも定義しています。管理画面等では `axios` 用の定義も必要になるかもしれません。このように必要に応じて随時追加してあげなければならず少々面倒ではありますが、後々を考えると良い「投資」になってくれるかもしれません。

今回はこの辺で。

## リポジトリ公開中

ブログでは随時お問い合わせコメント受付中、PRも絶賛受付中です。

### Web猫ブログ 本番運用中

従来の TypeScriptを採用していない版です。

<a class="link-preview" href="https://github.com/jiyuujin/webneko-blog">https://github.com/jiyuujin/webneko-blog</a>

### Web猫ブログ　β版 (いずれ本番運用予定)

既に切りました、本番運用開始されたら再度アナウンスしたいと思います。

<a class="link-preview" href="https://github.com/jiyuujin/webneko-blog-ver2">https://github.com/jiyuujin/webneko-blog-ver2</a>
