---
date: 2018-12-20
title: プレゼンテーションスライドもVUEで作っちゃう話
description: Vue.js Advent Calendar 2018 21日目の記事です。

slug: created-presentation-slide-by-vue-on-advent-calendar-2018
category: Front
tags: 
 - Vue
 - Advent-Calendar
---

## v-kansai Vue.js/Nuxt Meetup #1

京都で初めてのミートアップイベント[v-kansai Vue.js/Nuxt Meetup #1](https://vuekansai.connpass.com/event/110542/)を主催、来月19日にも既に#2(大阪)の予定が決まっています。この度はフリュー株式会社様、ご協力ありがとうございました。

## 技術スタック

今回のMeetupでは登壇もさせていただきましたが、Keynoteを使っていません。 Webpack4 + Vue2.5をメインに作りました。 Keynoteを使うより、git管理し易いかな、と思ったことが決め手の一つ。

### なぜ Nuxtでは無かったか

使用場面はプレゼンテーション、表示順が既に決まっていたこと。素直に Vueを使った方が良いかなという判断です。ただし srcディレクトリ下を見ていただけるとお分かりになると思いますが、 Nuxtアーキテクチャをほぼそのまま流用しています。

## スライド一覧、ルーティングを追加

pagesにスライド一覧を追加、ルーティングをrouter/index.jsに追加します。

```js
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  // 順次表示させたい順番に追加
]
```

## タップ操作で画面遷移

addEventListenerメソッドで clickイベントを発火。画面全体を分けて右側をタップすると一つ進み、左側をタップすると一つ戻るように操作を追加します。

```js
window.addEventListener('click', e => {
  console.log(e.offsetX + '/' + window.screen.height + ' : ', e.offsetY + '/' + window.screen.width)

  if (e.offsetX > (window.screen.height / 2)) {
    store.dispatch('onNext', { pages })
  } else {
    store.dispatch('onLast')
  }
})
```

## キーボード操作で画面遷移

タップイベントだけでも充分ですが、キーボード操作でも画面遷移させます。 addEventListenerメソッドで keydownイベントを発火させます。

```js
window.addEventListener('keydown', e => {
  const { which } = e
  if (which < 37 || which > 40) return

  e.preventDefault()
  if (which === 37 || which === 38) {
    return store.dispatch('onLast')
  }

  store.dispatch('onNext', { pages })
})
```

## Webpack4リロード問題

各ルーティングパスでリロードすると発生する事象。[解決の糸口はIssueにありました](https://github.com/vuejs/vue-router/issues/1254)

devServer historyApiFallbackオプションを設定します。

```js
module.exports = merge(baseConfig, {
  devServer: {
    historyApiFallback: true
  }
});
```

## github-pagesで公開

スライドのコンテンツを適宜追加した上で、 productionビルド時に vue-routerの baseオプションを設定します。

```js
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? '/' : 'vue-fes-japan-2018-feedback/',
  linkActiveClass: 'active',
  routes
})
```

## デプロイ用シェルを作成

masterブランチとは別に gh-pagesブランチを作成します。 github.ioドメインを利用して、各自オリジナルなプレゼンテーションの完成！

```bash
webpack --config build/webpack.config.prod.js
```

今後、「登壇駆動開発」を徹底しながら様々なエンジニアの一助になれば、と思います。
