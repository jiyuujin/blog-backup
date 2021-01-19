---
date: 2019-02-28
title: V-KANSAI #3 を開催しました！
description: 久しく地元京都に凱旋！去年の年末に立ち上げたv-kansaiも、今回で早3回目となりました。会場提供いただいたKYOSOさま、ドリンクスポンサー Nota inc.さま、ご協力いただきありがとうございます。

slug: enter-the-third-v-kansai-vue-js-nuxt-meetup-in-kyoto
category: 
tags: 
 - Vue
 - Review
---

## 総括！

色々あった2019年2月も最終日の28日。この日地元京都で Vue界隈もミートアップを開催できたことは、非常に喜ばしく思います。来月以降、毎月関西で開催していきますので、何卒よろしくお願いいたします！

### 勉強会支援プログラムを利用しました

Nota inc.さまの提供されている Scrapbox勉強会支援プログラムを初めて利用しました。サービスが始まって以来、初めて v-kansai #3 が第１号となったようですね。Vue Beerならぬ、かわゆいキャラの描かれたビールが特徴的です。

![scrapbox-beer](//images.ctfassets.net/gzkue3szf85p/6QbqhdLldjqWzfzBGdOHzf/168bf90833c8408091fce323df7d4d66/scrapbox-beer.png)

良ければご利用を検討くださいませ。

<a class="link-preview" href="https://scrapbox.io/study-group-support/">Scrapbox勉強会支援プログラム</a>

### 座談会形式を取り入れました

前半は登壇/LTをメインとし、後半を座談会形式としました。どうだったでしょうか？ 今回限りアンケートを取っていないので、詳しくはわかりません。ですが SSR(サーバサイドレンダリング)時でつまづいたことやオススメのパッケージなど、少々盛り上がる話題もあり、全体としては安堵したところでした。

一部日常的に抱いていた課題を解決できたこともあり、為になったとも捉えています。今後もv-kansaiは様々な形式を模索して参りますので、ご意見ご批判は忌憚無くお寄せください。mm

## 掻い摘んでご紹介

### できる VueNative

Firebase-Osakaオーガナイザー [@TanakaMidnight](https://twitter.com/TanakaMidnight)さんの登壇、なにかと話題のVue Nativeの話。ビルドすると上手く動かない、という事象は流石に2月にもなって解消されているようです。ただし、React Nativeを理解していないと、Vue Nativeを作れないこの現状はどうかと思うことしばしば。

### コンポーネントライブラリVuterialを作った話

フリーランスプログラマ 八木大介さんの登壇、MaterialDesignの勉強のためコンポーネントライブラリを作った話で、[Vuterial](https://www.npmjs.com/package/vuterial)を公開しました。登壇ではvue-cliを使う想定で始めたところから、実際に公開するnpm publishまでの工程を詳しく話してくれました。v3になってからvue-cliではプラグインを簡単に作れるようになっているので、参考になると良いかと思います。

### UMDをVue-CLI3で読み込む

LINE株式会社 [@tech_many](https:twitter.com/tech_many)さんの登壇、UMDのライブラリでパッケージを作った話。ビルドするとUndefinedエラーが発生する場面に直面。その原因はGithub issueを見たところ、vue-cliのBabel設定にありました。最近の動向から目が離せないことを物語るワンシーンとなっていました。

<a class="link-preview" href="https://speakerdeck.com/tech_many/umdwovue-cli3dedu-miip-mu">UMDをVue-CLI3で読み込む</a>

### Vuexのアプリケーションをスナップショットテストする

NodeFestオーガナイザー [@shisama_](https://twitter.com/shisama_)さんの登壇、フロントエンドでテストしてますか、で始まりました。Action/Mutationで各Stateに何が入っているか、異常系となっていないかどうか、確認する必要があります。[vuex-snapshot](https://www.npmjs.com/package/vuex-snapshot)を作った話がメインで、差分を見てリグレッションテストを試してPRをくださいということでした。

<a class="link-preview" href="https://speakerdeck.com/masashi/snapshot-testing-for-vuex-application">Vuexのアプリケーションをスナップショットテストする</a>

## 最後に、

次回来月 3/20に #4が開催予定です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/121581/">v-kansai #4</a>
