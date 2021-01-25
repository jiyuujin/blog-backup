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

`nuxt-ts` 採用にあたってかれこれ 1 年以上、メンテストップ中の公式テンプレートを見るも一切頼りにはできません。

<a class="link-preview" href="https://github.com/nuxt-community/typescript-template">https://github.com/nuxt-community/typescript-template</a>

当ブログでは奇しくもちょうどひと月前に更新済。つい先日 `nuxt-ts` が不要になるのを見たばかり、しかし　`nuxt-ts` をインストールするしかありません。

```bash
yarn add nuxt-ts
yarn add typescript @types/node ts-loader -D
```

### nuxt-ts 不要になるの

`tslint` から `@typescript-eslint` に移行する一環でしょうが、ここで気になる話を。

上記でも触れた `nuxt-ts` 不要になることを示唆する Issue を見た。

<a class="link-preview" href="https://github.com/nuxt/nuxt.js/commit/920f444b6eb840b0f8a697539d4afa45c0b9abea#diff-e48f056d2618671df677bbec501445c9">
  https://github.com/nuxt/nuxt.js/commit/920f444b6eb840b0f8a697539d4afa45c0b9abea#diff-e48f056d2618671df677bbec501445c9
</a>

## Nuxt.config を TypeScript で書く

当ブログは Headless CMS に Contentful を採用。

Sitemap の生成処理や Makdown のパース処理など、全て型安全に書けるようになるのはこれまでと大きく違います。

## API を使うために型定義を設定する

`asyncData` や `fetch` などの API を型安全に利用するために自分で Vue の Interface を拡張する必要がある。

`/types/nuxt.d.ts` を作成すると良いでしょう。 Nuxt 公式ページ [Context 一覧](https://ja.nuxtjs.org/api/context) と照らし合わせて型定義を設定する。

<a class="link-preview" href="https://ja.nuxtjs.org/api/context">https://ja.nux.js .org/api/context</a>

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

上記はあくまでミニマムな構成です。当ブログではこの構成に加え `contentful` 用の Model も定義している。

一方、管理画面では `axios` 用の定義も必要になるため必要に応じて model を随時追加してあげなければなりません。

今回はこの辺で。
