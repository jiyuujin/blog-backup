---
date: 2019-03-21
title: V-KANSAI #4 リポート
description: 早くも 第4弾の開催となりました。会場提供いただいたヤフーさま、ご協力いただきありがとうございました。

slug: enter-the-fourth-v-kansai-vue-js-nuxt-meetup-in-osaka
category: 
tags: 
 - Vue
 - Nuxt
 - AWS
 - Review
---

## 登壇計 10名！！

<a class="link-preview" href="https://vuekansai.connpass.com/event/121581/">v-kansai #4</a>

京都と異なり大所帯のケースが多い大阪。今回 第4弾も参加所定枠30名に対し、70名以上。参加できなくなる者が出るほどの盛況振りとなりました。今回も二桁の登壇が集まり、様々なことを吸収できた機会となっています。このような形式で毎月、大阪・京都交互に継続していきますので、改めて今後もよろしくお願いいたします。

## Web猫ブログに型安全を

今回も [@jiyuujin](https://twitter.com/jiyuujinlab) 自ら登壇。一昨日 3/18 にブログを更新させていただきました (下記のリンク参照) 当ブログに `nuxt-ts` を導入、その話を簡単に喋らせていただきました。LTの中でも触れましたが、予定より大幅に早まって既に `nuxt-ts build` の形式で本番稼働を始めています。 Vuexストアの周辺を触った際に少々、手こずったことがありました。ですが、 Vue.js や Nuxt における TypeScript へのサポートは今後ますます拡大すると考えられます。是非今後、この辺りの課題も解決されることを期待しましょう。

<a class="link-preview" href="https://webneko.info/posts/typesafed-webneko-blog-used-nuxt-ts">Web猫ブログをTypeScript化しました</a>

<a class="link-preview" href="https://webneko.info/posts/switched-tslint-to-typescript-eslint-plugin">tslintから @typescript-eslint/eslint-pluginに変更する</a>

## 登壇の数々を軽く

### NuxtとNetlifyが優しい件について

株式会社chatboxの [@riri_mohu さん](https://twitter.com/riri_mohu) の登壇、NuxtとNetlifyが優しい件についての話。文字通り Nuxtの環境を構築することは非常に簡単で、 `npx` コマンドで簡単に作ることができる。

```bash
npx create-nuxt-app <アプリケーション名>
```

またファイル構成が明確で分かり易い。Webアプリケーションの開発に便利なツールが揃っている (Storeや、 Vue Routerなど) Netlifyも１コマンド `nuxt` を叩くだけでデプロイできるという話でした。

### Nuxt.jsのディレクトリ

株式会社chatbox テックリードの [ショウノシオリさん](https://twitter.com/shosho_egg) の登壇、ディレクトリ構成のわかりやすいNuxt。リソースや画面を作るComponent、設定ファイルに分類。作り始めると状態を管理するためのストアや外部パッケージを一括で管理するプラグインを使うと良い話でした。

<a class="link-preview" href="https://speakerdeck.com/sshono1210/nuxt-dot-js-falsedeirekutori">Nuxt.jsのディレクトリ</a>

### 揮発性の高いコンポーネントを開発した話

[@_uhck さん](https://twitter.com/_uhck) の登壇、Notice系のコンポーネントを作った話。そもそも揮発性の高いというのは、一時的に使用されることを意味するようです。グローバルで呼び出し、必要に応じて使用・削除できるものを目指す。stateやローカルのデータを圧迫しないことを目的に、メンテの向上を図るというもの。以下デモンストレーションも示されており、 DOMの中にComponentが突っ込まれる仕様でした。

<a class="link-preview" href="https://github.com/in-the-box/vue-dialog">vue-dialog</a>

<a class="link-preview" href="https://speakerdeck.com/uhck/hui-fa-xing-falsegao-ikonponentowozuo-ruhua">揮発性の高いコンポーネントを開発した話</a>

### Capacitorの話

Ionic Japan UG Organizer、(一社) リレーションデザイン研究所 代表の [榊原昌彦さん](https://twitter.com/rdlabo) の登壇、Capacitorの話 (以下リンクを参照) 見栄えをネイティブアプリ同様、そっくりに作ることができる。 2回目以降のビルドでは差分のみビルドされ、本体のバージョンにも常に追随するといった便利な機能も存在。 pluginの充実度で Cordovaと比較すると、まだまだな部分が多い。また Cordovaが Web寄りの知見が問われるのに対して、ある程度ネイティブアプリの技術を理解していないと厳しいかもしれないということでした。

<a class="link-preview" href="https://capacitor.ionicframework.com/">Capacitor</a>

### VueとAWSAppSyncで始めるチャットアプリ開発

[@is_ryo さん](https://twitter.com/is_ryo) の登壇、GraphQLでチャットアプリを作った話。Vue + AWS AppSync + Amplifyを組み合わせている (実際の成果物とリポジトリは下記参照のURL) エンドポイントは唯一で不必要なものを一切取得する必要がないというメリットが存在、Subscribeが素敵な働きを示してくれるということでした。

<a class="link-preview" href="https://chat.isryo.work/auth">チャットアプリ</a>

<a class="link-preview" href="https://www.slideshare.net/RyosukeIzumi1/vueawsappsync-137300026">VueとAWSAppSyncで始めるチャットアプリ開発</a>

### NuxtをLightsailとGAEにデプロイした話

若井豊さんの登壇、NuxtのデプロイをLightsailからGAEに変更した話。Koa +TypeScriptをAPIに、SSRして使っているNuxtアプリ。サーバの初期設定が煩わしくアプリケーションの開発に時間を取ることができなくなって移行を決断。いざ移行すると自動デプロイなど駆使した結果、楽になったということでした。

<a class="link-preview" href="https://slides.com/yutakawakai/deck#/">NuxtをLightsailとGAEにデプロイした話</a>

### LambdaでSSRしてみた

フリーランスプログラマ 八木大介さんの登壇、AWS LambdaでSSRしてみた話。 `vue-server-renderer` を使えば Nuxt を使わなくても SSRができる。 Vue.jsサーバーサイドレンダリング (以下リンクを参照) を確認すればすぐにできそう。カスタムディレクティブがそのままフロントに返されるとエラーになったりと苦労も多かったということでした。

<a class="link-preview" href="https://ssr.vuejs.org/ja/">Vue SSR</a>

### Vue.jsで考えるMVVM

[@44x1carbon さん](https://twitter.com/44x1carbon) の登壇、綺麗なソースコードを書くために必要なことって何だろうと考えアーキテクチャにアプローチした話。まず綺麗なソースコードを書くために、データ設計を今一度見直してみよう。扱うデータをクラス化し、そのクラスに手続き（ロジック）を追加することが重要。ここで挙げられた消費税込価格を算出するという一例は非常に分かりやすかったですね。画面の Viewで、計算ロジックしていませんか。計算を別管理し描画に集中することでフロントエンドでのテストもし易くなるという話でした。

<a class="link-preview" href="https://speakerdeck.com/44x1carbon/vue-dot-jsdekao-erumvvm">Vue.jsで考えるMVVM</a>

### @ionic/vueでWebアプリを作ってみる

同じく [v-kansai](https://vuekansai.connpass.com/) オーガナイザーの一人である [@mikakane さん](https://twitter.com/_mikakane) の登壇、 Vue.js と Ionic でWebアプリを作った話。先日の Ionic meetupではイマイチなリアクション.. 汗 だったということで、時を改めてだったようです。とりあえず試すなら、 @modus/ionic-vue (下記リンクを参照) を試すと良いということでした。

<a class="link-preview" href="https://speakerdeck.com/mikakane/vue-de-web-apuriwozuo-tutemiru">@ionic/vueでWebアプリを作ってみる</a>

<a class="link-preview" href="https://github.com/ModusCreateOrg/ionic-vue">@ionic/vue</a>

## 最後に、

次回来月 4/25に #5が開催予定です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/122664/">v-kansai #5</a>
