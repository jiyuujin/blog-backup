---
date: 2019-01-20
title: V-KANSAI #2 リポート
description: v-kansai Vue.js/Nuxt Meetup #2を開催しました。会議室を提供いただいたアイル株式会社様、この度はありがとうございます！

slug: enter-the-second-vue-js-nuxt-meetup-in-osaka
category: 
tags: 
 - Vue
 - Nuxt
 - Review
---

## 登壇8名、LT8名の大所帯の会となりました！

https://vuekansai.connpass.com/event/112900/

参加所定枠30名に対し、75名ほど。参加できなくなる者が出るほどの盛況振りとなりました。ミートアップ終わりには(実質)新年会も簡単に行われ有意義な交流会もあり😀

![new-year-party-2019](//images.ctfassets.net/gzkue3szf85p/3BwXiRloIQyOvxrXqWgo6C/8e9bce3efd72ba5bac43079d1005fe07/IMG_3248_2.JPG)

### Contentful製ブログでGoogle Adsenseが使えるようになるまで

昨年秋に公開の[Web猫ブログ](https://webneko.info/)、年末にアドセンス審査通過を受け今回の喋るネタにさせていただきました。審査通過に2週間ほどかかってしまいましたが、以下熟すことでAdsenseを使う準備が整うので参考になればと思います。

1. 主にお世話になっているパッケージ (Adsense/Analytics/Sitemap)
2. 適度に固定の文字情報を追加
3. プライバシーポリシーの設定、キャッシュ使用を明示 (vue-cookie-lawとvuex)
4. エラーページの設定
5. コメント・問い合わせの設定 (Firestore)

## その他 LTセッション

### デザイナーの私がVue.jsと Nuxt.js学んでみた

簡単なToDoリストを作成した話。きっかけはとっつきやすさとのことですが、本当にインストールやVue.jsの導入は楽ですよね！

### Vueコンポーネントについて考えてみた

1. ロジック肥大化を避けること。
2. ステート(状態)を含めるか否か。

上記のような観点は私も重要にしたいと考えています。 atomsと moleculesはできる限り OSSとして公開、と言ったことをひとつの目標にしているのは良いですね。(ただし私感ですが)あまり深く考え過ぎてもシステム要件から離れてしまっては、とも思いました。

<a class="link-preview" href="https://speakerdeck.com/uhck/vuekonhonentonituitekao-etemita">Vueコンポーネントについて考えてみた</a>

### Vue.jsからFirebaseに入門しようとしたら使い方間違ってた件

Meetupの直前まで夜通しオールで作ったとのこと、対戦ゲームも夢じゃないですね！？ ただしRead上限に引っかかったことを受け、リアルタイムにデータが同期されるといってもそこまでのリアルタイムは期待できないとのことです。

<a class="link-preview" href="https://www.slideshare.net/amanoese/vuejsfirebase-128489800">Vue.jsからFirebaseに入門しようとしたら使い方間違ってた件</a>

## Nuxt.jsでSSR対応をする

[Laravel JP Conference](https://conference2019.laravel.jp/)のWebサイトでSSR対応した話、今ホットな話題でした！

スポンサー事情を考慮、やはりSEO周りは重要です。(この辺りはブログ同様) そこで今回サイトの全てをSSR対応せず、スポンサー周りのみSSR対応したという話でした。

1. generate内で予めリンク配列を設定しておく。
2. ライフサイクル上、asyncData/fetchを駆使する

<a class="link-preview" href="https://speakerdeck.com/sshono1210/nuxt-dot-js-de-ssr-dui-ying-suru">Nuxt.jsでSSR対応をする</a>

## Nuxt.jsのinjectでインジェクトしてみる話

Vuex周りのロジック改善について、興味深い話でした。ある程度のアプリであれば、InjectionでDIすることもひとつの手段として検討することも可能。LazyLoadできるようになると、大規模アプリにも対応できて良いかもしれません。

<a class="link-preview" href="https://speakerdeck.com/kenfdev/nuxt-dot-jsfalseinjectdeinziekutositemiruhua">Nuxt.jsのinjectでインジェクトしてみる話</a>

## Vue.js経験日数2日で、あるサービスを作ってみた

Firebase(Auth/DB)を採用、スマートスピーカーと連携した話。[みんなのゼロカロリー](https://zerocalorieskill.firebaseapp.com/?#/).. この場でゼロカロリーと言ったこの種の笑いが生まれるとは😇

<a class="link-preview" href="https://speakerdeck.com/hirophilip/vue-dot-jsjing-yan-ri-shu-2ri-de-arusabisuwozuo-tutemita">Vue.js経験日数2日で、あるサービスを作ってみた</a>

## Nuxt.js x Firebaseで非同期に開発する

今回Firebaseに関わる話が多かったことがひとつの印象でした。認証を含めデータベースやホスティングを使うための敷居は低いことを実感しますね。

<a class="link-preview" href="https://speakerdeck.com/mikakane/nuxt-dot-js-x-firebase-defei-tong-qi-nikai-fa-suru">Nuxt.js x Firebaseで非同期に開発する</a>

## LTセッション

### Vue.jsでesa風markdownエディタを作成してみた

「esa.ioを無料で使いたい」という意気込みの下、ここでもFirebaseの認証を使った。サードパーティ製ライブラリとの連携で、デバッグ時に苦労した話がありました。

### Webデザイナから見た Nuxt.jsを使う理由

セッションの途中でアンケートが存在、今回デザイナーの比率は、およそ5%ほど。開発時の一体感からコミュニケーションコストが下がったことをメリットのひとつに挙げられていました。

<a class="link-preview" href="https://docs.google.com/presentation/d/e/2PACX-1vRpEgiVZe9ecoKBaCWBMjvWeAtb2hg2FidRcAS-z4V23sjI_AtWuxGPHuMWHOSZNxWwONe6ABW4KYLY/pub">Webデザイナから見た Nuxt.jsを使う理由</a>

### mermaid.jsを使ってみた

[https://mermailjs.github.io/](https://mermaidjs.github.io/)は初耳でした。フロー図を描きたい場面で力を発揮するようです。Excelを使わなくなった。

### Vue.js × LINE Payでリアルガチャを作ってみた

「シンプルに儲けたい」という欲望を実現した話。Webアプリ [LIFF](https://engineering.linecorp.com/ja/blog/liff-our-latest-product-for-third-party-developers/) より、AWS Lambdaでイベントをハックすると言うものでした。

<a class="link-preview" href="https://speakerdeck.com/torisankanasan/vue-dot-js-x-line-payderiarugatiyawozuo-tutemita-8e3644c6-7c16-404e-879d-59643a6bfb1d">Vue.js × LINE Payでリアルガチャを作ってみた</a>

### ライフサイクルを完全に理解する

Vue2.5以降と新たに登場したライフサイクル (errorCaptured) を含め、私も未だ使ったことのないライフサイクルが存在。

<a class="link-preview" href="https://speakerdeck.com/takumiz19/vuefalseraihusaikuruwowan-quan-nili-jie">ライフサイクルを完全に理解する</a>

### お花咲かせたかっただけなのに

スクロールで変化する花を咲かせるアニメーションが作った話。(PCで見ても確かに良き感じですがスマホ向けだと更にでしょうか。

<a class="link-preview" href="https://vue-hanasaki.netlify.com/">https://vue-hanasaki.netlify.com/</a>

DOMの調整はnextTickを使って、スタイルの調整を行なっていた話でした。

<a class="link-preview" href="https://speakerdeck.com/cotolier_risa/ohua-xiao-kasetakatutadakenafalseni-vue-dot-jsdesukurorutoanimesiyonfalseshi-zhuang">お花咲かせたかっただけなのに</a>

### Vue.jsの布教活動をしている話

私は社内でハンズオンを含めた布教活動を全く行っていませんでしたのでその姿勢に脱帽しました。前回同様、Vue.jsでスライドを使う同志として交流をもっと深められたらと個人的に思います。

### NuxtをRancherで動かす

Nuxtで必要とされるDockerfileの記述は、基本的に `npm run start` のみ叩けば良くそこまで難しくありません。 GUIで気軽に確認できること、それぞれの環境に応じた形に落とし込めることは魅力です。

