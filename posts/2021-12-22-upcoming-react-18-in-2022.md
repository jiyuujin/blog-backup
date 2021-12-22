---
date: 2021-12-22
title: 来る React 18 に向けて
description: この記事は React Advent Calendar 2021 の 23 日目の記事です。来たる React 18 に向け 2021 年一年間の更新をまとめた、とりわけ初学者を対象にいま一度ご一読くださいませ！
slug: upcoming-react-18-in-2022
reaction: 💫
category: Front
tags: 
 - React
 - NodeJS
 - Advent-Calendar
 - Pokemon-API
---

2021 年、特に下半期で様々な動きがあった。

- React
    - React 18
    - Suspense
    - Server Components
    - React Forget (Compiler for auto memorization)
    - Automatic Batching in event handlers
    - Support on Web Components (Experimental)
    - Plugins
        - React Router v6.0
        - React Location v1.0
        - MUI v5.0 (リブランディング)
- CRA (create-react-app)
    - CRA 5
        - Webpack 5 support
- Remix (React framework for SSR)
- Next.js
    - Next.js 11
        - script を読み込むコンポーネント `next/script`
        - `next/image` で画像サイズを自動判定
        - Webpack 5 support
        - Migration from CRA
    - Next.js 12
        - Rust compiler `swc`
        - Middleware (beta)
        - React 18 support (Experimental)
- Gatsby.js
    - Gatsby.js 3
        - GraphQL 15 support
        - React 17 support
        - Webpack 5 support
    - Gatsby.js 4
        - Deferred Static Generation (DSG)
        - Server Side Rendering (SSR)

特につい最近開催された React Conf 2021 は React 公式より [記事](https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html) が出ている。

https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html

CSS フレームワーク界隈でも Material-UI のリブランディングもあった。

スタイリングソリューション再考の一環で emotion または styled-components から選択可能です。

```bash
# Material-UI v4.0-
npm i @material-ui/core
yarn add @material-ui/core

# MUI v5.0+
# emotion
npm i @mui/material @emotion/react @emotion/styled
yarn add @mui/material @emotion/react @emotion/styled

# styled-components
npm i @mui/material @mui/styled-engine-sc styled-components
yarn add @mui/material @mui/styled-engine-sc styled-components
```

v5.0 では `makeStyles()` が廃止される代わりに `styled()` を利用することによってカスタマイズできる点は大きな変更点のひとつ。

なおこの後当ブログでは Suspense と React Location に焦点を絞って書かせていただく。

## 参照するソースコードについて

これより参照するソースコードは今年、自身がジョインするプロジェクトとその周りにいるエンジニアを対象として行った React ハンズオンを下に説明させていただく。

その際に一般利用可能な Pokemon API を Web アプリ内で使って進めた。

[@preview](https://github.com/jiyuujin/pokemon)

この度の目標は Hooks API をベースとした Web アプリケーションを作ることとした。またターゲットを考慮して、フレームワーク Next.js を一切使わない選択をとった。

その目標を達成するため複数の技術的なマイルストーンを合わせ準備している。

- `react-query` または `swr` を利用した API のフェッチ
- `useState` を利用した状態管理
- `useMemo` を利用した再描画の仕組み

### Suspense

React 18 の Concurrent Rendering という機能で、コンポーネントそのものが「ローディング中でまだレンダリングできない」状態になる。

```ts
import { useQuery } from 'react-query'
import './App.css'
import './assets/gallery.css'

import { CardList } from './components/CardList'

function App() {
    const { data, error } = useQuery('items', async () => {
        return await fetch(
            `${process.env.REACT_APP_POKEMON_API}/pokemon?limit=200&offset=200`
        ).then((res) => res.json())
    })

    if (!data) return <div>Loading..</div>

    if (error) return <div>Failed</div>

    return (
        <div className="App">
            <div className="gallery">
                <CardList data={data.results} search={searchText} />
            </div>
        </div>
    )
}
```

Suspense を使う場合は CardList の責務が簡略化される。具体的にローディング中の処理は CardList の責務で無くなる。

```ts
import { useQuery } from 'react-query'
import './App.css'
import './assets/gallery.css'

import { CardList } from './components/CardList'

function App() {
    const { data, error } = useQuery('items', async () => {
        return await fetch(
            `${process.env.REACT_APP_POKEMON_API}/pokemon?limit=200&offset=200`
        ).then((res) => res.json())
    })

    if (error) return <div>Failed</div>

    return (
        <div className="App">
            <div className="gallery">
                <React.Suspense fallback={<>Loading..</>}>
                    <CardList data={data?.results} search={searchText} />
                </React.Suspense>
            </div>
        </div>
    )
}
```

また非同期コンポーネントを複数面倒見れる点も嬉しい。

```ts
<React.Suspense fallback={<>Loading..</>}>
    <Search text={searchText} setText={handleInputClick} />
    <CardList data={data?.results} search={searchText} />
</React.Suspense>
```

React 18 の SSR ストリーミングは Suspense を前提に、初期状態を表す HTML を最速で送ってその後データが揃ったらその HTML を置き換える。

これを活用するために非同期処理は Suspense を用いて書く必要がある。

https://github.com/reactwg/react-18/discussions/37

またそのレンダリングがサーバ側で非同期的に行われる特徴を Server Components にも活かせる。

::: message is-primary Server Components とは。

Client Components は props を渡すと仮想 DOM が返る。一方で絶対 React コンポーネントを async にできない props を受け取ったら同期的に仮想 DOM を返さないといけない。

なお Server Comonents とそれが import しているあらゆるものはバンドルに一切含まれない。

これこそ Zero-bundle-size と言われている所以です。

:::

### React Location

[React Location](https://github.com/tannerlinsley/react-location) は React Query の作者でもある @tannerlinsley が開発した React 用の新しい Router ライブラリです。

https://github.com/tannerlinsley/react-location

同氏は他にも React Table や React Chart などのライブラリも公開しています。

React Router が Remix との組み合わせを想定しているのに対し、兼ねてより SPA として利用するため CSR 下での非同期処理やキャッシュなどが盛り込まれている。

React Router と比較して、別途ルーティングリストとして切れるようになったのは大きい。

```ts
export const routes = [
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/about',
        element: <About />,
    },
]
```

`src/App.tsx` で Router コンポーネントでラップする。

```ts
import { routes } from './routes.constants'

const location = new ReactLocation()

function App() {
    return (
        <Router location={location} routes={routes}>
            <div>
                <Outlet />
            </div>
        </Router>
    )
}
```

基本的にはこれだけ実装すれば OK です。

ですが Route Loader を使う選択肢も存在、下記目的も合わせて確認いただきたい。

- 基本的に並列実行される
- キャッシュの最大経過時間を設定できる
- loader の実行中または実行した後に、特定の箇所を強制的に更新する

```ts
const routes = [
    {
        path: '/',
        loader: async (_match: any, { dispatch }: any) => {
            const teamsRes = await fetch(
                `${process.env.REACT_APP_POKEMON_API}/pokemon?limit=200&offset=200`
            )
            dispatch({
                type: 'maxAge',
                maxAge: Number(teamsRes.headers.get('max-age')),
            })
            return {
                data: await teamsRes.json(),
            }
        },
        element: <Index />,
    },
    {
        path: '/about',
        element: <About />,
    },
]
```

`useMatch` フックを利用して loader データを使う。

```ts
import { useMatch } from 'react-location'

function Index() {
    const {
        data: { data },
    } = useMatch()
}
```

激重 API などを対象に上手く Route Loader も使えたら、パフォーマンス最適化に繋がりそうだ。

### API 更新

React 18 で各種 API の更新が入るようです。

- [useMutableSource -> useSyncExternalStore](https://github.com/reactwg/react-18/discussions/86)
- [useId](https://github.com/reactwg/react-18/discussions/111)
- [useInsertionEffect](https://github.com/reactwg/react-18/discussions/110)

なお [ルート要素へのレンダリング API](https://github.com/reactwg/react-18/discussions/5) も更新されるようです。

```ts
import ReactDOM from 'react-dom'
import App from 'App'

const container = document.getElementById('root')

// React 17-
ReactDOM.render(<App />, container)

// React 18+
const root = ReactDOM.createRoot(container)
root.render(<App />)
```

## 最後に

サンプルリポジトリの各種ブランチをチェックいただければ幸いです。

- React Router の基礎を [feature/react-router](https://github.com/jiyuujin/pokemon/tree/feature/react-router) ブランチで確認する
- React Router で Suspense の利用を [feature/react-query_suspense](https://github.com/jiyuujin/pokemon/tree/feature/react-query_suspense) ブランチで確認する
- React Location の基礎を [feature/react-location](https://github.com/jiyuujin/pokemon/tree/feature/react-location) ブランチで確認する
- React Location で Route Loader オブジェクトの利用を [enhance/react-location_route-loader](https://github.com/jiyuujin/pokemon/tree/enhance/react-location_route-loader) ブランチで確認する
