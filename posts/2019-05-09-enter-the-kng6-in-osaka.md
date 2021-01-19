---
date: 2019-05-09
title: 初めまして、関西Node学園
description: 初めて関西 Node学園 #6 (#kng6) に参加させていただきました。
slug: enter-the-kng6-in-osaka
category: 
tags: 
 - TypeScript
 - Node.js
---

## 初めまして！ 関西 Node学園

今まで個人的な都合により参加できずでしたが、今宵初めて関西 Node学園 #6 (#kng6) に参加させていただきました。初めて関西 Node学園を開催してから丸 1年、きっかけは関西を盛り上げたいとのことですが、 v-kansai (Vue) や kansai.ts (TypeScript) でも同様です、是非とも盛り上げていきましょう！

### さくらインターネット株式会社 大阪本社にて、

![kng6-sakura-internet](//images.ctfassets.net/gzkue3szf85p/72QU9SqPWLt6mo3Mr8sL7U/8119a92c6335208b1f1dbd2ed75e537e/IMG_1047__1_.JPG)

## Node.js v12

関西 Node学園オーガナイザ [@shisama](https://twitter.com/shisama) さんの登壇、発表内容を事前に共有いただいてました。

<a class="link-preview" href="https://shisama.hatenablog.com/entry/2019/05/08/070000">Node.js v12</a>

v12になり掻い摘んで気になったことを中心に紹介がなされました。 JSエンジン V8のアップデートで新機能が追加されました。 async/awaitが promiseと比較して高速化。 ES2015で導入されたクラス構文で `#` から始まるプライベートフィールドが使えるようになっています。内容はあまりに濃厚過ぎて続きは [Webで](https://shisama.hatenablog.com/entry/2019/04/24/103000) チェックしておきましょう。

<a class="link-preview" href="https://shisama.hatenablog.com/entry/2019/04/24/103000">Node.js v12</a>

## 半年がかりでNode.jsにコミットして得たもの	

https://speakerdeck.com/koh110/nodejs-commit

ヤフー株式会社の [@koh110](https://twitter.com/koh110) さんの登壇で東京から日帰りのご参加、バグ修正を通してコミットまで到達した経験談について話されました。今回は maxBufferの説明に難航、また意外とアクティブではないコラボレータ界隈、 CIを回すことすら一苦労だったようです。

マルチプラットフォーム (libuv) 対応はとにかく大変。結論は Windowsで `listen(0)` につまづいたこと。こうして得られた結果、語学力よりソースコードを信じたことが Approveへの一番の近道だったので参考になれば幸いです。

## eslintでtypescript

つい先日 eslintチームが TypeScriptサポートに本気を出す宣言をされましたね。 ng-kyotoを運営している [sayanaka (@zilch8)](https://twitter.com/zilch8) さんの登壇、 `@typescript-eslint/eslint-plugin` と [ルール対応表](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md) を使って TSLintからの乗り換えを絡めた話。どう考えても Lintエラーの発生する条件での簡単なデモがありました。実際、最低限のルールを記載したプロジェクトでの TSLintからの置き換えでしたが、所感としては大変だったようです。

```bash
# @typescript-eslint/eslint-plugin
yarn add @typescript-eslint/eslint-plugin
```

<a class="link-preview" href="https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md">eslintでtypescript</a>

### ng-kyoto #10

ng-japanと合同開催、東京と同時中継するようです。 LT枠に空きがあるので、ご都合の合う方は是非どうぞ！

<a class="link-preview" href="https://ng-kyoto.connpass.com/event/124745/">ng-kyoto #10</a>

## Node.jsサーバアプリケーションの稼働方法 ~ 基本から Dockerまで

株式会社 ビーツリー (BTree) の [@akkun_choi](https://twitter.com/akkun_choi) さんの登壇、プロセスマネージャ (今回は PM2を中心に) と Dockerを使って Webサーバの構築を比較しながら話されました。基本的に PM2を使いたい場合は、以下 [リンク](http://pm2.keymetrics.io/docs/usage/startup/) を参照すると良さそう。サーバ運用を考える上で基本的に PM2はだいたい解決してくれます。マルチプロセスにする場合は、モードの違いに注意すること。

```bash
# PM2
pm2 start app.js
```

最後に AWS ECS/Dockerと Node.jsの相性の良い関係性から、 AWS Fargateの話。当ブログも Fargateの下で運用してます (20%ほど安くなってます) が、敷居は決して低くなくなっているように思います。

<a class="link-preview" href="https://speakerdeck.com/akkunchoi/node-dot-jssahaahurikesiyonfalse-jia-dong-fang-fa-ji-ben-karadockermate">Node.jsサーバアプリケーションの稼働方法 ~ 基本から Dockerまで</a>

<a class="link-preview" href="http://pm2.keymetrics.io/docs/usage/startup/">PM2 Startup Script</a>

## tsxをJavascriptで綺麗に構文強調したい + おまけ	

HAL大阪に通っている [@mochiya98](https://twitter.com/mochiya98) さんの登壇、　TypeScriptに対応できていないライブラリ (highlight.jsなど) で構文強調した話。 VSCodeの Webエディタに [Monaco Editor](https://microsoft.github.io/monaco-editor/index.html) が存在していたのは初耳。

<a class="link-preview" href="https://microsoft.github.io/monaco-editor/index.html">Monaco Editor</a>

しっくり来るのが無く standalone-monarchという名前で自作したものの、結局 VSCodeの中の人が作っている [shiki](https://github.com/octref/shiki) を使えば良いことが後から判明。そもそも正規表現ライブラリ Onigurumaが Cで書かれており Webでは使えない、VSCodeでは使えない訳はこのことだったようです。

<a class="link-preview" href="https://github.com/octref/shiki">octref/shiki</a>

### おまけは、 Preactを導入した話

React DOMだけでバンドルサイズが 100MB超。この大きさを理由に Preactに移行した話。実際に [イベント箱](https://m98.be/event-box/#/) で使っているそうです。

<a class="link-preview" href="https://m98.be/event-box/#/">おまけは、 Preactを導入した話</a>

## 便利で危ない npm install

インストールするパッケージはどうやって選定していますか。 [増満光 (@dos_pg)](https://twitter.com/dos_pg) さんの登壇、 Node.jsは OSへの操作が可能で実はセキュリティの観点から危険という話。

みんなが使っているから大丈夫だろう。

**これは実に危険！！！**

<a class="link-preview" href="https://qiita.com/mysticatea/items/aac027f9183ea9f0f9b1">便利で危ない npm install</a>

これを受けて、自衛手段を考えさせられる場面がありました。

## 最後に、

Node学園ではありませんが、 Node.js/TypeScript繋がりで一言。この度、自ら kansai.tsを立ち上げました。 6/10 (月)に #1 をグローバルベンチャーハビタット大阪（GVH Osaka）様にて開催します。まだブログ枠に空きがありますので、ご都合宜しければご参加ください！

<a class="link-preview" href="https://kansaits.connpass.com/event/130120/">kansai.ts #1</a>
