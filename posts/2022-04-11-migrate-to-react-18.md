---
date: 2022-04-11
title: React 18 へ移行するにあたって
description: React 18 が正式リリースされたのを受け、簡単に記録させていただきました。
slug: migrate-to-react-18
reaction: 👱🏻‍♀️
category: Front
tags: 
 - React
 - TypeScript
---

3 月 30 日に React 本体が、遅れて 4 月 7 日に型定義ファイルもリリースされた。

https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210

OSS の PR と合わせ、取り急ぎ各種リポジトリを更新した。

- https://github.com/nekohack-oss/vite-react/tree/chore/react18
- https://github.com/jiyuujin/template-vite-react

## 注意するべきこと

React 18 に更新する際、その変更差分は大きくないものの、いくつか気を付けたいことがある。

- `createRoot` への仕様変更
- 暗黙的なコンポーネントにおける Children の扱い
- React 18 の新機能
  - Concurrency モード
  - 自動バッチ処理
  - トランジション (Transition)
  - サーバサイドにおける React Suspense

### `createRoot` への仕様変更

Root DOM 作成 API に変更があった。

- React 17 までは `ReactDOM.render` を使っていた
- React 18 では `ReactDOM.createRoot` を使う

https://github.com/jiyuujin/template-vite-react/commit/b6dcf252c22a68c89ca2ca4c21f212f4fcf86b1a

### 暗黙的なコンポーネントにおける Children の扱い

Children を実装しているものの下記の暗黙の宣言に依存しているコンポーネントについて、削除される破壊的変更があり注意しなければいけない。

- `React.FunctionComponent`
- `React.Component.Function`

```tsx
interface Props {
  children?: React.ReactNode
}

class SomeClassComponents React.Component<Props> {
  render() {
    return  <div>{this.props.children}</div>
  }
}
const SomeFunctionComponent: React.FunctionComponent<Props> = props => <div>{props.children}</div>
```

### React 18 の新機能

昨年暮れにアドベントカレンダーの記事のひとつとして、簡単に React 18 の記事を書かせていただいた。

React Conf でも触れられていた関係から React Suspense も合わせて解説している。

https://webneko.dev/posts/upcoming-react-18-in-2022

#### Concurrency モード

Concurrency モードは、アリスとボブの 2 人に電話する例をとり、上手く解説してくれている [Github discussion](https://github.com/reactwg/react-18/discussions/46) を確認いただきたい。

https://github.com/reactwg/react-18/discussions/46

これまでのレンダリングは単一で中断されることのない同期トランザクションであり、レンダリングが開始されると中断できません。

しかし React 18 ではレンダリングを中断、一時停止、再開、または放棄できる。

#### 自動バッチ処理

文字通り React 18 以降、イベントコールバック内で全ての状態の更新を可能にした。

この自動バッチ処理は、下記 [Github discussion](https://github.com/reactwg/react-18/discussions/46#discussioncomment-846694) を確認いただきたい。

https://github.com/reactwg/react-18/discussions/46#discussioncomment-846694

#### トランジション (Transition)

`startTransition` は `setTimeout` と異なりすぐに実行される。 `setTimeout` には保証された遅延が存在する一方、 `startTransition` はデバイスのスペックや緊急のレンダリングによって、どの程度遅延するか異なる。

```tsx
import { startTransition } from 'react'

// Transition
startTransition(() => {
  setCounter(counter)
})
```

## 最後に

それぞれの項目について、別途深く解説する時間を取らせていただくとして、いま一度 React 18 を学んでおきたい次第です。
