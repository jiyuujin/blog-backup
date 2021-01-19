---
date: 2019-06-23
title: V-KANSAI で一部オンラインを導入しました
description: 早くも第7弾開催となりました、今回は沖縄からのリモートLTを取り入れるなど挑戦はまだまだ続きます。
slug: enter-the-v-kansai-7-in-kyoto
category: 
tags: 
 - Vue
 - Nuxt
 - Review
---

## 土曜の京都！しかし課題も多く。。

週末に開催してみては、と思い切って決断。その結果は想定より集客できず。そもそももっと集まるだろうという高い目標を自身で設定していたことも影響しているのでしょう。まだまだ私個人の力量が不足していることを痛感させられました。申込者は最終的にキャンセルした者を含めると、大阪開催と同規模 (30名規模) を京都で実現するのは難しいようです。

### コネクトフリー株式会社にて、

唐突に課題ばかりを列挙してすみません。。 今回初めて利用させていただきましたコネクトフリー株式会社さん、スポンサーLTは同社 中林智之さんが自社で制作のZen言語について話されました。

<a class="link-preview" href="https://speakerdeck.com/tomoyuki/wasm-in-zen">Zen言語で WebAssembly</a>

![connectfree](//images.ctfassets.net/gzkue3szf85p/4JBRadTnLVX7u9KWp6VlYj/c898f5c73ac2861cae0a836034ca555b/connectfree.png)

立地は申し分無いですね、四条烏丸交差点すぐの好立地。目の前にポケモンセンター！

![pokecen](//images.ctfassets.net/gzkue3szf85p/1QysaD1sbNpTlyfNqvB30g/e202ef956919d87502fc91e6fc6ad330/pokecen.png)

## 登壇を一部ご紹介

### Vueを TSで書く

掻い摘んでご紹介。 Daiki Kojimaさんからは、 Vue Componentや Vuexを TypeScriptで書く話。今回 Vueを触っている参加者がおよそ 15名。その中でも TypeScriptを触っているのはまだ 2-3名と数える程でしたので、特に参考になった方が多いのではないでしょうか？ 詰まったら Anyで逃げちゃえ、といったことも全然アリかもしれませんね。

### Web Componentsを使う

続いて [ゆきしば (@pastelcoder)](https://twitter.com/pastelcoder)さんから Web Componentsを使って Vueを書く話。先の TypeScript同様、 Web Componentsも実際に触っている方は少なかったようです。実際に [カスタムコンポーネントを簡単に作ってみたデモ](https://github.com/yukishiba/demo-vue-custom-element/) を紹介しながらの登壇となりました。こちらを少し参考にさせてもらおうかと思います。

### 初心者が挑む Laravel (SPA) 開発

最後に [@gaga-rin](https://twitter.com/gaga-rin)さんの登壇、プログラミング歴 3か月ながら Laravel (SPA) 開発に取り組んだ話。経験が少ないながらも 3か月で Webアプリとして普通に使える形式に落とし込んだのは凄いと思いました。今後もこのような初心者を応援する類の LT大歓迎、ご気軽に挑戦いただければと思います。

## メインは沖縄、京都を繋ぐ

これほど大きな会場での経験は今回が初めて、京都側の音量調節で少々時間を取りました。

![remote-in-v-kansai-7](//images.ctfassets.net/gzkue3szf85p/72f1CZrOAolWGRaGMYGSeh/d52a05d11c3bf656ac3a0db6e85f1908/remote.png)

原因はZoom側の音量調節をしていなかったこと。日常的にZoomを使っている身ですが今回のように不特定多数に対して見てもらえる機会はそう無かったことが一因です。知見を積み重ねていくことで対応できるはずなので、今後もリモートLT枠を設定することも検討していきたいと思います。

### Cypressを導入してみた

株式会社Re:build カンボさんからは、ブラウザテストの手段として Cypressを採用した話。 UI/UX周りで大きな変更がある場合は、止むを得ず後戻りする選択肢しか残らなくなりますが、今まで経験したことのない Cypressをあえて選択したとのこと。 Cypressそのものというよりも Docker/CI周りで少々時間がかかったようなので、導入する際はこの辺りに気を掛けると良さそう。

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/cypresswodao-ru-sitemita">Cypressを導入してみた</a>

### Nuxt.js使いたい話

[知念昌史 (chocodogmagic)](https://twitter.com/chocodogmagic)さんからは、 Nuxtを採用する際 Nuxtを使える環境面をしっかり考える必要があるという話。登壇の中では Firebase Hostingを使った簡易的な Webアプリ (趣味プロダクト) のご紹介がありました。お客様の要件によりレンタルサーバで node.jsを起動しなければならず、まだまだ SSR周りの事例が少ないようです。この知見を持っている方がいらっしゃれば是非、という話でした。

<a class="link-preview" href="https://speakerdeck.com/chinen/v-kansai-meetup-number-8">Nuxt.js使いたい話</a>

## 最後に、

次回 7/24 (水) chatbox 新オフィスで開催、お時間が許すようであればご参加を検討いただければと思います。

<a class="link-preview" href="https://vuekansai.connpass.com/event/136514/">v-kansai #8</a>
