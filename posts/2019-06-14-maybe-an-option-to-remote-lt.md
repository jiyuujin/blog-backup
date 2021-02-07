---
date: 2019-06-14
title: リモートLT ありだと気付いた
description: 来週の v-kansai #7 で初めてリモートLTを導入させていただきますが、今回はその予行という位置付けの下で準備させていただきました。
slug: maybe-an-option-to-remote-lt
reaction: 📼
category: 
tags: 
 - Vue
 - Laravel
---

来週の v-kansai #7 の予行を第一に考え参加させていただきました。

<a class="link-preview" href="https://vuekansai.connpass.com/event/127057/">v-kansai #7</a>

### Zoomを使う

発行した URL を共有すれば即試せます。

アプリ版 Zoom をインストールする必要はありますが、仮にインストールしていなくてもブラウザからアクセスできますね。

気を付けるべきはスピーカーの音量。今回の会場はこぢんまりとしているため、MBP 純正のスピーカーを使いましたが来週のミートアップで足りないことも。

### 沖縄・宮崎・大阪を繋ぐ

自身初のリモートながら今回複数都市を跨ぎました。

始めに株式会社 Re:build の [カンボ (@kanbo0605)](https://twitter.com/kanbo0605) さんから、地方で勉強会を行うに当たって中々登壇者が集まらないこと。この課題を解決したかったことが、今回のイベントの契機になっているそう。結果として沖縄や宮崎、大阪から 3 名の登壇者が生まれイベントとして成功、ミートアップとしての体裁も成立していることを感じさせられました。

引き続き登壇も行われ、View Composer の概念について。宮崎の合同会社ノマドリの大塚真言さんから、駆け出しエンジニアのコードをレビューした経験について話されました。最後に大阪から自らゲーム(にゃんこ大戦争)運営で使っている管理画面制作の経験について話しています。

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/laravel-viewcomposer">Laravel View Composer</a>

<a class="link-preview" href="https://slides.com/jiyuujin/20190131#/">コンシューマ向け SPA 開発から得られた知見</a>

個人的にはコードレビューの経験に興味を持ちました。

自身もバリデーションを FormRequest で行っていたので理解は大変早かったです。

一方でイベント情報の更新処理にアクセサと appends を採用した話については大変新鮮でした。
