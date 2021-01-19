---
date: 2019-02-12
title: Firebase Meetup X イベントリポート
description: 大阪のみならず、東京でもコネクションを拡げるため、Firebase日本ユーザーグループ主催のミートアップに初めて参戦いたします。
slug: enter-the-firebase-meetup-10
category: 
tags: 
 - Firebase
---

## まず初めに、

時期的にやっぱり、Firestore GA..🎉 事前にブログ等で公表されておりほぼ変わらず、といった感じですね。

1. FirestoreがGCPの正式なSLAに含まれた
2. 監視の仕組みとして、GCPのStackdriverと合わせて使えるようになった
3. 新しい低価格帯が発表された
4. 新しいロケーション(asia-northeast1)が発表された

## 掻い摘んでご紹介

### Firebaseでつくるグループチェックリスト管理サービス

[checka!](https://itunes.apple.com/jp/app/checka-%E3%83%81%E3%82%A7%E3%83%83%E3%82%AB/id1451433619)で実際にFirestoreを採用した話、設計周りで気をつけたことが特に参考になりました。即座に反映されるわけでは無いが、Function経由でデータを追加しているとのこと。

- create権限は与えない。
    1. exist/rulesで上手くcreate権限を管理
    2. 重要な処理はFunctionで実現

<a class="link-preview" href="https://itunes.apple.com/jp/app/checka-%E3%83%81%E3%82%A7%E3%83%83%E3%82%AB/id1451433619">checka!</a>

<a class="link-preview" href="https://github.com/sgr-ksmt/firebase-ec-demo">Firebase EC Demo</a>

<a class="link-preview" href="https://speakerdeck.com/mogaming/check-list-apps-on-firebase">Firebaseでつくるグループチェックリスト管理サービス</a>

### Firestore導入前に検討した5つのこと

チェックリストのような感覚で聞けました。こちらも設計周りを含め、ルールは読み込み用と書き込み用のコレクションを分けることも検討すべきとのこと。

CQRS (コマンド、クエリの責務を分離する)のも検討しなければいけないという話でした。

<a class="link-preview" href="https://speakerdeck.com/pochisato/firestoredao-ru-qian-nijian-tao-sitakatutabesuto5-at-firebase-meetup-number-10">Firestore導入前に検討した5つのこと</a>

### 無限スクロールの話

Vue + TypeScriptに加え、 Reactive Programmingを導入しているのは強い！フロントでデータを保持する構成を取っているようで、お手隙のタイミングに確認してみようと思います。

<a class="link-preview" href="https://github.com/k-okina/book-management">book-management</a>

<a class="link-preview" href="https://slides.com/kahirokunn/deck-9#/">無限スクロールの話</a>

## 最後に、

もうひと方登壇を予定していたようですが。。運営って大変だなぁ、と感じてしまいました。😅
