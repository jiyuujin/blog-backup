---
date: 2019-07-25
title: V-KANSAI #8 リポート
description: おかげさまで第8弾となりましたが、株式会社chatbox 新オフィスで開催されました。
slug: enter-the-v-kansai-8-in-osaka
category: 
tags: 
 - Vue
 - TypeScript
 - Review
---

## 天神祭 宵宮/本宮

天満橋から歩くと、ゲリラ豪雨もなく平和な 1日でしたが、

![tenjin-2019](//images.ctfassets.net/gzkue3szf85p/1U6A56zZCg0FSx2rrdXglg/13b01967cf1b0d8484fc5f4e892c7b72/tenjin.png)

明日の本宮にはもっと混雑ですね。。☺️

![fireworks-2019](//images.ctfassets.net/gzkue3szf85p/3c6SmV4ylI6wD1AgG1fTaR/08288cb6c6a33c5e1e933ef2670f041a/tenjin-fireworks-2019.png)

<div style="text-align: center;">
Nikon AF-S NIKKOR 18-35mm f/3.5-4.5G
</div>

翌日本宮でひとこまを現像しました。

今回はこの現像を待ってブログを書かせていただいてます。。😅

## 有り難く #8 でした！

そんな小噺はさておき、今回は最近移転の株式会社chatbox 新オフィスで開催しています。

前回 #7 同様登壇者が所定枠に到達せず今回も運営スタッフ含め自らも喋っております。あまり出しゃばらないことを心がけていますが、どうすれば気軽に登壇・知見を共有いただけるのかな、と考えるばかりです。。

### Vue と TypeScript と 私

[泉亮輔 (@is_ryo)](https://twitter.com/is_ryo) さんから、 Vueと TSを `Vue.extend` と `vue-property-decorator` を使う方法をそれぞれご紹介。

<a class="link-preview" href="https://docs.google.com/presentation/d/1Djx0Gw0oK7dI_2FKWxcWn3AvdF5NsOIbpv77u70zj1g/edit#slide=id.g5ce7141149_2_25">Vue と TypeScript と 私</a>

![vue-ts-and-me](//images.ctfassets.net/gzkue3szf85p/5eA8FcWBV1bAfVcQysMzZD/4a5e4611bd5e447c68c63835f308ca24/IMG_2109.jpeg)

### Google Nest Hub で Vue を使った話 他

Line API Expert [がおまる (@gaomar)](https://twitter.com/gaomar) さんから、 `interactiveCanvas` APIを使えば実現できるそう。 IoTデバイスが近づくと AWS Connectから得られる認証画面を Vueで作ったとのこと。前提としてコンソールでゲームカテゴリーを選択する必要はあるが、使える Javascriptに制限があることにも注意しなければいけない。

詳しくは以下の記事をご確認いただければ、ということでした。

<a class="link-preview" href="https://qiita.com/h-takauma/items/1425abe44a050dfb3269">Google Nest Hubの画面対応方法</a>

<a class="link-preview" href="https://qiita.com/h-takauma/items/acfbe4a3bec8c04a696d">ちょっとだけセキュアな認証システムをLINE Thingsでやってみた</a>

### Vue3 で登場予定の Function API

[Daiki Kojima (@Daikids2)](https://twitter.com/Daikids2) さんから、 Vue3で登場が予定されている Function APIについて。今回ご紹介されたのはほんの一握りでしたが、その中で特に気になった `Watch` が腑に落ちないこと。素直に監視する値を返す訳ではなく、関数の形式で返しているようです。

<a class="link-preview" href="https://speakerdeck.com/daikids2/function-api-you-will-use-in-future">Function API You will use in future</a>

### 読みづらい / わかりづらいコード

[ショウノシオリ (@shosho_egg)](https://twitter.com/shosho_egg) さんから、 `v-if` や `props` が多過ぎると読み辛いコードになることを例に挙げられました。責務分離を前提に設計を考えることがいかに重要か、 `template` にロジックを混在させてはいけないといったことなど、改めて考えさられる場面がありました。

### VuexFireSQL

アマゾンジャパン合同会社 [@salamander_jp](https://twitter.com/salamander_jp) さんから、 Firebaseをオマージュした VuexFireSQLについて。私は初耳でしたが、リアルタイム性を強みに vuex の `state` を自動で同期してくれるようです。ただし、セキュリティで若干怪しいという話でした。

<a class="link-preview" href="https://github.com/GitHub30/vuexfiresql">VuexFireSQL</a>

<a class="link-preview" href="https://docs.google.com/presentation/d/1Upxy7Bgb6gyQhOor5GFT7_bKke1Aq5A2c0Ulg0Fdz_o/mobilepresent">VuexFireSQL</a>

### Functional Component

フリュー株式会社 [@chan_kakuz](https://twitter.com/chan_kakuz) さんから、 Functional Componentについて。パフォーマンス面で良い影響を与えることができる (定量的な数値も出ている) ようですが、 Vue初心者の多いプロジェクト等ではオススメしません。

<a class="link-preview" href="https://slides.com/chan_kakuz/deck-4#/">Functional Component in Vue.js</a>

### vue-infinite-loading

最後に [@jiyuujin](https://twitter.com/jiyuujinlab) 自ら、最近お仕事などで使う場面があった無限スクロールについて。 vue-infinite-loadingを Vue/Nuxt (TypeScript) ベースのプロジェクトで入れた経験を喋らせていただきました。

<a class="link-preview" href="https://webneko.dev/posts/infinite-loading-in-webneko-blog">無限スクロールを導入する</a>

<a class="link-preview" href="https://slides.com/jiyuujin/20190724">無限スクロールの話</a>

## 最後に、

次回 #9 は京都の回、来月 21日 Firebase日本ユーザーグループさんと共催です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/137411/">v-kansai #9</a>

また Vueではありませんが、kansai.ts #2 は 26日 (金) に募集開始を予定しています。

<a class="link-preview" href="https://kansaits.connpass.com/event/131541/">kansai.ts #2</a>
