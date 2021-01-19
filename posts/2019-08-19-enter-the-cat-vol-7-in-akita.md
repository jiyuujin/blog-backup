---
date: 2019-08-19
title: CaT vol7 リポート
description: 遥々遠く離れた秋田の地に、全国各地から Vue使いが集まります。

slug: enter-the-cat-vol-7-in-akita
category: 
tags: 
 - Vue
 - Review
---

## 遥々遠く離れた秋田にて

直前に颱風が差し迫り一時開催できなくなるのではと思いましたが、無事に開催でき良かったです😊 秋田県内の参加が 30名近くと最も多かったようですが一方で県外の参加者、北は北海道から南は沖縄まで、満遍なくいらっしゃる会となりました。

<a class="link-preview" href="https://create-and-think.doorkeeper.jp/events/90155">CaT vol.7</a>

![cat_vol7_kawaii](//images.ctfassets.net/gzkue3szf85p/zpL0t8algx7Fi77nBFHqW/c9db5cc4d7644836ee0c01521399f2fd/cat_vol7_kawaii.png)

いちいち可愛いですよねー

![cat_vol7_goods](//images.ctfassets.net/gzkue3szf85p/MwRHL5l4VtxRUfqCAqUGg/752bd58258af5d8420d7961f158da861/cat_vol7_goods.png)

### 途中にヨガでリラックス！

アツイ登壇セッションが続く中、良い気分転換になりました！ Vueポーズなるものがあったんですね笑😂

![cat_vol7_pause](//images.ctfassets.net/gzkue3szf85p/PNBwsMgNIdRC4ydwiDx61/8282632e86ec57a16022e0846cc2595b/cat_vol7_pause.JPG)

コモモ先生、ありがとうございました！

こちらは necco ナツイ ヒトミさんのツイートより拝借しております🙏 mm

### 私自身も喋らせていただきました！

関西以外では先日の Nuxt Meetup以来 2度目、プロダクトの品質担保に欠かせないテストについて。しかしテストの観点がわかりづらいと言った人たちに一助になればと考えています。

<a class="link-preview" href="https://slides.com/jiyuujin/20190817">Vue CLI テストTips集</a>

## ざっと総括します

今回の参加者層として、Vue/Nuxtの未経験層が意外と多かったです。これからやってみようかなと考えている人たち向けのセッションも多く、また実務面も然りといった印象で総じて満足度は高いでしょうか。

1. Note移行話、その後
2. サーバレス関連
3. 基礎も侮れない

### 注目のセッションを中心に、

まずは何と言っても株式会社ピースオブケイク 福井 烈さんから、去年の Vue Fes Japanの続編。記事詳細ページやクリエーターTOPページの Nuxt移行が既に完了していること。これらの移行に当たって出会した課題や、またパフォーマンス面で Functional Componentを積極的に取り入れるなど、想定以上に地道だったと感じました。

<a class="link-preview" href="https://note.mu/r82/n/nbbe6af25b825">noteをNuxt.jsで再構築した話-2nd-というタイトルでお話してきました</a>

### 流行りはサーバレス

necco 森下 裕介さんから読み取った QRコードと kintoneの間でデータ連携を取るアプリについて。 Gateway + Lambdaを経由して、APIを叩くというもの。ログイン認証には Firebase Authを用いている点が特徴でした。

<a class="link-preview" href="https://speakerdeck.com/yusukemorishita/developed-point-card-system-with-vue-dot-js-plus-kintone">ポイントカードシステムを Vue.js + kintoneで 開発した話</a>

続いて Re:build 鈴木 孝之さんから、 Laravelに Realtime DBを用いたチャット機能について。 Laravelと Firebaseで二重に認証しているがバグが多く煩雑になっていること。まだまだ改善の余地はありそうと言う話でした。

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/nuxt-dot-jstofirebasederiarutaimutiyatutoapuriwokai-fa-sitahua">Nuxt.jsとFirebaseでリアルタイムチャットアプリ開発した話</a>

アイレット株式会社 インフラエンジニアの 若松 剛志さんから SSRを選択した場合インフラの知識が問われることになるが、 API Gateway + Lambdaを利用することで簡単にサーバレスを実現できるという話でした。

<a class="link-preview" href="https://speakerdeck.com/wkm2/inhurakarajian-ruvue-dot-js">インフラから見るVue.js</a>

### 基礎も侮れない

HAMWORKS 長谷川 広武さんから、Vue.jsの特徴の一つとも言えるディレクティブな表現を始め初心者向けの紹介を中心に話されました。これから始めてみようと思う方は以下動画をチェックすると良さそうです。

<a class="link-preview" href="https://www.youtube.com/playlist?list=PLh6V6_7fbbo-SZYHHBVFstU2tp0dDZMAW">Vue.js入門</a>

### その他

実務レベルでは HAMWORKS 占部 紘さんから失敗談を中心に話されましたが、フロント・サーバの役割をいま一度考えさせられます。そして Vuexを含めたコンポーネント設計が本当に大事であることを痛感させられました。

<a class="link-preview" href="https://speakerdeck.com/torounit/cat-vol-dot-7">Nuxtは簡単にSPA作れるけど、アプリケーションが簡単に作れると思ったら大間違いだった</a>

同じく実務レベルのアニメーションを披露いただいた 丹野 翔太 (たんしお) さんから深く突き詰めると奥の深いアニメーションの世界。その中でもキモは Scope付slotを上手く駆使すれば良さそうです。

(資料公開をお待ちください)

今後知見の増えるジャンルは中途案件ではないでしょうか、ということで カマダ ダイスケ (Qtaro) さんから [ぴよたそ](https://hiyokoyarou.com/) に Vueを部分導入した話について。

<a class="link-preview" href="https://www.slideshare.net/daisukekamada1/cat-vol7-vuejs-ltvuejscatvol7-164544912">ひよこでも始められるVue.js</a>

## 最後に、

東京や大阪での開催と違って非常にこぢんまりとしていたのがミソだと考えています。交流できる範囲が限られることも無く、より突っ込んで交流できる良さを実感しました。また秋田 (もしくは青森など) で開催されることがありましたら、是非伺いたく思いますので、その際はよろしくお願いします😄

今回の内容は v-kansai #9 (8/21) でも共有させていただきます。

<a class="link-preview" href="https://slides.com/jiyuujin/20190821-01">CaT vol.7 in 秋田 振り返り</a>

※ 現時点でスライド資料が公開されていない方についても、公開され次第更新する予定です。
