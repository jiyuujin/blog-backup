---
date: 2018-12-17
title: Atomic Designでの技術選定の結果、そして今後
description: 3日程早い時期の投稿ですが、Nuxt.js Advent Calendar 2018 21日目の記事です。

slug: doing-my-best-to-atomic-design-on-advent-calendar-2018
category: Front
tags: 
 - Nuxt
 - Firebase
 - Firestore
 - Atomic-Design
 - Advent-Calendar
---

## Nuxt Adminとは

当ブログの問い合わせを管理するため、裏側の管理画面を自作、バックエンドに Firestoreを採用しています。ちなみに管理画面のフロントエンドでも　Vue.jsのフレームワークの一つNuxt.jsを採用しています。

<a class="link-previews" href="https://nuxtadmin.netlify.com/">https://nuxtadmin.netlify.com/</a>

### ただし自分以外触れません

近く権限を追加した上で、閲覧用アカウントの開設を検討中。主な機能は、

1. 技術ネタ・勉強会スライド一覧
2. Qiita一覧(いいね管理をスマートに)
3. 当ブログ解析結果一覧
4. 搭乗ログ一覧

## 前回のおさらい

先日の続きです、 [Firebase Advent Calendar 8日目](https://webneko.info/posts/migration-to-firestore-on-advent-calendar-2018) を事前にご確認ください。リポジトリ[jiyuujin/nuxt-admin-server](https://github.com/jiyuujin/nuxt-admin-server)下で進めています。

## 今回の結論

これといった結論はありません！日々より良い、ニーズに合ったコンポーネント設計を訴求することだと思います。

## 基本的な設計原則

pages下では画面ごとにindex.vueを用意、それぞれの.vueで該当するVuexモジュールにアクセスします。アクセス先であるcomponents下では、 [Vue.js入門 基礎から実践アプリケーション開発まで](https://www.amazon.co.jp/dp/4297100916/ref=asc_df_42971009162551328/)に記載されている通り、設計と実装を進めており相違は存在しません。

```
+ components
|-- atoms
|-- molecules
|-- organisms
|-- templates
```

MainTemplateをインポートすることで、基本的なレイアウトを共通化。 `slot` タグに、ページ固有の情報を入れます。入力フォームや、中小規模のコンポーネントを配置したりなど。

```html
<main-template
    :loading="loading"
>
    <NewTip />
</main-template>
```

情報取得は pagesに限定。この pagesでのみ、 APIから情報を取得、 Vuexストアにアクセスします。適宜使用するコンポーネントに応じて propsで値を受け渡し、各コンポーネントから渡される場合は $emitを使います。

```js
import { mapActions } from 'vuex';
export default {
    computed: {
        ...mapActions('initTips')
    }
}
```

moluesや organismsの違いって何でしょうと.. ? Nuxtを触っている人なら誰しもが首をかしげる箇所にハマりました。現時点ではリポジトリ固有か否かで判定を行い、リポジトリ固有だった場合には organismsに入れています。
