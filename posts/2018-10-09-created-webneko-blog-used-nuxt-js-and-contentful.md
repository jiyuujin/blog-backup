---
date: 2018-10-09
title: NuxtとContentfulで簡単ブログ生活
description: Headless CMSの一つであるContentfulを使って、めでたくブログ活動を開始します！
slug: created-webneko-blog-used-nuxt-js-and-contentful
category: Front
tags: 
 - Nuxt
 - Contentful
---

特別なスタイルを当てなければブログの開発にたった 1 日。インフラの構築もたった 1 日、テスト環境では Netlify を、本番環境では AWS Fargate を採用しました。

## モデルの作成

Contentful の管理画面より事前の登録が済んでいることを確認してください。

予め登録でき次第、スペース `Nuxt blog` 、テンプレートに `blog` 、

またフロントエンドフレームワーク (Nuxt.js) から Contentful の入るデータにアクセスするため必要なトークンを設定してください。

```bash
# スペース
contentful space create --name 'Nuxt blog'

# テンプレート
contentful space seed --template blog

# アクセストークン
contentful space accesstoken create --name nuxt-blog
```

基本的にカラムを作るのも各個人の判断に委ねられる訳ですが、この度当ブログにおいて下記のようにカラムを準備。

各モデル全て必須 (required) 項目にしました。

| Column | Type |
|:---|:---|
| Title | string |
| Slug | string |
| Hero image | string |
| Description | string |
| Body | string |
| Author | object |
| Publish | Date |
| Tags | `Array<string>` |
| Category | string |

### 画像投稿するなら、

`Hero Image` で設定しているが、Contentful では容易に設定できる。

![hero-image-validation](//images.ctfassets.net/gzkue3szf85p/5CqKvCUhHWBN2E2l2DRyhd/cdb2175dbf94264790446a5e6e7d5b84/hero-image-validation.png)

### バリデーションを設定するなら、

`tags` や `category` で設定しているが、こちらも容易に設定できる。

![contentful-sample-validation](//images.ctfassets.net/gzkue3szf85p/2Qiw4INb33OoJATP6Ri2o1/59757c0d3f8e336becc7d8feda962250/contentful-sample-validation.png)

## エンドポイントを使うために、

一通り `.contentful.json` に設定を記述するが、Nuxt では `.env` を新たに作って、 process.env でアクセスできるようにします。

```nuxt.config.js
module.exports = {
    env: {
        CTF_PERSON_ID: CONTENTFUL_CONFIG.CTF_PERSON_ID,
        CTF_BLOG_POST_TYPE_ID: CONTENTFUL_CONFIG.CTF_BLOG_POST_TYPE_ID,
        CTF_SPACE_ID: CONTENTFUL_CONFIG.CTF_SPACE_ID,
        CTF_CDA_ACCESS_TOKEN: CONTENTFUL_CONFIG.CTF_CDA_ACCESS_TOKEN,
    }
}
```

createClient()でインスタンスを作成することでブログを取得できるようになりました。

```plugins/contentful.js
client
    .getEntries(contentfulOptions)
    .then(entries => {
      // console.log(entries)
    })
    .catch(console.error)
```

`CTF_PERSON_ID` ですが..🤔 設定し無くても普通に動作するので気にしない。
