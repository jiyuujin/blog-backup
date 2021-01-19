---
date: 2019-08-21
title: FJUGと共催して開催しました
description: 盆明け FJUG共催、 v-kansai #9 を開催しました。
slug: enter-the-v-kansai-9-with-fjug-osaka
category: 
tags: 
 - Vue
 - Firebase
 - Firestore
 - Review
---

## FJUG共催でした！

全体の名前が長ったらしくなってしまいましたが、今回は Firebase Meetup in Osaka #5 / v-kansai #9 として開催。ハッシュタグは #fjug #v_kansai を使いました。

![v-kansai-with-fjug](//images.ctfassets.net/gzkue3szf85p/6a1GnWSAj9QhXxykDme8za/80eda90b7cf70e3f0890de2a210d6f40/v-kansai-with-fjug.png)

FJUG側のオーガナイザーの一人 [@TanakaMidnight](https://twitter.com/TanakaMidnight) さんからも紹介がありました。

### 駅から少し離れていましたが。。

こうした懸念は払拭されたと思います！おしゃれな空間でまた機会あれば利用させていただければと思います🙇‍♀️

![fabcafe-kyoto](//images.ctfassets.net/gzkue3szf85p/2THyfeuQ9q4lfzzqr96yoV/cfd1b6ca419c129da9e3d49fcdc91d33/fabcafe-kyoto.png)

ちなみに遠目に京都タワーが見える好立地でした。

### v-kansaiとしては今回初、有料イベントでした！

ドリンク全て ¥500で提供。わたしは地ビールを選択しました。

![v-kansai-9-beer](//images.ctfassets.net/gzkue3szf85p/191H5reiU0rLSf5FYCzUvM/7ea92fcd6c76cae1cc5445e332bafc84/IMG_2642.jpeg)

今後も有料イベントを一つとして検討する方向ですが、もっとこうして欲しいというご意見などあれば忌憚無くお伝えいただければ助かります。

### 秋田のお土産は好評.. (?)

先日 CaT vol.7 参戦した私自ら秋田のお土産を持ち寄りました。以下簡単にスライドでも共有させていただきましたが、詳しくは [昨日のブログ](https://webneko.dev/posts/enter-the-cat-vol-7-in-akita) をご確認いただければと思います🙏

<a class="link-preview" href="https://slides.com/jiyuujin/20190821-01#/">CaT vol.7 in 秋田 振り返り</a>

![akita-kinman](//images.ctfassets.net/gzkue3szf85p/63I6gIJK5NiSOoGVgKWdiR/c1290872534c7fb382a95ef11a574c8a/akita-kinman.png)

何はともあれ皆さま、食べていただけたようで良かったです😊

## Firebaseに纏わるLT

Yuji Onishi さんから、 [Flutter for web](https://flutter.dev/web) の話。基本的に `webdev serve` を叩くとローカルサーバが立ち上がりお手軽に始められるが、唯一ハマったことがあった。それはクロスコンパイル順に定義順を整えてくれなかったので、気をつけて欲しいという話でした。

(資料公開をお待ちください)

株式会社ラクス [加納 悠史 (@YKanoh65)](https://twitter.com/YKanoh65) さんから、ビアバッシュ専用Webアプリを作った話。連打に対する弱さについては分散カウンタを使って解決したが、あっさりと無料枠を超えてしまったのは課題の一つ。また Vuexfireを使うことで Vuexに大量のデータを保持、可読性が落ちてしまったことも課題となり、改善したいと言う話でした。

<a class="link-preview" href="https://speakerdeck.com/ykanoh/apurizuo-cheng-toyun-yong-karaxue-bu-firebase-to-vue-dot-js-6a6c5d6f-0bee-4640-8d90-c0a3e51662dc">アプリ作成と運用から学ぶ Firebase と Vue.js</a>

フリュー株式会社 [@chan_kakuz](https://twitter.com/chan_kakuz) さんから多種多様なプラットフォームに応じてイベントを自由に変えられる Dynamic Linksの特徴について。お手軽なリンクの管理に加えて、クリック数も管理できるメリットは嬉しいですね。

<a class="link-preview" href="https://slides.com/chan_kakuz/deck-6#/">What is Firebase Dynamic Links</a>

KYOSO株式会社 [@is_ryo](https://twitter.com/is_ryo) さんから、今回の共催に相応しく Vueと Firestoreを組み合わせて簡単な ToDoアプリの開発 (CRUD処理を実装) した話をされました。 CSSに Vuetifyを使っているのでそこまで CSSの知識が無くても楽にデザインを整えられるのでオススメですね。

<a class="link-preview" href="https://docs.google.com/presentation/d/1NT58ZIe2xQOL_RsNW-r4K2_ep1w4fIK2IRHSjmsCsEs/mobilepresent?slide=id.g5faa9da147_1_0">VueとFirestoreで簡単ToDoアプリ開発</a>

## Vueに纏わるLT

株式会社MSEN [加藤 宗一郎 (@SAW)](https://twitter.com/SAW) さんから、 UIフレームワーク [Quasar](https://quasar.dev/) (クエーサー) について。最大の特徴の一つとして、 User Agentの検出に優れてるとのこと。使う機会があれば使ってみようと思います。

<a class="link-preview" href="https://speakerdeck.com/azuki/quasar-kotohazime">Quasar ことはじめ</a>

[Daiki_Kojima (@Daikids2)](https://twitter.com/Daikids2) さんから、 VueでPWAをやろうとしたらやらかした点を中心に話されました。 start_urlの設定で上手くデプロイできない問題。また、キャッシュの良くも悪くも扱い辛い点が会ったことを挙げてくれました。 Vue CLIで言う vue.config.jsでその場に応じて設定を書けば解決するという話でした。

<a class="link-preview" href="https://speakerdeck.com/daikids2/vuedepwasurutokini-qi-wotuketeokitaitips">VueでPWAするときに 気をつけておきたいTips</a>

Lancepod_App さんから、サーバサイドとしてフロントエンドの設計を進められた知見をお話いただきました。モデルを二重に管理すること自体煩雑になってしまうため、改めてフロント・サーバ間の役割・設計の大切さを考えさせられますね。

(資料公開をお待ちください)

今回も所定の LT枠に満たなかったため [@jiyuujin](https://twitter.com/jiyuujinlab) 自ら喋らせていただきました。プロダクトの品質担保に欠かせないテストについて。しかしテストの観点がわかりづらいと言った人たちに一助になればと考えています。また、オマケで一昨日リリースされた Nuxt v2.9についても触れさせていただいてます。

<a class="link-preview" href="https://slides.com/jiyuujin/20190817">Vue CLI テストTips集</a>

[@salamander_jp](https://twitter.com/salamander_jp) さんから最近 beta利用の可能となった Github Actionsを使ってホスティング自動化する話。他の CI/CDと比較したときの違いが気になりましたが、 Gitlab-CIみたくリポジトリ一括運用によって恩恵を受けられるメリットは確かにありそうです。

<a class="link-preview" href="https://docs.google.com/presentation/d/1625hjBQG3MTf7T7QZUE9huYosDQhonMb_8Obiz4Scbc/mobilepresent?slide=id.p">GitHub ActionsでNuxtをFirebase Hostingにデプロイする</a>

## 最後に、

次回の予定ですが v-kansai #10 は 9/18 (水) に大阪で開催します。

<a class="link-preview" href="https://vuekansai.connpass.com/event/143861/">v-kansai #10</a>

また FJUG側の次回は Firebase Summit報告会として 10/29 (火) に大阪で開催するそうです。

<a class="link-preview" href="https://fjug-osaka.connpass.com/event/143545/">FJUG Osaka #6</a>

フロントエンドカンファレンス関西2019はスポンサー・登壇者絶賛募集中です！

<a class="link-preview" href="https://2019.kfug.jp/">kfug 2019</a>
