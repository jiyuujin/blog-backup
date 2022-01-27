---
date: 2022-01-27
title: useEffect の内側を理解する
description: とあるプロジェクトのエンジニア教育の一環で useEffect の内部構造について解説する機会があってこの度、言語化いたしました。
slug: deep-dive-react-useeffect
reaction: 🍊
category: Scrap
tags: 
 - React
 - TypeScript
---

## `useEffect`

今回は `useEffect` を中心に見ていく。結論を言うと `mountEffect` と `updateEffect` を見れば良い。その理由こそ `useEffect` がコンポーネントの初期レンダリングを始め、書き手の自由に応じたレンダリングの制御も可能であるため。

実際に元の hook 同様のコールバック関数と依存関係の配列を受け入れる。第 2 引数である依存関係の配列に何も渡されないと、コンポーネントの初期レンダリング時に実行される。

主に下記ケースで `useEffect` を使うことが多い。

- 手動で行う DOM 変更関連の処理
- サーバ API からのデータフェッチの処理
- イベントリスナーによるサブスクリプションの処理

### カウンタアップの例

具体的にカウンタアップとその DOM 更新を例にとる。

初期レンダリングで DOM を更新する。

- 変数 `count` を定義する
- コールバック関数内で DOM を更新する

```tsx
import { useEffect, useState } from 'react'

const Component = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
}
```

するとコンポーネントは `count` に初期値が入っていることを確認できる。

```bash
# document.getElementsById('title')
You clicked 0 times
```

続いて依存関係の配列に `count` を渡してみよう。

- 変数 `count` を定義する
- コールバック関数内で DOM を更新する
- 第 2 引数に `count` を設定する

```tsx
import { useEffect, useState } from 'react'

const Component = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])
}
```

するとコンポーネントは `count` が変更される度に DOM 更新が実行されるはずです。

```bash
# document.getElementsById('title')
You clicked 1 times
```

それを確認するためカウンタアップ用に適当なボタンを作成してみよう。

するとコンポーネントは `count` が変更される度に DOM 更新が実行される。

```tsx
import { useEffect, useState } from 'react'

const Component = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <button onClick={() => setCount(count + 1)}></button>
  )
}
```

### さらに `useEffect` の内側を理解する

前提として `useState` 同様に dispatcher を設定しておりその `useEffect` を見る。

```js
dispatcher.useEffect(function () {

  var maybeNewVersion = getVersion(source._source);

  if (!objectIs(version, maybeNewVersion)) {

    if (!objectIs(snapshot, maybeNewSnapshot)) {
      var lane = requestUpdateLane(fiber);
      markRootMutableRead(root, lane);
    }

    markRootEntangled(root, root.mutableReadLanes);
  }

}, [getSnapshot, source, subscribe]);
```

先に説明したコールバック関数内第 2 引数である依存関係の配列に何らかの値が入った場合に、同じバッチでレンダリングできるように更新キューを実行している。

```js
function requestUpdateLane(fiber) {
  var mode = fiber.mode;

  if ((mode & BlockingMode) === NoMode) {
    return SyncLane;
  } else if ((mode & ConcurrentMode) === NoMode) {
SyncBatchedLane;
  }

  if (currentEventWipLanes === NoLanes) {
    currentEventWipLanes = workInProgressRootIncludedLanes;
  }

  var isTransition = requestCurrentTransition() !== NoTransition;

  if (isTransition) {
    if (currentEventPendingLanes !== NoLanes) {
      currentEventPendingLanes = mostRecentlyUpdatedRoot !== null ? mostRecentlyUpdatedRoot.pendingLanes : NoLanes;
    }

    return findTransitionLane(currentEventWipLanes, currentEventPendingLanes);
  }

  var schedulerPriority = getCurrentPriorityLevel();

  var lane;

  if (
  (executionContext & DiscreteEventContext) !== NoContext && schedulerPriority === UserBlockingPriority$2) {
    lane = findUpdateLane(InputDiscreteLanePriority, currentEventWipLanes);
  } else {
    var schedulerLanePriority = schedulerPriorityToLanePriority(schedulerPriority);

    lane = findUpdateLane(schedulerLanePriority, currentEventWipLanes);
  }

  return lane;
}
```

そして何らかの更新する際は `enqueueUpdate` を実行する。

```js
function updateContainer(element, container, parentComponent, callback) {
  var current$1 = container.current;

  var lane = requestUpdateLane(current$1);

  var context = getContextForSubtree(parentComponent);

  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  var update = createUpdate(eventTime, lane);

  update.payload = {
    element: element
  };
  callback = callback === undefined ? null : callback;

  if (callback !== null) {
    update.callback = callback;
  }

  enqueueUpdate(current$1, update);

  return lane;
}
```

関数を fiber と紐付けることで、各コンポーネントの更新を区別できるようにしている。

```js
function enqueueUpdate(fiber, update) {
  var updateQueue = fiber.updateQueue;

  var sharedQueue = updateQueue.shared;
  var pending = sharedQueue.pending;

  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  sharedQueue.pending = update;
}
```

## 無限ループに注意する

しばしば出会す無限ループ。結論を言うと第 2 引数をきちんと追いきれていない可能性がある。

具体的にカウンタアップをコールバック関数内で済ませてしまうケースを例にとる。

```tsx
import { useEffect, useState } from 'react'

const Component = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount((count) => count + 1)
  }, [count])
}
```

`count` の値が変わって、コールバック関数でその都度更新される。

これこそ無限ループとなってしまう原因です。

このケース以外にも非同期通信を処理した場合など `useEffect` の使いどころを考慮する必要がある。

- 非同期通信を処理した場合
- Hooks 用に公開された [ESLint プラグイン](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) で `react-hooks/exhaustive-deps` をチェックした場合

他にも注意するべきことは存在するけど、今回はこの辺で。

## その他

ひと昔前に書いていたクラスコンポーネントで `useEffect` を例えると `componentDidMount` と `componentDidUpdate` の組み合わせと説ける。
