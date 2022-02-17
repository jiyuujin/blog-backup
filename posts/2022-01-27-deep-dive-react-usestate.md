---
date: 2022-01-27
title: useState の内側を理解する
description: とあるプロジェクトのエンジニア教育の一環で useState の内部構造について解説する機会があってこの度、言語化いたしました。
slug: deep-dive-react-usestate
reaction: 🍏
category: Scrap
tags: 
 - React
 - TypeScript
---

## `useState`

初回の今日は `useState` を中心に見ていく。とりわけ Hooks の中でも一番使われている (と言っても過言ではない) `useState` の目的は、ローカルステートの管理をひとつにしています。

関数コンポーネントの中で `useState` という Hooks を呼び出すと、現在の状態と状態を更新するための関数を返してくれる。状態がまだ存在しない場合は `useState` に渡した値がその状態の初期値として使われる。

```tsx
import { useState } from 'react'

const [count, setCount] = useState(0)
```

結論を言うと `useState` は `mountState` と `updateState` を見れば良い。

### さらに `useState` の内側を理解する

関数が直接状態を持っている訳ではなく、どこかに保存して毎回そこから状態取得しているだけに過ぎません。

dispatcher の `useState` が設定されています。そこを起点に `renderWithHooks` が `ReactCurrentDispatcher`への代入を進めています。

異常系やそれに付随するコメントなどを除くと、そこで行っている内容は下記の通りです。

- Dispatcher を付与します
- 更新がある限り、計算 (状態更新) を継続します
  - 初回呼出時に dispatcher は  `HooksDispatcherOnMount` を設定します
  - `useState(initialValue)` を呼び出します
  - fiber や queue、 action を受け取る関数 `dispatchAction` の戻り値 `mountState` が次の状態として設定します

初回は `HooksDispatcherOnMount` として 2 回目以降は `HooksDispatcherOnUpdate` として設定される。この通り呼出回数に応じてこの Dispatcher を変えることで、それを割り当てた後にコンポーネントをレンダリングします。

そこで hook には下記の通り 5 つのプロパティが準備されています。

- 状態
  - `hook.memoizedState` はメモリに保持されているローカルな状態
  - `hook.baseState` は `hook.baseQueue` 内全てのオブジェクトがマージされた後の状態
- 参照系
  - `hook.next` は次の hook へ参照する
- 更新キュー
  - `hook.baseQueue` は優先度の高いオブジェクトを更新する
  - `hook.queue` は優先度の高い全てのオブジェクトを更新する

渡された初期値は `hook.memoizedState` に放り込まれ、適宜それを実行することで hooks の初期値を取り出すことができます。

そして何らかの更新する際はオブジェクトを作成し `enqueue` を実行します。

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

関数を fiber と紐つけることで、各コンポーネントの更新を区別できるようにしています。

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

`useState` の裏側では dispatcher の設定とそれに付随して蓄積された更新キューが実行されていることがお分かりいただけたでしょうか。
