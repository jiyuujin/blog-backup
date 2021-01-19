---
date: 2019-04-25
title: 平成最後の V-KANSAI を開催しました
description: 平成最後の v-kansaiとなりました！ 今回のスポンサー LINE Kyotoさま、ご協力ありがとうございます。
slug: enter-the-final-v-kansai-of-the-heisei-period
category: 
tags: 
 - Vue
 - Review
---

## 平成最後の v-kansai

前日 4/24には東京でも開催された Vue.js Meetup、良きタイミングでカブること無くセッティングできたこと、運営のメンバーには改めて感謝を申し上げます。

※ 4回連続登壇させていただいている私は、自分以外の皆さまにプレゼンテーションをしていただく機会をもっと増やすべく今回は自身の登壇をお見送りさせていただきました.. m(_ _)m

## Put Your Hands Up

登壇者に質問しようと言ったことを目的にしたサービス 「Put Your Hands Up」を利用させていただきました。

<a class="link-preview" href="https://pyhu.nkgr.app/">https://pyhu.nkgr.app/</a>

[Nokogiri](https://twitter.com/nkgrnkgr) さんによるご紹介、今回は個別に v-kansai #5 用のページまで用意していただきました！ ただ気づいたことなどコメントを投下するだけに留まっており、結果としてどのようにこのサービスを使って良いか、という模範になれなかったことは今回の課題点の一つかもしれません。

https://pyhu.nkgr.app/events/badb6c63-1194-4993-99f7-10f3d932ccae/http://

![IMG 0889 (1)](//images.ctfassets.net/gzkue3szf85p/1QWMz33DHb4pSM2iREh7zo/ba32d4434c153cdd4b5cfe71b84a690a/IMG_0889__1_.JPG)

とはいえ、上記リンクよりご覧になれますので、是非チェックのほどお願いします。

## スポンサーである LINEさまのLT

LINE株式会社 [@tech_many](https://twitter.com/tech_many) さんの登壇、 CSS設計手法でコンポーネント設計した話。

きっかけは Atomic Designで満足できず、今回 [FLOCSS](https://github.com/hiloki/flocss) でコンポーネントを切ってみたとのこと。 vue-cli-3のディレクトリに追加して対応したことでとりあえずは解決、ただしサンプル数がまだまだ少ないと言ったことが課題の一つのようです。

<a class="link-preview" href="https://speakerdeck.com/tech_many/cssshe-ji-shou-fa-dekonponentoshe-ji-sitahua">https://speakerdeck.com/tech_many/cssshe-ji-shou-fa-dekonponentoshe-ji-sitahua</a>

<a class="link-preview" href="https://github.com/hiloki/flocss">FLOCSS</a>

## TypeScriptでテストを始めた

[ユカイ](https://twitter.com/syukai) さんの登壇、 TypeScript導入から Jestでテストを書いた話。まず TypeScript導入について tslintを採用したようです。個人的に今となっては @typescript-eslintを採用した方が良いのではと思いました。まぁそれだけ Web界隈の進むスピードが早いことを実感させられますね。

<a class="link-preview" href="https://speakerdeck.com/syukai/typescripttotesutowohazimeta">TypeScriptでテストを始めた</a>

続いてテスト。中身は Rubyのようですが、「[初めての自動テスト](https://www.amazon.co.jp/%E5%88%9D%E3%82%81%E3%81%A6%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88-%E2%80%95Web%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88%E5%9F%BA%E7%A4%8E-Jonathan-Rasmusson/dp/4873118166)」 がテストを書く上で凄く参考になったようです。

<a class="link-preview" href="https://www.amazon.co.jp/%E5%88%9D%E3%82%81%E3%81%A6%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88-%E2%80%95Web%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88%E5%9F%BA%E7%A4%8E-Jonathan-Rasmusson/dp/4873118166">TypeScriptでテストを始めた</a>

下記のことに気をつけながら、何のテストを書いているかを明確にしたようです。

1. テストケース `it` 一つに対し、テストケースを一つにすること
2. APIの呼び出しを独立にすること
3. コンポーネントを出来るだけ小さくすること

## Nuxt.jsと Expressで Webサービスを作ってみた

[だら](https://twitter.com/dala00) さんの登壇、「[100の質問メーカー](https://questions.appllis.net/)」 を Nuxt.js + Expressで作っている話。

<a class="link-preview" href="https://questions.appllis.net/">Nuxt.jsと Expressで Webサービスを作ってみた</a>

新規 Nuxtプロジェクトのスタートアップで `create-nuxt-app` ではサーバの選択肢が与えられ、凄く使い勝手が良かった。また今後データの集計機能も盛り込む予定があったので、 NoSQLと違ってしっかりと設計できる MySQLを採用。フロント、サーバ共に Node.jsを使う選択肢を取ることとなった。

ただし良くも悪くもフロント・サーバ共に Node.js、組み合わせるパッケージによって動かない事象が度々発生。デプロイ先である GAEでも一番貧弱なサーバを選択したこともこの原因のひとつと考えられるとのこと。結果としてサーバは専用のフレームワークを採用した方が無難だったかもしれないという話でした。

<a class="link-preview" href="https://speakerdeck.com/dala00/nuxt-dot-jstoexpressdewebsabisuwozuo-tutemita">Nuxt.jsと Expressで Webサービスを作ってみた</a>

## amp-script + Vue.js

関西 Node学園オーガナイザ [@shisama](https://twitter.com/shisama) さんの登壇、先週の AMP Conf 2019でも話題になった amp-scriptの話。

`AMP-Access-Control-Allow-Source-Origin` などを追加した上で公式の [サンプル](https://github.com/ampproject/amphtml) を使うことができます。一部申請のあったオリジンに対しては、既に AMPが使える状態となっているようです。とはいえ Japvascriptが使えないってどーなのよ、ファイルサイズに制限があったり、みたいな話もあるようで、まだまだこれからと言った様子のようですね。

<a class="link-preview" href="https://amp.dev/ja/events/amp-conf-2019">AMP Conf 2019</a>

<a class="link-preview" href="https://speakerdeck.com/masashi/number-v-kansai-5">amp-script + Vue.js</a>

## その他 LTセッション

### Vue.jsの Reactiveの中をのぞいてみた件

atma株式会社の [morifuji](https://twitter.com/maroon88) さんの登壇、Vue.jsでしばしば objectにプロパティを追加したのに反映されていないと言ったことにハマるのは Reactiveに振り回されているから起因している話。実際に Vue.jsの作者である Evan氏の [リポジトリ](https://github.com/vuejs/vue/tree/dev/examples/todomvc) でステップ実行してみた経験から話されました。

<a class="link-preview" href="https://github.com/vuejs/vue/tree/dev/examples/todomvc">ToDo MVC</a>

<a class="link-preview" href="https://speakerdeck.com/diggymo/vue-dot-jsfalsereactivefalsezhong-wofalsezoitemitajian-35149316-f2b0-4ee3-91f3-fff6d272f129">Vue.jsの Reactiveの中をのぞいてみた件</a>

### iOSで Vueを書き JAMStackな LT資料を作った話

[んじゃみ](https://twitter.co179jp) さんの登壇、目立ちたい一心から iPadでプレゼンテーションスライドを作った話。しかも縦型で魅せる形式でした。

このスタイルを実現するに当たって外付キーボードに問題、一部キーで入力できないことがあるようです。また　iOS12.2以降、 PWA周りが更新されておりこの対応を進めたことで、結果としてネイティブアプリと同じ挙動になったという話でした。

### 初心者の Vue.js奮闘記録

インフォニック株式会社の山下大輔さんの登壇、 Vue.jsを使ってプロフィールページを作った話。

レスポンシブ化まではされていないようですが、 [Webサイト](https://portfolio-of-daisuke.firebaseapp.com/#/) の出来は素晴らしいですね。

<a class="link-preview" href="https://portfolio-of-daisuke.firebaseapp.com/#/">プロフィールページ</a>

困ったことは webpack周りの設定ファイルが隠蔽されていたので少し分かりづらかったこと。 eslintによる制限が厳しかったので全て無視してしまったこと、初めてビルドすると意外とその対応が辛かったりしますね。また今後テストコードをちゃんと書いていきたい、vuexも活用していきたいと言った話でした。

<a class="link-preview" href="https://speakerdeck.com/libra189/vuebeginner">初心者の Vue.js奮闘記録</a>

## 最後に、

次回来月 5/22に #6が開催予定です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/122664/">v-kansai #6</a>


