---
date: 2022-01-20
title: useState の内側を理解する
description: とあるプロジェクトのエンジニア教育の一環で useState の内部構造について解説する機会があってこの度、言語化いたしました。
slug: understand-internal-structure-of-usestate
reaction: 🍏
category: Front
tags: 
 - React
 - TypeScript
---

今回は `useState` を中心に見ていく。

Hooks の中でも一番使われている (と言っても過言ではない) `useState` の目的は、ローカルステートの管理をひとつにしている。

関数コンポーネントの中で `useState` という Hooks を呼び出すと、現在の状態と状態を更新するための関数を返してくれる。状態がまだ存在しない場合は `useState` に渡した値がその状態の初期値として使われる。

```tsx
import { useState } from 'react'

const [count, setCount] = useState(0)
```

結論を言うと `useState` は `mountState` と `updateState` を見れば良い。

### さらに `useState` の内側を理解する

直接関数が状態を持っている訳ではなく、どこかに保存して毎回そこから状態取ってきてるだけです。

dispatcher の `useState` を見る。

```js
var dispatcher = ReactCurrentDispatcher$1.current;

var _dispatcher$useState = dispatcher.useState(function () {
  return readFromUnsubcribedMutableSource(root, source, getSnapshot);
}),
  currentSnapshot = _dispatcher$useState[0],
  setSnapshot = _dispatcher$useState[1];
```

次に `ReactCurrentDispatcher` へ代入している箇所を確認する。

```js
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig;
```

その場所は `renderWithHooks` です。

異常系やそれに付随するコメントなどを除くと、その `renderWithHooks` で行っている内容は下記の通りです。

- Dispatcher を付与する
- 更新がある限り、計算を続ける
  - 初回呼出時に dispatcher は  `HooksDispatcherOnMount` が設定される
  - `useState(initialValue)` を呼び出す
  - fiber や queue、 action を受け取る関数 `dispatchAction` の戻り値 `mountState` が次の状態として設定される

```js
function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {

  // Dispatcher を付与する
  {
    if (current !== null && current.memoizedState !== null) {
      ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;
    } else if (hookTypesDev !== null) {
      ReactCurrentDispatcher$1.current = HooksDispatcherOnMountWithHookTypesInDEV;
    } else {
      ReactCurrentDispatcher$1.current = HooksDispatcherOnMountInDEV;
    }
  }

  // 更新がある限り、計算を続ける
  var children = Component(props, secondArg);

  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    var numberOfReRenders = 0;

    do {
      didScheduleRenderPhaseUpdateDuringThisPass = false;

      numberOfReRenders += 1;

      ReactCurrentDispatcher$1.current =  HooksDispatcherOnRerenderInDEV ;
      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }

  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;

  var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;

  return children;
}
```

初回は `HooksDispatcherOnMount` として 2 回目以降は `HooksDispatcherOnUpdate` として設定される。この通り呼出回数に応じてこの Dispatcher を変えることで、それを割り当てた後にコンポーネントをレンダリングする。

そこで hook には下記の通り 5 つのプロパティが準備されている。

- 状態
   - `hook.memoizedState` はメモリに保持されているローカルな状態
   - `hook.baseState` は `hook.baseQueue` 内全てのオブジェクトがマージされた後の状態
- 参照系
   - `hook.next` は次の hook へ参照する
- 更新キュー
   - `hook.baseQueue` は優先度の高いオブジェクトを更新する
   - `hook.queue` は優先度の高い全てのオブジェクトを更新する

渡された初期値は `hook.memoizedState` に放り込まれ、適宜それを実行することで hooks の初期値を取り出すことができる。

そして何らかの更新する際はオブジェクトを作成し enqueue を実行する。

```js
var classComponentUpdater = {
  isMounted: isMounted,
  enqueueSetState: function (inst, payload, callback) {
    var fiber = get(inst);
    var update = createUpdate(eventTime, lane);
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      {
        warnOnInvalidCallback(callback, 'setState');
      }

      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
  },
}
```

関数を fiber と紐つけることで、各コンポーネントの更新を区別できるようにしている。

```js
function enqueueUpdate(fiber, update) {
  var updateQueue = fiber.updateQueue;

  var sharedQueue = updateQueue.shared;
  var pending = sharedQueue.pending;

  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  sharedQueue.pending = update;
}
```

このように `useState` は dispatcher の設定とそれに付随して更新キューが実行されている
