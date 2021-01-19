---
date: 2018-09-14
title: 初めて登壇に挑戦
description: Parcelをモジュールバンドラに使って、さくっとプロフィールサイトを制作。ちなみにご縁があって初登壇させていただきました！
slug: the-first-lt-in-kyoto-dev-cafe-3
category: 
tags: 
 - Vue
 - Parcel
---

## 初LTの総括

Vue.jsユーザグループの Slackでのお誘いをきっかけに、ノリで登壇させていただくことになりました！ 

<a class="link-preview" href="https://docs.google.com/presentation/d/e/2PACX-1vSFU25_aUcdfksE887xYYdsG3QdlUgrQDAxZh3BRdpbA6I91HPwax6PgpEQAAK4y7EYzdeIRY2OysZ3/pub">あえてNuxtを使わずプロフィールサイトを作った話</a>

[@SatohJohn](https://twitter.com/SatohJohn) さん始め 後から聞いた話によると、15分予定のところ20分話していたとのこと。時間調整は難しい。。ですね汗

![](https://i.imgur.com/UjArqZQ.jpg)

### Parcelを採用して、

Parcel選定は、大きな Webアプリに成長しないことを踏まえての判断です。基本的に Configファイルは不要、ビルド高速であること。下記のコマンドを叩くことで、簡単に Webアプリを構築することができます。

```json
{
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --public-url ."
  },
}
```

ただし実感としてはルーティング周りで挙動が怪しい印象がありました。プロダクション環境でビルド (parcel build) すると vue-routerが機能していない点。中々解決できず。。 出始めの新興勢力につき今後に期待と言ったところでしょうか。

## その他

さらっと流します。あくまで Vue.js Meetupという訳では無かったものの、結果 Vueを布教する回となりました。何かとディスられる jQuery、 Vueの対比は興味深かったです。
