---
date: 2019-02-03
title: Vue.js/Nuxt採用事例についての勉強会 リポート
description: (たまたま)翌日のLaravel/Vue.js Meetup #7(1/31)と同じ時期だったため、急遽【Nuxt.js/Vue.js】スタートアップ企業導入事例(1/30)にも参戦させていただきました。
slug: enter-the-startup-case-study-of-vue-js-and-nuxt
category: 
tags: 
 - Vue
 - Nuxt
 - Laravel
---

## Re:build主催の勉強会

今回は Vue.js/Nuxtの採用事例に特化した勉強会。懇親会までは参戦せず。当日朝一大阪より飛んで、非常にお疲れでした。またの機会にもっとお話できればと考えています。

## Nuxt.jsでモダンWeb設計

株式会社Re:buildの鈴木孝之さんの登壇、 Nuxt + Laravel + Firebase (Chat) = SPA という技術スタックで開発している話。以下の通りメリットを享受、一方でデメリットは現時点で存在していないのでは、とのこと。

1. ルーティング周り
2. ミドルウェアを使ったレンダリング処理の柔軟さ
3. 自由に使えるプラグイン

強いて言えばビルド時にブラックボックス化 (よく分からないエラーでコケる) ビルド時間が長いことを挙げられましたが、私も分かりみ深いなぁ、と言った感じでした。

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/nuxt-dot-jstemotannawebahurishe-ji">Nuxt.jsでモダンWeb設計</a>

## TABETEのフロントエンドをNuxt.jsでリプレイスする話

株式会社コークッキングの榊原徹哉さんの登壇、 Rubyの改修や Vueでリプレイスの選択肢が存在する中で、綺麗な APIやサービスに必要な API全て揃っている観点から後者(リプレイス)を選択。 Vueの良さは入りやすさ、コミュニティでの親切さは凄く感じている話でした。


## Nuxt.jsでプロダクトを開発して得た知見

株式会社ITプロパートナーズの米川桂さんの登壇、規約やミドルウェアなど鈴木孝之さんの登壇とほぼ被った内容でした。技術以外でブランディング向上を実現。 PC/SP対応やキャッシュ、といった自身の経験外だった分野の話もされ参考にさせていただきました。

1. mixinsで動的に Componentを分けた
   - 工夫した点は nuxtendを採用して、 asyncDataで PC/SPを分けた。
2. Client/Serverでキャッシュの扱いを変更した
   - Clientで universal-cookie、 Serverで cookie-universal-nuxtを採用した。

## Vueと共に走ったフロントエンドリプレイス１年間

株式会社スタディストの小宮山智也さんの登壇、データ駆動周りやテスト(Karma)などロジックを中心に詳しく書かれているスライドでした。ですが明らかに登壇時間が足りていないことも痛感させられましたね。

1. Atomic Designを流用した
   - routerLayoutsは画面レイアウトを共通化したようですが、 templatesの代わりのように見えました。
2. ルーティングの肥大化に対応した
   - router-viewを使うことを前提とする vue-routerだからこそ、起こり得る問題だった。

上記の問題を経験して初めて、 Nuxtを採用しておけばもう少しマシになったかもしれないという話でした。

<a class="link-preview" href="https://speakerdeck.com/komiyamast/vuetogong-nizou-tutahurontoentorihureisu1nian-jian">Vueと共に走ったフロントエンドリプレイス１年間</a>
