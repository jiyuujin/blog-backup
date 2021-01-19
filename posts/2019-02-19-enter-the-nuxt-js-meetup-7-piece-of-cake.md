---
date: 2019-02-19
title: NUXT MEETUP 7 リポート
description: 一昨日行われたLaravel JP Conference参戦の序でに、特別に東京滞在を延長！Nuxt Meetup #7に参戦しました。会議室を提供いただいた株式会社ピースオブケイク様、この度はありがとうございました。
slug: enter-the-nuxt-js-meetup-7-piece-of-cake
category: 
tags: 
 - Nuxt
---

## 総括！！

初めまして、2/1 京都のゲーム会社ポノス・にゃんこスタジオより転戦したWeb猫こと、[@jiyuujin](https://twitter.com/jiyuujinlab)です。今回のミートアップは、株式会社ピースオブケイクさんで開催されました。移転したばかりの素敵なオフィス、素晴らしい環境でございました。改めて場所提供のほどありがとうございます。

![piece-of-cake-1](//images.ctfassets.net/gzkue3szf85p/4cRUvWC0FgbMuGzwMSI5my/a8f38db4842e3db0eaa47096f88f1732/IMG_0204.JPG)

スポンサーLTでは、CTO [@konpyu](https://twitter.com/konpyu)さんによる登壇。メディアプラットフォームNoteのAngularからNuxtへのリプレースについて取り上げられました。去年のVue Fes Japan 2018でも、福井烈さんの発表「note のフロントエンドを Nuxt.js で再構築した話本番運用は既に始まっている。」があったように非常に大きな話題となっています。

<a class="link-preview" href="https://vuefes.jp/speakers/fukuiretu/">note のフロントエンドを Nuxt.js で再構築した話本番運用は既に始まっている。</a>

## 掻い摘んでご紹介

### レガシーブラウザと向き合うNuxt.js

面白法人カヤックのフロントエンドエンジニア、[@kengotoiro](http://twitter.com/kengotoiro)さんの登壇、[Lobi Web版](https://web.lobi.co/)のAngularからNuxtへリプレースをした話でした。開発中辛かったこととして、Nuxtが1系→2系の移行期にありドキュメント少なくハマったとのこと。機能拡張する場合レガシーブラウザで動くように変換するため、Polyfill.ioを使うと、nuxt.config.jsのheadに記載してあげるだけで簡単に対応できるといったTipの紹介もありました。

<a class="link-preview" href="https://slides.com/kengooowaki/nuxt-js/#/">レガシーブラウザと向き合うNuxt.js</a>

### Nuxtを中心とした開発エコシステムと、個人開発のススメ

受託開発をメインに行っているフロントエンドエンジニア、七洋株式会社の金井淳さんの登壇。キッチン周りの解決を行うサービス[small dish](https://smalldish.jp) (Beta Version)の開発で、Nuxtを採用。ContentfulでModel、Fieldsを永続化データで実装。Vuexストアで献立やアイディア、いいねなど管理して、スピーディに開発している話でした。

### Catch up Nuxt.js 2018.02

最近異常に活発なNuxt.jsの活動方針について、[@andoshin11](https://twitter.com/andoshin11)さんの発表でした。nuxt-edgeを使うと、毎日ビルドされアップデートされるので、日々使ってみるのも楽しくなりますね。その他主に気になった点として、以下挙げられると思います。

1. Universal Fetch対応、ビルトインにnode-fetch、fetch polyfill
2. nuxt.config.jsにPromiseが入った。
3. .nuxtignoreファイルがサポートされた。
4. Unitテストで気軽に動作確認できるようになった。
5. NuxtでTSサポート本格化。nuxt-tsが使えるようになった。

私自身TSサポートしか知らずでしたが、色々新しい発見があり非常に興味深い話でした。

<a class="link-preview" href="https://speakerdeck.com/andoshin11/catch-up-nuxt-dot-js-2019-dot-02">Catch up Nuxt.js 2018.02</a>

### Re:ゼロから始めるNuxt生活

株式会社nana musicでサーバサイド中心に開発を行っている角谷さんの発表でした。音楽アプリのリプレースについての話、SEOに貧弱であったことや、Python2という今では考えられない古いバージョンを解決するため、今回Django + Nuxtを採用。Vuexは便利な反面、メンテされていないtypescript-templateを使わないと言った話でした。

<a class="link-preview" href="https://speakerdeck.com/xkxaxkx/re-zerokarashi-merunuxtsheng-huo">Re:ゼロから始めるNuxt生活</a>

### NuxtとTailwind.css

急遽一人LTのキャンセルが出て、10分で作ってくれました。弊社石岡の発表、Fabric Tokyoのリプレースした話でした。UIフレームワークにこだわった時の変更や、クラス名を考える時の辛さを払拭するため、Tailwind.cssを採用。私も機会あればこの「天才的な」CSSフレームワークを使ってみようと思います。

<a class="link-preview" href="https://slides.com/masaakikunsan/deck#/">NuxtとTailwind.css</a>
