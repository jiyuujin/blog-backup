---
date: 2022-04-18
title: LINE と共に React (Next.js) を学ぶ
description: React (Vite) × LINE Front-end Framework のハンズオンの延長線上として、当ブログでは Next.js を　Vite の代わりに利用した際注意することを補足させていただきます。
slug: the-answer-to-learn-nextjs-with-line
reaction: 🥷
category: Front
tags: 
 - React
 - NextJS
 - TypeScript
 - FirebaseHosting
 - LIFF
---

## 前置き

この度、昨年の年末より [LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) を React 上で動かす Web アプリについて昨年の年末よりハンズオンの企画を進めておりました。

::: message .is-primary LIFF アプリを製作する。

目指すゴールはフロントエンドライブラリ [React](https://ja.reactjs.org) でひとつの Web アプリを作ること。[LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) と [Firebase Authentication](https://firebase.google.com/docs/auth) を合わせアプリ内で LINE 認証を使えるようにします。

LIFF は LINE Front-end Framework の略で [LINE 社](https://linecorp.com/) が提供する Web アプリのプラットフォームです。このプラットフォームで動作する Web アプリを LIFF アプリと呼びます。

|LINE Auth|Signed|
|:---|:---|
|![](https://i.imgur.com/1SD6yfH.jpg)|![](https://i.imgur.com/pqQPnYp.jpg)|

なお、実際の成果物は [Firebase Hosting](https://firebase.google.com/docs/hosting) にデプロイを済ませており、 [Next.js](https://nextjs-liff.web.app/) 並びに [React on Vite](https://vite-react-liff.web.app/) をご確認いただければ幸いです。

:::

企画にあたって利用するフロントエンド・フレームワークの候補は下記の通りです。

- [create-react-app](https://github.com/facebook/create-react-app) (CRA)
- React on [Vite](https://github.com/vitejs/vite)
- [Next.js](https://github.com/vercel/next.js)

今回のターゲットにフロントエンド初学者を想定しています。

率直に言うと、下記の通り目標を設定しました。

- React を触る
- JSX (TSX) に慣れる

CRA は React 経験者誰しもが通る道にあるフロントエンド・フレームワークですが、最近の開発速度が低調になってきている点は非常に気掛かりです。

それに対し今流行っているのが、ビルドツール Vite の利用と、フレームワーク Next.js の利用です。

先日のハンズオンでは、前者 Vite を利用して React の Web アプリケーションを製作した。この代わりに Next.js を利用しても、プレレンダリング機能や API Routes を始め、さらに多くのことを実現できることを書かせていただく。

## Next.js とは

改めて Next.js の紹介をば。この Next.js は React をベースに開発されているフロントエンド・フレームワークです。実際に導入して得られるメリット、それは SSR/SSG としての利用。そして開発サーバの部分的な高速リロードも実現する。

- カスタマイズ可能な開発サーバ
- react-router を必要としない動的ルーティング
- 全体設定のためのインタフェース (`_app.tsx` や `_document.tsx`)

詳細は、下記 [記事](https://zenn.dev/jiyuujin/articles/liff-on-nextjs) をご確認いただければ幸いです。

https://zenn.dev/jiyuujin/articles/liff-on-nextjs

## もう少し喋っておきたいこと

Next.js ならでは、の機能を利用して、応用編にチャレンジしてみましょう。

- [API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Middleware](https://nextjs.org/docs/advanced-features/middleware)

なお、 Next.js 12 以降で [Middleware](https://nextjs.org/docs/advanced-features/middleware) を利用できる。

### Bot よりカスタムメッセージを返す

Bot よりメッセージを返すために [`@line/bot-sdk`](https://www.npmjs.com/package/@line/bot-sdk) をインストールします。

```bash
# @line/bot-sdk
npm i @line/bot-sdk
yarn add @line/bot-sdk
```

あらかじめ LINE Developers のコンソールで作成した CHANNEL_ACCESS_TOKEN 並びに CHANNEL_SECRET を `.env` で読み込みます。

```.env
NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN="YOUR_NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN"
NEXT_APP_LIFF_CHANNEL_SECRET="YOUR_NEXT_APP_LIFF_CHANNEL_SECRET"
```

`config` と `runMiddleware` は [API Middlewares](https://nextjs.org/docs/api-routes/api-middlewares) を利用します。

```line.ts
import { middleware as lineMiddleware, MiddlewareConfig } from '@line/bot-sdk'

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.NEXT_APP_LIFF_CHANNEL_SECRET || '',
}

export const middleware = lineMiddleware(middlewareConfig)
```

```webhook.tsx
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from '@line/bot-sdk/lib/middleware'
import * as line from '../../lib/line'

export const config = { api: { bodyParser: false } }

async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Middleware) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)))
  })
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, line.middleware)
  res.status(200).end()
}

export default handler
```

`event.type` に `message` を受け取った場合に `liff.getProfile()` を実行して得られた表示名を返します。

```line.ts
import { ClientConfig, Client } from '@line/bot-sdk'

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.NEXT_APP_LIFF_CHANNEL_SECRET,
}

export const client = new Client(clientConfig)
```

```webhook.tsx
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from '@line/bot-sdk/lib/middleware'
import { WebhookRequestBody } from '@line/bot-sdk'
import * as line from '../../lib/line'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, line.middleware)

  const body: WebhookRequestBody = req.body
  await Promise.all(
    body.events.map((event) =>
      (async () => {
        if (event.mode === 'active') {
          if (event.type == 'message') {
            const name = event.source.userId
              ? (await line.client.getProfile(event.source.userId)).displayName
              : 'User'
            await line.client.replyMessage(event.replyToken, {
              type: 'text',
              text: `Hello, ${name}!`,
            })
          } else if (event.type == 'follow') {
            //
          }
        }
      })(),
    ),
  )
  res.status(200).end()
}

export default handler
```

### LINE Developer コミュニティから

Next.js の詳細は、下記 [記事](https://zenn.dev/jiyuujin/articles/liff-on-nextjs) をご確認いただければ幸いです。

https://zenn.dev/jiyuujin/articles/liff-on-nextjs

もとになった教材は [Zenn book](https://zenn.dev/books) を利用しています。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

## その他

Next.js または Vite 上で動く LIFF アプリをご確認いただければ幸いです。

また Next.js 上で React を動作させる [サンプル](https://github.com/nekohack-oss/nextjs) や Vite 上で React を動作させる [サンプル](https://github.com/jiyuujin/template-vite-react) も合わせご確認いただきたい。

- [https://github.com/jiyuujin/nextjs-liff](https://github.com/jiyuujin/nextjs-liff)
- [https://github.com/jiyuujin/vite-react-liff](https://github.com/jiyuujin/vite-react-liff)
- [https://github.com/nekohack-oss/nextjs](https://github.com/nekohack-oss/nextjs)
- [https://github.com/jiyuujin/template-vite-react](https://github.com/jiyuujin/template-vite-react)
