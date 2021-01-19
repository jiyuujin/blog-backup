---
date: 2018-12-07
title: Firestoreに移行したら色々と楽になった話
description: Firebase Advent Calendar 2018 8日目の記事です。
slug: migration-to-firestore-on-advent-calendar-2018
category: Server
tags: 
 - Firebase
 - Firestore
---

## Nuxt Adminとは

当ブログの問い合わせを管理するため、裏側の管理画面を自作、バックエンドに Firestoreを採用しています。ちなみに管理画面のフロントエンドでも　Vue.jsのフレームワークの一つNuxt.jsを採用しています。

<a class="link-preview" href="https://admin.nekohack.app/">https://admin.nekohack.app/</a>

### ただし自分以外触れません

近く権限を追加した上で、閲覧用アカウントの開設を検討中。主な機能は、

1. 技術ネタ・勉強会スライド一覧
2. Qiita一覧(いいね管理をスマートに)
3. 当ブログ解析結果一覧
4. 搭乗ログ一覧

## 前回のおさらい

技術スタックに Nuxt (Vuetify) + Firebase、今回SPA(generate)としてデプロイしています。フロントの話は [Nuxt.js Advent Calendar 21日目](https://webneko.info/posts/doing-my-best-to-atomic-design-on-advent-calendar-2018) にてご紹介します。

## 今回の結論

DB設計楽チン、ですがどこか無法地帯な印象の Realtime DB。より構造化された Firestoreに移行することで解決する課題も多々存在しました。また多彩な型のサポートの登場も大きく、文字列や数値、バイナリやタイムスタンプ、地理的位置などが登場しています。

1. 型のサポート
2. 苦しんだソートの実装

### 対比しながら確認します

初期設定に大差はありません。予めプロジェクトIDなど必要な設定を忘れないようにします。

```js
// Realtime DB
const adminDB = Admin.database();

// Firestore
const adminFirestore = Admin.firestore();
adminFirestore.settings({
  timestampsInSnapshots: true
});
```

インポートの指定先に注意、Firestoreに移行するのでfirebase/firestoreを指定します。この時 firebase/appを指定してあげないと gRPC関連のエラーに引っ掛かります。

```js
// Realtime DB
import firebase from 'firebase'

// Firestore
import firebase from 'firebase/app'
import 'firebase/firestore'
```

取得処理では、 Realtime DBで苦しむ「降順」を楽に実現！

```js
// Realtime DB
tipsRef.orderByChild('time')

// Firestore
tipsCollection.orderBy('time', 'desc').get()
    .then(snapshot => {
      let result = {
        item: []
      }
      snapshot.forEach(doc => {
        // console.log(doc.id + ' ' + doc.data())
        result.item.push({
          id: doc.id,
          data: doc.data()
        })
      })
      commit('setTips', result)
    })
```

個人的に更新処理が凄く分かり易くなった、という印象です。コレクションで指定のデータベースを、またドキュメントで指定のキーを特定した上で更新します。

```js
// Realtime DB
let updates = {};
updates['/tips/' + key] = {
    title: data.title,
    url: data.url,
    description: data.description,
    tags: data.tags,
    event: data.event,
    time: data.time
  };
Admin.database().ref('tips').update(updates);

// Firestore
Firestore.firestore().collection('tips').doc(key).set({
    title: data.title,
    url: data.url,
    description: data.description,
    tags: data.tags,
    event: data.event,
    time: data.time
  });
```
