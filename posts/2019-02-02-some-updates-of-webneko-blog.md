---
date: 2019-02-02
title: Nuxt を更新する
description: 当ブログでも使われている Nuxt このマイナーバージョンアップデートに焦点を合わせ、 vuex 周りで比較的大きな変更のあった Nuxt 2.4 以降に限って記録する。
slug: some-updates-of-webneko-blog
category: Scrap
tags: 
 - Vue
 - Nuxt
---

製作開始当初 (2018/09/15) の技術スタックは下記の通り。

- Nuxt 1.0.0-rc.11
   - Decorator API (Class API)
   - vue-router
   - vuex

## Nuxt 2.4

主に vuex 周りで大きな変更があった。当時ブログコンテンツの保持を vuex に任せており、これまでの Classic モードによる実装から、Module モードによる実装に変更する必要が生まれた。

store/product.js には、各種 state や mutations、actions、getters を入れれば良さそう。

```js
// Modules
import { productModule } from './product'

export const store = new Vuex.Store({
  modules: {
    namespaced: true,
    product: productModule
  }
});
```

Pages コンポーネントから、ストアメソッドを呼び出す際にも修正が入っており、Module 名を追加して適宜呼び出せば良さそう。

```js
async asyncData ({ store }) {
  await store.dispatch('product/initPosts', {
    'slug': ''
  })
}
```

同様に State を呼び出す際も修正する。

```js
computed: {
  ...mapState({
    posts: state => state.product.posts,
    page: state => state.product.page,
    pagesTotal: state => state.product.pagesTotal
  })
},
```
