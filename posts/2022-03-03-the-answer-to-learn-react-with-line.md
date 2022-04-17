---
date: 2022-03-03
title: LINE と共に React (Vite) を学ぶ
description: LINE Developer コミュニティで React (Vite) × LINE Front-end Framework のハンズオンを企画するにあたって、当ブログではその補足を説明させていただきます。
slug: the-answer-to-learn-react-with-line
reaction: 🧸
category: Front
tags: 
 - React
 - TypeScript
 - FirebaseHosting
 - LIFF
---

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

今流行りの Next.js では `getStaticPaths` や `getStaticProps` に代表される独自のプレレンダリング機能を始め、把握する情報は多いと判断しました。

また CRA は React 経験者誰しもが通る道にあるフロントエンド・フレームワークですが、最近の開発速度が低調になってきている点は非常に気掛かりです。

CRA の低調な開発に肩を並べるように、時を同じく [Vite 2 の React サポート入り](https://vitejs.dev/blog/announcing-vite2.html) もあって、広く Vite がフロントエンドのビルドに使われ始めようとしています。

フロントエンド・フレームワークは三者三様、様々な背景が存在します。どれを選択すれば良いか、逆に選択してはいけないといったことも特にありません。

## もう少し喋っておきたいこと

今回の LIFF アプリを製作する上で、近くリリースが予定されている React 18 のコンポーネントのライフサイクルが大きく変わるという話があります。

### 先日、発表された StrictMode が与える影響

2022 年 02 月現在、 React の stable バージョンは [`17.0.2`](https://github.com/facebook/react/releases/tag/v17.0.2) です。昨年の React Conf 2021 でも React 18 の [セッション](https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html) があったように、近く React 18 がリリースされます。

[React Conf 2021 Recap](https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)

数ある変更が存在する中で、特に `useEffect` 周りの挙動に変更が予定されています。

具体的にはコンポーネントがマウントされた際、通常の `useEffect` に加え余計に発火されてしまいます。

そもそも StrictMode を取り入れる動機が、コンポーネントをアンマウントする代わりに、状態を保持することを可能にするため。

この目的を達成するため、コンポーネントをアンマウントするときと同じライフサイクルフックを呼び出しますが、コンポーネントと DOM 要素の両方の状態を保持することになります。

これこそ、コンポーネントのマウントとアンマウントを複数回繰り返すことを意味しています。

詳しくは [参照](https://github.com/reactwg/react-18/discussions/19) をご確認いただければ幸いです。

そう遠くない将来においては、複数回呼び出される可能性のある `useEffect` で `init()` しない方が良いでしょう。

<!--
### useReducer をステート管理として使うことへの是非

そもそも useReducer という話から。基本的に useState の内部構造と似ています。現在のステートと、ステート変更のためのアクションを受け取って、新しいステートを返します。

```tsx
import { useReducer } from 'react'

const initialUser: string = ''

const reducer = (state: string, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.user
  }
}

const [state, dispatch] = useReducer(reducer, initialUser)
```

```tsx
import { useState } from 'react'

const Counter1 = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Counter is {count}</p>
      <p>
        <button
          onClick={() => {
            setCount(current++)
          }}
        >
          increment
        </button>
      </p>
    </div>
  )
}
```

これまでステート管理の一環で、useReducer を使うこともしばしば。

結論からいうと、これはアンチパターンとなってしまいます。

```tsx
import { useReducer, useRef } from 'react'

const Counter2 = () => {
  const countRef = useRef(0)
  const [, forceRerender] = useReducer((c: number) => c + 1, 0)

  return (
    <div>
      <p>Counter is {countRef.current}</p>
      <p>
        <button
          onClick={() => {
            countRef.current++
            forceRerender()
          }}
        >
          increment
        </button>
      </p>
    </div>
  )
)
```

しかし React 18 以降、新たに登場するトランジションや Suspense と組み合わせて使うと、正しく計測されない可能性があります。

[New feature: startTransition](https://github.com/reactwg/react-18/discussions/41)

詳しくは uhyo さんの記事をご確認いただければ幸いです。

[useRefでステートを管理するのはReact18でアンチパターンになるからやめよう](https://qiita.com/uhyo/items/6a3b14950c1ef6974024)
-->

### LINE Developer コミュニティから

今回の教材は [Zenn book](https://zenn.dev/books) を利用しています。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

3 月 3 日当日の動画は、アーカイヴ化されています。

https://www.youtube.com/watch?v=D8GeQyrueEY

<!--
また参加された皆さまには、アンケートにご回答いただければ。

https://docs.google.com/forms/d/e/1FAIpQLSdiP9kc3BkpwVrrV5ieuy8u3TnRXUWPB3VUbGDPYrBkPMaIHA/viewform
-->

## その他

Vite または Next.js 上で動く LIFF アプリをご確認いただければ幸いです。

また Vite 上で React を動作させる [サンプル](https://github.com/jiyuujin/template-vite-react) や、 Next.js 上で React を動作させる [サンプル](https://github.com/nekohack-oss/nextjs) も合わせご確認いただきたい。

- [https://github.com/jiyuujin/vite-react-liff](https://github.com/jiyuujin/vite-react-liff)
- [https://github.com/jiyuujin/nextjs-liff](https://github.com/jiyuujin/nextjs-liff)
- [https://github.com/jiyuujin/template-vite-react](https://github.com/jiyuujin/template-vite-react)
- [https://github.com/nekohack-oss/nextjs](https://github.com/nekohack-oss/nextjs)
