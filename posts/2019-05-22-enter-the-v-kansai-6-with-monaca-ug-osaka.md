---
date: 2019-05-22
title: Monaca UG 共催 イベントリポート
description: 令和最初は Monaca UGと共催、 v-kansai #6 を開催しました。
slug: enter-the-v-kansai-6-with-monaca-ug-osaka
category: 
tags: 
 - Vue
 - Review
---

## MONACA UG (#Monaca_UG) 共催

MONACA UGでのお作法に則って、参加者全員の自己紹介から始まりました。 Monaca勢、 Vue勢の参加者合わせて 40名ほど、これからもこの規模感であれば v-kansaiの中でも取り入れても良いなぁと思いました。

### TAMコワーキングにて、

Twitter界隈での盛り上がりも欠かせません。

今回合同のハッシュタグとして進められました (#Monaca_UG #v_kansai)

![monaca-ug-start](//images.ctfassets.net/gzkue3szf85p/1R7PH3fJN1xdFZMahXASBX/8d32254dca2a5403703bcebc3f20ec75/IMG_1243.JPG)

## Monaca UG

### 効率的な効果的なスマホアプリテスト方法とは?

バルテスモバイルテクノロジー株式会社の山下大輔さんの登壇、実際の経験談を通して得られた効率的で効果的なスマホアプリテスト方法について。 Monacaに深い知識を持ち、コミュニティ活動に積極的な方に送られる称号「Monacaソムリエ」、 20万人のうちのたった 5名の 1人のようですね。

開発フェーズごとに修正コストは増える。この状態 (1:10:40:100) は必ず避けなければいけません。まずは Prottを使ったプロトタイプを制作。 Single Page Application (SPA) である Monacaの場合、画面遷移の設計を先に済ませる。そしてテストケースを作る箇所のみを自動化、それ以外は地道に手動で進める。その他ネイティブアプリ固有の事象はそれぞれ分析を進め、また Cordovaプラグインと同等の粒度でテストすることに気をつけているという、テスト屋さんとしてはガチめの話でした。

<a class="link-preview" href="https://www.slideshare.net/DaisukeYamashita4/monaca-ug-osaka20190522">効率的な効果的なスマホアプリテスト方法とは?</a>


### Monacaで作ったスマホアプリのバックエンドをAWSのサーバレスな仕組みで構築する

フジテック株式会社の勝部俊介さんの登壇、勤怠やイベントコード解析など社内業務を支援するアプリをマネージドサービスの観点から解決した話。上記登壇された山下大輔さん同様、 Monacaソムリエの 1人。グローバル企業ともあってそのアプリの活躍は国内に留まらず国内の 1つの Webサーバに集中してしまう事象をマネージドサービス(サーバレス)を利用して解決。 Amplify + Cognitoを使うと、 Javascriptを自動生成してくれ容易に導入できたそうです。

<a class="link-preview" href="https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2016-amazon-api-gateway">API Gateway Blackbelt</a>

## v-kansai

### electron-vueでデスクトップアプリケーションを作った話

v-kansai自体 2度目の参戦にして初登壇に挑戦の [SAW (@azuki_eater)](https://twitter.com/azuki_eater)さんの登壇、 csv-editorでのツラミから Windowsや Linuxでも使える electron-vueを選定して制作した話。レンダリングするためのパッケージは、既に存在しているパッケージ (文字コード判別に encoding-japanese、 CSVのパースに papaparse) を利用しているそう。

実際に制作を経験して、初心者でも簡単かと思いきや詰まった箇所が多々存在。 Vueのコンポーネントシステムやリアクティブシステムを理解していなかったこと。 Electronの IPC通信によるレンダラにも詰まる箇所が存在したとのこと。

<a class="link-preview" href="https://www.slideshare.net/azuki-penguin/vuejselectronvue-147187848">electron-vueでデスクトップアプリケーションを作った話</a>

### Vue.js & Sentry でエラーハンドリング

株式会社chatbox 代表取締役、関西フロントエンドUG 代表の [@_mikakane](https://twitter.com/_mikakane) さんの登壇、Vue.js & Sentry でエラーハンドリングについて。 Sentryを導入することでクライアントサイドのエラーを管理、プロジェクトを適切に回す一助の存在となってくれます。

ちなみに素の Javascriptでは `window.addEventListener` を使うことでエラーを捕捉できます。

```bash
window.addEventListener('error', e => {
  console.log(`EventListener: ${e.error}`);
});
```

実際に Vueでは @sentry/integrationにアクセスして使えば比較的簡単に導入できます。

```js
Vue.config.errorHandler = (err, vm, info) => {
  console.log(`Vue.config.errorHandler: ${info}`, err);
};
```

※ 以下リポジトリとデモはこちら。ですが、動作してないようです。。^^;

<a class="link-preview" href="https://github.com/chatbox-inc/vue-sentry-example">vue-sentry-example</a>

### 自分のポートフォリオを AWS Amplifyに移行した話

フリュー株式会社の [@chan_kakuz](https://twitter.com/chan_kakuz)さんの登壇、一般的な静的サイトをホスティングする方法から Amplifyを利用する方法への移行について。 Amplify自体、多岐に渡る機能が存在。その中でも今回は認証機能を使うため `amplify add auth` コマンドを叩きます。実際に `<amplify-autenticator></amplify-autenticator>` を利用することで容易にスタートアップできるので、オススメという話でした。

```bash
# 認証機能
amplify add[/remove] auth
```

<a class="link-preview" href="https://slides.com/chan_kakuz/amplify#/">自分のポートフォリオを AWS Amplifyに移行した話</a>

### VSCode Remoteで始める Nuxt生活

[@salamander_jp](https://twitter.com/salamander_jp)さんの登壇、VSCodeの拡張機能について。環境に依存しないというのは大きなメリットですね。

指定の vscode-remote-try-nuxtリポジトリをクローンし VSCodeを開くと、 [Reopen in Container]をクリックすることでコンテナ内で開発できる仕組みのようです。

```bash
git clone https://github.com/GitHub30/vscode-remote-try-nuxt.git
code-insiders vscode-remote-try-nuxt/
```

<a class="link-preview" href="https://qiita.com/relu/items/defde8de8c4d21af662f">VSCode Remoteで始める Nuxt生活</a>

### Go × Vue = Vugu 事始め

[goofmint](https://twitter.com/goofmint)さんの登壇、文字通り Vueっぽく書ける [Vugu](https://www.vugu.org/)について WebAssemblyを自動生成してくれます。ただし goroutine周りの影響からネットワークが機能しない問題が存在。またルーティングも非対応、とまだまだこれからといったようですね。

<a class="link-preview" href="https://qiita.com/goofmint/items/5ca362af3cbd34eeaf59">Go × Vue = Vugu 事始め</a>

## 最後に、

### 次回の v-kansai

次回 #7 は来月 [6/22 (土)](https://vuekansai.connpass.com/event/127057) 京都で開催予定です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/127057">v-kansai #7</a>

### 次回の Monaca UG OSAKA

また Monaca UG OSAKA は 7月 大阪で開催予定です (こちらのイベントページはこれから公開されるようです)

