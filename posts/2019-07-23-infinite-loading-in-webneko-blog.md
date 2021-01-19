---
date: 2019-07-23
title: 無限スクロールを導入する
description: とある管理画面の機能で、ページネーションから無限スクロールを使うような変更があったので軽く書きました。
slug: infinite-loading-in-webneko-blog
category: Front
tags: 
 - Nuxt
 - Contentful
---

## インストール

`vue-infinite-loading` をインストールします。

<a class="link-preview" href="https://www.npmjs.com/package/vue-infinite-loading">vue-infinite-loading</a>

```bash
# vue-infinite-loading
yarn add vue-infinite-loading
```

### 型を定義します

vue-infinite-loading下記の通り設定します。

```ts
declare module 'vue-infinite-loading' {
  import Vue from 'vue'

  export default class InfiniteLoading extends Vue {
    spinner: string;
    direction: string;
    distance: number;
    onInfinite: Function;
    forceUseInfiniteWrapper: boolean;
  }

  export interface StateChanger {
    complete(): void;
    loaded(): void;
    reset(): void;
  }
}
```

後になって気付いたんですが、開発元の issueを見ると載っていたようです。

<a class="link-preview" href="https://github.com/PeachScript/vue-infinite-loading/issues/139#issue-307231773">vue-infinite-loading</a>

### SSRの下では使えません

既定のデータを読み込み終えると「読み込み終わった」ことを表示します。もちろん、カスタム化することも可能、適宜コンポーネントを挿入していただければと思います。

```html
<no-ssr>
    <infinite-loading 
        spinner="spiral"
        @infinite="infiniteHandler"
    >
        <span slot="no-more">読み込み終わりました</span>
    </infinite-loading>
</no-ssr>
```

`infiniteHandler()` を使って 10秒後に次々に表示されるようにしました。

```ts
infiniteHandler($state: any) {
    setTimeout(() => {
        if (this.count < this.posts.length) {
            this.count += 9
            $state.loaded()
        } else {
            $state.complete()
        }
    }, 1000)
}
```

これで無限スクロールを実現できます。

