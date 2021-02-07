---
date: 2019-01-20
title: V-KANSAI #2 リポート
description: v-kansai Vue.js/Nuxt Meetup #2を開催しました。会議室を提供いただいたアイル株式会社様、この度はありがとうございます！
slug: enter-the-second-vue-js-nuxt-meetup-in-osaka
reaction: 2️⃣
category: 
tags: 
 - Vue
 - Nuxt
 - Review
---

登壇 8 名、LT 8 名。参加所定枠 30 名に対し、75 名ほど。参加できなくなる者が出るほどの盛況振り。

## Contentful 製ブログで Google Adsense が使えるようになるまで

昨年秋に公開の [Web猫ブログ](https://webneko.info/)、年末にアドセンス審査通過を受け今回の喋るネタにさせていただきました。

審査通過に 2 週間ほどかかってしまいましたが、以下熟すことで Adsense を使う準備が整うので参考になれば。

1. 主にお世話になっているパッケージ (Adsense/Analytics/Sitemap)
2. 適度に固定の文字情報を追加
3. プライバシーポリシーの設定、キャッシュ使用を明示 (vue-Cookie-law と vuex)
4. エラーページの設定
5. コメント・問い合わせの設定 (Firestore)

## その他 LTセッション

デザイナーが Nuxt で簡単な ToDo リスト作成を通して、いかに楽なスタートアップか知らせた次第。

中級者以上向けに Vue コンポーネントの設計を考える方も。

1. ロジック肥大化を避けること
2. ステート(状態)を含めるか

この観点は私も重要にしたいですね。

登壇者当人は Atomic Design の atoms と molecules はできる限り OSS として公開することを目標にしているようです。

<a class="link-preview" href="https://speakerdeck.com/uhck/vuekonhonentonituitekao-etemita">Vue コンポーネントについて考えてみた</a>

## その他

### Nuxt で SSR 対応

[Laravel JP Conference](https://conference2019.laravel.jp/) での SSR 対応について。

カンファレンスならでは、スポンサー事情から SEO 周りを欠かせません (この辺りはブログ同様)

1. generate 内で予めリンク配列を設定する
2. ライフサイクル上、asyncData/fetch を駆使する

<a class="link-preview" href="https://speakerdeck.com/sshono1210/nuxt-dot-js-de-ssr-dui-ying-suru">Nuxt.js で SSR 対応をする</a>

## Nuxt の inject 機能

Vuex 周りのロジック改善について興味深い話でした。

Injection で DI する方が設計上体裁の整えられるようです。

<a class="link-preview" href="https://speakerdeck.com/kenfdev/nuxt-dot-jsfalseinjectdeinziekutositemiruhua">Nuxt.js の inject でインジェクトしてみる話</a>

## 最後に

今回これだけの登壇が多くあったため、全てを紹介しきれる時間がありませんでした。
