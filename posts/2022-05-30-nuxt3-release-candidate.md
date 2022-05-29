---
date: 2022-05-30
title: Nuxt 3 にあげる
description: この度 Nuxt 3 の RC がリリースされたことに伴い、当ブログ (webneko.dev) も合わせて更新した話を書かせていただいた。
slug: nuxt3-release-candidate
reaction: 👶🏻
category: Front
tags: 
 - Nuxt
 - TypeScript
 - AWS
 - Vue
---

## Nuxt 3 RC リリース

先月 20 日 Nuxt 3 の RC 版がリリースされた。

Nuxt 2 と比べても内部アーキテクチャから全てが新しく変わっている。

- デフォルトで Vue 3 / Vite による動作
- [Nitro](https://nitro.unjs.io/) による Node.js サーバーへのデプロイ
- コンポーネントやプラグインの自動インポート
- 静的サイト化 (SG)
- 特段注意を要するポイント
    - 画像などアセットの読込方法が変わった
    - 画像などアセットの置き場所が変わった
        - `/static` から `/public` に変わった

### コンポーネント設計

なお、私自身のブログでは (暫定的に) 下記の方針の下で動かすことにしている。

- `/pages` 配下のコンポーネントで `<script setup>` の syntax を使う
- `/components` 配下のコンポーネントで Options API を使う

前者は [非同期の `<script setup>`](https://v3.nuxtjs.org/guide/features/data-fetching#using-async-setup) を使って Contentful 上のデータを取得している。

```ts
import { fetchPosts } from '~/api/blog'

const posts = await fetchPosts()
```

```ts
// Contentful SDK
import createContentfulClient from '~/services/contentful'

export const PAGE = 20
export const LATEST_PAGE = 8
export const ORDER = '-fields.publishDate'

export const fetchPosts = (isLatest?: boolean) => {
  const $client = createContentfulClient()

  return $client.getEntries({
    content_type: 'blogPost',
    order: ORDER,
    limit: isLatest ? LATEST_PAGE : PAGE,
    skip: 0,
  })
}
```

一方、後者は Nuxt 2 時代のコンポーネントをそのまま流用している。

もちろんソースコードの統一性を考慮した際 Composition API に変更した上で `<script setup>` の syntax を使った方が良いでしょう。

しかし、最悪そのままでも動くといえば動くので、結果的に流用させていただいた。

### 静的サイト化 (SG)

遅ればせながら待望の静的サイト化の対応も Nuxt 3 RC と合わせリリースされている。

ただし、まだ experimental (実験的) の扱いです。

```bash
# Nuxt 2 include Bridge
nuxt generate

# Nuxt 3
nuxi generate
```

ここでのポイントは 3 つ。

- target に `static` を設定する
- generate 時に吐き出す先のディレクトリを設定する
- CSS を吐き出す `app.buildAssetsDir` に `/_nuxt/` を設定する

```ts
import { defineNuxtConfig } from '#app'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  router: {
    base: '/',
  },
  app: {
    buildAssetsDir: '/_nuxt/',
    baseURL: '/',
  },
  target: 'static',
  generate: {
    dir: 'dist',
  },
})
```

これまで Nuxt 2 では generate 時に吐き出す先のディレクトリを設定すれば良かったもの、この設定だけで Nuxt 3 はホスティングされなかったことに注意したい。

ブラッシュアップの過程を経てより楽ちんな設定に留まれば良いことも考えつつ、先も述べたように静的サイト化もまだ experimental (実験的) な機能のひとつです。

## 当ブログのドメイン切替

ゴールデンウィークの合間である先月 29 日に、本番運用で使用するドメインを切り替えた。

なお、これまでに運用していたウェブサイトを、サブドメインに移行している。

- https://webneko.dev/
- https://nuxt2.webneko.dev/

前者 Nuxt SSR を利用して AWS Fargate 上のコンテナで運用している。

これに対し AWS Amplify のホスティング機能を使い静的なファイルとして落とし込んだ。

今回特別に記したいのは下記の通りです。

- Analytics を設定する
    - Analytics 3 に対応する
    - Analytics 4 に対応する
- Google Adsense を設定する
- RSS フィードを生成する

いずれも自分自身でごにょごにょ書いたことで Nuxt 3 への更新も早くから実現できた訳です。

### Analytics を設定する

これまで運用していたブログでは Analytics 3 を利用していたが、折角なのでこれを機に Analytics 4 を利用するよう切り替えた。

#### Analytics 3 に対応する

Google Tag Manager を読み込むため `@nuxtjs/google-gtag` をインストールする必要がある。

Google Analytics の管理画面で発行した ID を環境変数 `GTAG_ID` に設定する。

```ts
import { defineNuxtConfig } from 'nuxt'
import { gtagList } from './app/utils/gtag.constants'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    [
      '@nuxtjs/google-gtag',
      {
        id: process.env.NUXT_GTAG_ID,
        debug: !isProd,
      },
    ],
  ],
})
```

#### Analytics 4 に対応する

こちらも同様に `nuxt.config.ts` で Google Tag Manager を読み込む必要がある。

```ts
import { defineNuxtConfig } from 'nuxt'
import { gtagList } from './app/utils/gtag.constants'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  head: {
    meta: [
      ...gtagList(),
    ],
    __dangerouslyDisableSanitizersByTagID: {
      GAsrc: ['innerHTML'],
      GAcode: ['innerHTML'],
    }
  }
})
```

Google Analytics の管理画面で発行した ID を環境変数 `GTAG_ID` に設定する。

```ts
const GAcode = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.GTAG_ID}');`

export const gtagList = () => {
  return [
    {
      hid: 'GAsrc',
      src: 'https://www.googletagmanager.com/gtag/js?id=' + process.env.GTAG_ID,
    },
    { hid: 'GAcode', innerHTML: GAcode },
  ]
}
```

### Google Adsense を設定する

これまで運用していたブログでは Adsense を組み込んでいたが、これからも Adsense のお世話になるよう設定した。

`nuxt.config.ts` で Google Adsense のライブラリを読み込む必要がある。

```ts
import { defineNuxtConfig } from 'nuxt'
import { adsenseList } from './app/utils/adsense.constants'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  head: {
    meta: [
      ...adsenseList(),
    ],
    __dangerouslyDisableSanitizersByTagID: {
      ADsrc: ['innerHTML'],
      ADcode: ['innerHTML'],
    }
  }
})
```

Google Adsense の管理画面で発行した ID を環境変数 `ADSENSE_ID` に設定する。

```ts
export const ADcode = '(adsbygoogle = window.adsbygoogle || []).push({});'

export const adsenseList = () => {
  return [
    {
      hid: 'ADsrc',
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_ID}`,
      crossorigin: 'anonymous',
    },
    { hid: 'ADcode', innerHTML: ADcode },
  ]
 }
```

### RSS フィードを生成する

自動で `./app/public/feeds.xml` に吐き出す。

静的ファイルの置き場所が変更されていることに注意したい。

- Nuxt 2 では `/static` 下に静的ファイルを置く
- Nuxt 3 では `/public` 下に静的ファイルを置く

```ts
const contentful = require('contentful')

const fs = require('fs-extra')
const { Feed } = require('feed')
const { promisify } = require('util')

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

let feed = new Feed({
  title: 'Web猫ブログ',
  description:
    '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  feed_url: 'https://webneko.dev/feeds.xml',
  site_url: 'https://webneko.dev/',
  copyright: 'nekohack',
  language: 'ja',
})

const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
})

client
  .getEntries({
    content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    order: '-fields.publishDate',
  })
  .then(async (entries) => {
    for (let index = 0; index < entries.items.length; index++) {
      const post = entries.items[index]
      feed.items.push({
        title: post.fields.title,
        id: `https://webneko.dev/posts/${post.fields.slug}`,
        link: `https://webneko.dev/posts/${post.fields.slug}`,
        author: [
          {
            name: 'jiyuujin',
          },
        ],
        description: post.fields.description,
        body: post.fields.body,
        date: new Date(post.fields.publishDate),
      })
    }
    await promisify(fs.writeFile)('./app/public/feeds.xml', feed.rss2())
  })
  .catch((err) => {
    console.log(err)
  })

export default function () {}
```

Github Actions によるトリガー実行と合わせたことで、日々ブログの更新を監視している。

## 最後に

Nuxt 3 対応として新しいリポジトリから切り直している。

- https://github.com/jiyuujin/webneko-blog
- https://github.com/jiyuujin/webneko-blog-next

前者はいずれ `archived` とさせていただくことも考えているのが現実。

是非とも参考にしていただければ幸いです。
