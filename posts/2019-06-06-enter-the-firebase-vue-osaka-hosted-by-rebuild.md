---
date: 2019-06-06
title: Firebase + Vue.js Meetup リポート
description: Re:build主催は今年 1月の東京に続いて 2度目、今回は LT枠の 1人として参戦させていただきました。
slug: enter-the-firebase-vue-osaka-hosted-by-rebuild
category: 
tags: 
 - Vue
 - Firebase
 - Firestore
---

## 大阪で初めて Re:build主催！

主催者である 株式会社Re:buildの鈴木孝之さん自らのご紹介より始まりました。沖縄から北海道まで直行便だと高いことを理由に、今回初めて大阪を経由。ついでに開催したという経緯だったそう。これほどアクティブに活動されるお姿は本当に尊敬しますね！

### 株式会社ITプロパートナーズさま (SkyO) にて、

セッション前に少しばかり紹介、大阪支社を立ち上げたことが直近で大きなニュースでした。

<a class="link-preview" href="https://itpropartners.jp/">ITプロパートナーズ</a>

![rebuild-skyo](//images.ctfassets.net/gzkue3szf85p/4V83pYhDb8qCBZU2UpRDP1/c3e04e354f4fd6cf5ddf3304292430cf/rebuild_skyo.png)

### Solstice Clientとは、

初耳の存在、今回の登壇で初めて使わせていただきました。ワイヤレスで画面共有できるものらしいです。

![solstice](//images.ctfassets.net/gzkue3szf85p/3j9Xhm1KDrLOhMA1Lml00X/6a75870966853e7344894312a1043ed9/solstice.png)

事前に .dmgファイル (Macの場合) をローカルに落とす必要がありますが、基本的に指定の URLを叩くことで直感的に画面共有できるので流行ると良いなぁと思いました。

## Firebase入門編 + Firebaseチャット

主催者である鈴木孝之さんから引き続き、 Firebaseの入門的な話。 Authenticationに Twitterを使った認証、デプロイ先に Hostingを使う簡単なデモがありました。初心者でも気軽に入ることができるのが印象的ですよね。

また実務で Firebaseチャット機能を実現している話。スピードを重視、メンテナンスコストが高くないことを考慮。この辺りから Firebaseを選定したとのこと。無料枠が 1GBしかないことや、検索に少々弱みを抱えていることなど、懸念していることも多いので今後考えなければいけない、という話でした。

<a class="link-preview" href="https://speakerdeck.com/kkznch/development-of-own-service-using-nuxt-dot-js-by-inexperienced-spa-development">SPA開発未経験者によるNuxt.jsを使った自社サービス開発</a>

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/firebase-plus-vue-dot-jstezuo-tuta-tiyatutowotehuroi">Firebase+Vue.jsで作った チャットをデプロイ</a>

## プロダクト制作、そして心がけていること

久しぶりに [@jiyuujin](https://twitter.com/jiyuujinlab) 自ら話させていただきました。業務外ながら当ブログの裏側で動作する [管理画面](https://admin.nekodev.app/) について、セキュリティルール周りで心がけていることを中心に話しました。登壇の中でも触れましたが管理画面周りの話題が多いこともありました。機会あれば今日話せずでした Function経由で Google Spreadsheetにアクセスしている話なども近いうちに共有させていただければと思います。

<a class="link-preview" href="https://slides.com/jiyuujin/20190606#/">プロダクト制作、そして心がけていること</a>

## Laravel × Vue.js × PWA でアプリっぽい動きを実現する

SawashitaTakuyaさんの登壇、Laravel × Vue.jsの構成に流行りの PWAを取り入れてアプリっぽい動きを実現した話。最近は非同期画面遷移の利用が増え、パフォーマンス面から見たアプリの挙動を考えさせられる機会が増えてきたような気がします。アニメーションに gsapを採用、 [Barba.js](https://barba.js.org/)でも実現できる内容だったが Vue.jsを使った方が教育コストや手間等を考えると楽だったかもしれないという話でした。

## 最後に、

直近の告知を。個人的に Stripeのイベントは都合合えばお邪魔させていただきます！

1. kansai.ts in 大阪 #1
   - 6/10 (月)
   - <a class="link-preview" href="https://kansaits.connpass.com/event/130120/">kansai.ts #1</a>

2. JP_Stripes in 大阪 Vol.4
   - 6/18 (火)
   - <a class="link-preview" href="https://eventregist.com/e/JP_Stripes_Osaka_4">JP_Stripes Vol.4</a>

3. v-kansai in 京都 #7
   - 6/22 (土)
   - <a class="link-preview" href="https://vuekansai.connpass.com/event/127057/">v-kansai #7</a>
