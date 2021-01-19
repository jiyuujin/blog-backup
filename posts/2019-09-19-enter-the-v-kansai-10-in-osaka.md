---
date: 2019-09-19
title: V-KANSAI X リポート
description: いつの間にか 2桁台を突破して第10弾、株式会社タンバリンさまの会場で開催されました。
slug: enter-the-v-kansai-10-in-osaka
category: 
tags: 
 - Vue
 - Review
 - Atomic-Design
---

## 15人規模でこぢんまりと..😌

気付けば 2桁台のミートアップ開催を突破、今回は株式会社タンバリンさまの素敵な会場にて開催されました。基本的にツイートする暇も無いくらい、盛り上がったような気がしました！

(単純に Twitterを使っている方が少かった可能性が高いだけかもしれません)

### 株式会社タンバリンさまの素敵な会場

![tambarine-in-v-kansai-10](//images.ctfassets.net/gzkue3szf85p/5fhPsw4Cup6jHVgUIlMoki/e3bde47486f27717b80a7ef37c38e6d6/IMG_2986.jpeg)

## 各登壇について、

今回も初めて登壇に挑まれる方が 2人もいらっしゃったことは大歓迎。その一方で、登壇者のメンツに変わり映えしない課題も感じており、今後の運営についてふと考えさせられますね。。汗

### vuelidateについて

めでたく初登壇の tame さんから、軽量をうたう [vuelidate](https://vuelidate.netlify.com/) について。そもそも Vueでバリデーションを書こうとすると [vee-validate](https://logaretm.github.io/vee-validate/) 以外他思い浮かばなかったので、ここでは新たな発見となりました。とりあえず `$invalid` を設定すると最低限の体を成すという話でしたが、もう少し詳しく確認してみようかと思います。

<a class="link-preview" href="https://vuelidate.netlify.com/">vuelidate</a>

### Vuexを使ってJWTを実装する

こちらもめでたく初登壇の 株式会社@IoT Motoyasu Meguroさんから、 JWTについて基礎から丁寧に話されたのは印象的でした。また Vuexを使う理由としては、複数のページで一元管理したいから。コンポーネントにバックエンドとのやりとりを書きたくないといった知見は私も共感できる箇所ですね。

<a class="link-preview" href="https://slides.com/mm-slide/vue-vuex-tips-and-jwt#/">Vuexを使っていい感じにjwt認証を実装してみた</a>

### ランタイムビルドと完全ビルドでハマった話

[完全ビルドに比べてファイルサイズが軽量で済む](https://jp.vuejs.org/v2/guide/installation.html#%E3%83%A9%E3%83%B3%E3%82%BF%E3%82%A4%E3%83%A0-%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%A9%E3%81%A8%E3%83%A9%E3%83%B3%E3%82%BF%E3%82%A4%E3%83%A0%E9%99%90%E5%AE%9A%E3%81%AE%E9%81%95%E3%81%84) は Vue公式にも記載があります。株式会社タンバリン Kusamao Abeさんからは、テンプレートの書き方等によってハマった話を通して、ビルド周りの注意点を中心に話されました。

<a class="link-preview" href="https://speakerdeck.com/kusamao/vue-builds">Vue.jsのビルドの種類</a>

### Nuxtでgenerate可能なSPA開発

株式会社chatbox 代表取締役、関西フロントエンドUG 代表の [@_mikakane](https://twitter.com/_mikakane) さんから、 spaモードにこだわらず SPA開発を進める選択肢が存在することについて。環境に応じて吐き出されるビルドファイルを確認する等の手間が増えるので、注意して欲しいと言う話でした。

（資料公開をお待ちください）

### Atomic Designで業務改善をした話

フリュー株式会社 [@chan_kakuz](https://twitter.com/chan_kakuz) さんから、まず Atomic Designを採用した理由。想定と違うものが出来上がってしまうこと、デザイナーですら全てを把握できてない現状があったから。結果的にチーム次第のようですが、レイヤーごとに責務の分離が図れたのは良かったそうです。

<a class="link-preview" href="https://slides.com/chan_kakuz/deck-7#/">Atomic Designで業務を改善した話</a>

## 最後に、

あと、私からも最近のお仕事 (ざっくり CakePHPに Vueを導入) を通して得られた経験から喋らせていただきいてます。今後も引き続き「登壇駆動開発」を進めてまいりますので、よろしくお願いいたします🙇‍♀️

<a class="link-preview" href="https://webneko.dev/posts/in-progress-to-vue-on-cakephp">CakePHPにVue導入 - その2</a>

次回 #11 は Vue Fes直前の 10/9 京都Devかふぇ (フリュー株式会社) と共催、今回は特別に [Daiki Kojima (@Daikids2)](https://twitter.com/Daikids2) さん、サイボウズ株式会社 [@shisama](https://twitter.com/shisama) さんを登壇者として招聘して開催します。

<a class="link-preview" href="https://vuekansai.connpass.com/event/144194/">v-kansai #11</a>

### (実は)大阪では年内最後でした！

v-kansai は 11/2 フロントエンドカンファレンス関西にコミュニティの一つとして参加するため、大阪でのミートアップは今回が年内最後 (実は。。笑) でした。そのため、もくもく会 #3 を 11/23 にセッティングしています。入退場自由、ご都合よろしければご気軽にご参加いただければと思います！

<a class="link-preview" href="https://vuekansai.connpass.com/event/140377/">v-kansai もくもく会 #3</a>
