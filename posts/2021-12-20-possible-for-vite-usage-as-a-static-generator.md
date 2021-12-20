---
date: 2021-12-20
title: Vite (Vue 3) で SG のすゞめ
description: この記事は Vue Advent Calendar 2021 の 21 日目の記事です。平日毎朝 Twitter Spaces で雑談している内容を閲覧できるようにした「みんなで作るブログ」を製作・運用している経験について書かせていただいた。
slug: possible-for-vite-usage-as-a-static-generator
reaction: 🌋
category: Server
tags: 
 - Vite
 - Vue
 - Vercel
---

## Vite の早さに惹かれて

お仕事の場面で CRA (create-react-app) 環境のビルド高速化を目的のひとつに Vite や ESBuild などの導入経験がある。

それがきっかけで、最近抜きんでている Vite を静的サイトジェネレータとしても使ってみた。

## 雑談の場を設けて早半年

今年の GW 明けより平日毎朝 Twitter Spaces で雑談している。

![](https://i.imgur.com/7tiOTpE.jpg)

これまでのリスナー数平均 10-15 名ほど、毎日安定して聞いてくれる方もいらっしゃる。

その場に居なかった方への共有を考え、備忘録も毎日取り続ける。

こちらの「みんなで作るブログ」より確認できる。

[みんなで作るブログ | オハヨーエンジニア](https://ohayo.nekohack.me/)

主な技術スタックは下記の通りです。

- Vite
- Vite (Vue 3)
- Github issues
- Github API
- Vercel

先日 API スキーマの詳細を書かせていただいた、こちらも合わせてチェックいただければ幸いです。

[Github issues を CMS として扱う](https://webneko.dev/posts/github-issues-usage-as-a-cms)

今回は Vite で SSG した話。

それを採用した理由は下記の通り。

- SEO に強い
- 自前のサーバを用意する必要が無い
- Speed Index 向上

### プラグインを読み込む

Vite 自体あくまでモジュールバンドラのひとつ。最初から静的サイトジェネレータとして準備されている訳では無く、よしなりにそれへ向けて準備する必要がある。

そこでまずルーティングを実現するため unplugin-auto-import による自動インポートを利用する。

- vite-plugin-pages
- vite-plugin-vue-layouts

```js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vue from '@vitejs/plugin-vue'

module.exports = defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts'
    }),
    Pages({
      extensions: ['vue'],
    }),
    Layouts(),
    vue(),
  ]
})
```

自動的に `src/auto-imports.d.ts` が吐き出されたら OK です。

Vite とその付随プラグインで新たに型を定義する必要がある。

```json
{
  "types": [
    "vite/client",
    "vite-plugin-pages/client",
    "vite-plugin-vue-layouts/client"
  ]
}
```

### Web アプリにルーティングを組み込む

先の tsconfig.json に書いた型定義より `setupLayouts(generatedRoutes)` を利用することで Web アプリ全体のルーティングを管理できる。

```ts
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    //
  }
)
```

`src/main.ts` でルーティングのベースを書ける。

これをもって pages に置いたファイル名がそのままルーティングパスに反映される。

今回は Vite で GraphQl を使うため `@vue/apollo-composable` の `DefaultApolloClient` をプロバイダとして読み込む必要がある。

```ts
import { ViteSSG } from 'vite-ssg'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './plugins/apollo'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    ctx.app.provide(DefaultApolloClient, apolloClient)
  }
)
```

`src/App.vue` に `<router-view></router-view>` を設定する。

各種 pages へルーティングパスに所属するコンポーネントを置く。

### コンポーネント設計

Atomic Design などのような複雑な設計は取り入れていない。

ディレクトリ構成は下記の通りです。

```
+
| -- assets      # 画像類
| -- components  # 各種コンポーネント
| -- graphql     # GraphQL クエリ
| -- layouts     # 共通レイアウト
| -- pages       # ルーティングページに応じて作成
| -- plugins     # Apollo プラグイン
| -- services    # 配列処理系
| -- utils       # その他ユーティリティ
```

このディレクトリ構成を下に唯一守っていること、それは `pages` が `components` 内で作成を済ませたコンポーネントを呼び出すだけのために存在させる、簡潔な設計を目指した。

それでは `pages/index.vue` を確認してみてください。

```ts
import Issues from '../components/Issues.vue'
import FooterText from '../components/FooterText.vue'
import Alert from '../components/Alert.vue'
import TweetButton from '../components/TweetButton.vue'
```

```html
  <main>
    <h1>{{ `みんなで作るブログ` }}</h1>
    <tweet-button />
    <alert />
    <issues />
    <footer-text />
  </main>
```

どこで何をやっているか、コンポーネントの責務が明確に分かれている。

## 最後に

今回の「みんなで作るブログ」構築で Nuxt を利用する考えは無かった。これまで Nuxt 2 で静的サイトを製作した経験のある方は多いだろう。しかし Nuxt 3 の安定版がリリースされるのを待っていると、その瞬間がいつになるか見当もつかない。

なお、現時点で Nuxt 3 の静的サイト向けビルドは提供されていない。

https://v3.nuxtjs.org/getting-started/introduction

とはいえ来年のどこかで必ず静的サイト向けビルドも提供されているはずで、その際に Nuxt 3 へ移行しても良いのではと考えたり。

### 余談

あと自身の所感として最近 Vue の知見を発信されている記事をあまり目に触れられなくなった。ベータリリースから 1 年以上経過した Vue 3 をよそに、未だその対応が進まないプラグインの存在も影響していることは事実でしょう。

とか言っている私自身も最近はめっきり React のひとだったりする。

そこではてブ件数を比較してみた。

<!--
- [2018/01/01 - 2018/12/31](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2018-01-01&date_end=2018-12-31) 2320 件
- [2019/01/01 - 2019/12/31](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2019-01-01&date_end=2019-12-31) 2021 件
- [2020/01/01 - 2020/12/31](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2020-01-01&date_end=2020-12-31) 1736 件
- [2021/01/01 - 2021/12/31](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2021-01-01&date_end=2021-12-17) 902 件
-->

|Date|React|Vue|Svelte|
|:---|:---|:---|:---|
|2018/01/01 - 2018/12/31|[3760 件](https://b.hatena.ne.jp/search/text?q=react&sort=recent&users=3&safe=on&date_begin=2018-01-01&date_end=2018-12-31)|[2320 件](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2018-01-01&date_end=2018-12-31)|[43 件](https://b.hatena.ne.jp/search/text?q=svelte&sort=recent&users=3&safe=on&date_begin=2018-01-01&date_end=2018-12-31)
|2019/01/01 - 2019/12/31|[2978 件](https://b.hatena.ne.jp/search/text?q=react&sort=recent&users=3&safe=on&date_begin=2019-01-01&date_end=2019-12-31)|[2021 件](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2019-01-01&date_end=2019-12-31)|[64 件](https://b.hatena.ne.jp/search/text?q=svelte&sort=recent&users=3&safe=on&date_begin=2019-01-01&date_end=2019-12-31)|
|2020/01/01 - 2020/12/31|[3125 件](https://b.hatena.ne.jp/search/text?q=react&sort=recent&users=3&safe=on&date_begin=2020-01-01&date_end=2020-12-31)|[1736 件](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2020-01-01&date_end=2020-12-31)|[133 件](https://b.hatena.ne.jp/search/text?q=svelte&sort=recent&users=3&safe=on&date_begin=2020-01-01&date_end=2020-12-31)|
|2021/01/01 - 2021/12/31|[2226 件](https://b.hatena.ne.jp/search/text?q=react&sort=recent&users=3&safe=on&date_begin=2021-01-01&date_end=2021-12-17)|[902 件](https://b.hatena.ne.jp/search/text?q=vue&sort=recent&users=3&safe=on&date_begin=2021-01-01&date_end=2021-12-17)|[146 件](https://b.hatena.ne.jp/search/text?q=svelte&sort=recent&users=3&safe=on&date_begin=2021-01-01&date_end=2021-12-17)|

Vue なら `vue` を、また React なら `react` と言う具合に検索 word を入力しているだけで、如実に全てを表している訳ではありません。

このデータを全て鵜呑みにできないものの、やはり Vue が下降トレンドになっている事実は気掛かりです。

来年再び Vue の知見が増えれば良いなと考えつつ、締めさせていただく。
