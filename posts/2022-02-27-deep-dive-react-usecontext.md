---
date: 2022-02-27
title: useContext の内側を理解する
description: とあるプロジェクトのエンジニア教育の一環で useContext の内部構造について解説する機会があってこの度、言語化いたしました。
slug: deep-dive-react-usecontext
reaction: 🍇
category: Scrap
tags: 
 - React
 - TypeScript
---

## `useContext`

`useContext` は広範囲かつ様々な階層で必要となるデータを保持する場合に使われます。ただし、全てのコンポーネントをグローバルな状態に直接依存させるのは決して良いとは言えません。

もちろんコードが拡張されると、テストが書き辛くなることを挙げられます。

それを解決するため、通常のコンポーネントを作成し、必要なデータにアクセスできるようラップします。

やっていることを掻い摘んで話すと下記の通りです。

- `createContext` で生成した Context を、状態 (Store) として管理する
- Content の `Provider` で囲み Scope を決定する

ここで管理されている状態 (Store) は `useState` や `useReducer` で生成した State や Dispatch にあたるものと考えてください。

- Store を利用する際 `useContext` を利用して状態を取得する
- Store に格納した State から状態を読み取ったり、また Store に格納した Dispatch から状態を変更する

なお、下記の例で示すようにログイン中のユーザ情報や、ダークモードに代表されるスタイルを保持できます。グローバルで管理したい場合などに役立てることができます。

### さらに `useContext` の内側を理解する

率直に Context 値に対して更新を最適化できる Context API では `changedBits` と `observedBits` を指定する必要があります。

この `observedBits` は Context に隠された機能です。

Context を把握するために、ビットマスクが使用されていることを理解する必要があります。

```tsx
const calculateChangedBits = (currentValue, nextValue) =>
  nextValue.value % 2 === 0 ? 0b10 : 0b1;
```

これから扱う数字は全て偶数か奇数、関数 `calculateChangedBits` は常に `0b1` か `0b10` を返します。

これを利用することで新しい Context を作成し、適切な `observedBits` プロパティをコンシューマに提供します。

```tsx
import { createContext } from 'react'

const { Consumer, Provider } = createContext(null, calculateChangedBits)

render(
  <StateProvider initialState={{ value: 0 }}>
    <Counter label="Current value" observedBits={0b11} />
    <Counter label="Odd" observedBits={0b1} />
    <Counter label="Even" observedBits={0b10} />
  </StateProvider>,
  document.getElementById("root"),
)
```

`0b1` や `0b10` も `0b11` の「観測ビット」にあたるもので、省略した部分を含めると最初のカウンタは毎回再レンダリングされます。

- 2 番目のカウンタは、関数 `calculateChangedBits` が `0b1` を返した時にのみ、レンダリングされる
- 3 番目のカウンタは、関数 `calculateChangedBits` が `0b10` を返した時にのみ、レンダリングされる

このようにどれを更新すべきか boolean 値の状態を効率的に符号化できることが、ビットマスクを選択した理由のひとつになります。

Context API の詳細について、下記 [記事](https://hph.is/coding/bitmasks-react-context) をチェックいただきたい。

[Bitmasks and the new React Context API](https://hph.is/coding/bitmasks-react-context)

なお、かつてパフォーマンス最適化のため Context API における `observedBits` の使用を検討していた issue はこちらです。

[Investigate use of context + observedBits for performance optimization](https://github.com/reduxjs/react-redux/issues/1018)

### `useContext` を使った事例

`useContext` の利用でパブリックオープンな事例をもうひとつ列挙します。それが VS Code Conference JP 2021 公式ウェブサイトにおけるダークモードの実装です。

https://vscodejp.github.io/conf2021/ja/

先のユーザ情報保持と基本的に `useContext` がやっていることは何も変わりません。

もちろんこの事例にかかわらず、一般的なダークモードを実装する場合でも、この `useContext` は有効な手段のひとつです。

私 [@jiyuujin](https://yuma-kitamura.nekohack.me/) が中心となり VS Code Conference JP 2021 の公式ウェブサイトにコントリビュートさせていただいた。なお、こちらのウェブサイトでは `useContext` と localStorage を利用して、テーマを保持しています。

先日、当ブログで書かせていただきました。下記 [記事](https://webneko.dev/posts/inside-the-website-in-vscodecon-jp-2021) をチェックいただければ幸いです。

[VSCodeCon JP 2021 サイトの内幕](https://webneko.dev/posts/inside-the-website-in-vscodecon-jp-2021)
