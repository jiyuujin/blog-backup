---
date: 2019-01-14
title: Kyoto.js #15 参戦後記
description: 一年ぶりの開催となったKyoto.js #15に参戦。自ら(少々堅めの話題で)登壇も行いました。遅ればせながらその振り返りを行います。
slug: enter-the-kyoto-js-15
reaction: ⛩
category: 
tags: 
 - NodeJS
 - Review
---

## お酒あり、懇親会あり、わいわい

今回初めて、scrapboxの開発を行っているnotaさんに行かせていただきました。

### [GAS周りを使って楽チン 導入](https://jiyuujin.github.io/introduction-to-gas/)

今回年末年始に行っていたことをテーマとして選定したものの、少々(というよりかはかなり)堅過ぎたなぁ.. と。

作年10月にオープンした当ブログの解析を効率化した話で、まだ実績面では伝えきれず導入編のみとなってしまったことは素直に反省です。😅

後日色々と判明する事実も増えてくると思いますので、改めて公表するタイミングがあれば公表していきたいなと思います。

```bash
# @google/clasp
npm i @google/clasp -g
```

## ログイン、プッシュする

```bash
# Login
clasp login
```

`appsscript.json` は [Manifest Structure](https://developers.google.com/apps-script/concepts/manifests#manifest_structurehttps://developers.google.com/apps-script/concepts/manifests#manifest_structure) を参考にして設定。

```bash
# Push
clasp push
```

### 懇親でも貴重なご意見

身近に活動していることなど交わしながら、最近の関西圏でのコミュニティ活動の停滞感の共有まで。

React Kyotoは2017年夏で(事実上)活動停止していたり、

ng-kyotoは今月久しく活動するようですがリーダーの存在無くして継続されることが無いようです。

改めてv-kansaiは可能な限り毎月(無理でも四半期に一回)のペースでやっていきたいと。

## [dpi awareなimg CustomElementをつくる](https://scrapbox.io/daiiz/dpi_aware%E3%81%AAimg_CustomElement%E3%82%92%E3%81%A4%E3%81%8F%E3%82%8B)

img要素でRetina画像を表示すると大きくなる問題を [dpi-aware-image](https://github.com/daiiz/dpi-aware-image)を作って解決した話。

DPI (dots per inch)を考慮せずに、画像の物理ピクセル数がそのまま使われていることが原因。

予めsvgの中にRetina画像で原寸大で表示する情報を包含することがミソ。

## [Vueでネイティブアプリを作り倒す](https://speakerdeck.com/takumiz19/vuedeneiteibuapuriwozuo-ridao-su)

ネイティヴアプリを作る以上、最低限Swift/AndroidJava界隈を知っていないとやはりダメなようですね。

Angularのイメージの強いIonicですが、Capacitorでビルドすると使うと良いらしい。

一方でVue Nativeは、$emitに対応していないとのこと。(このあたりはまだまだな印象)

## [npm-safety-updaterのご紹介](https://github.com/pastak/npm-safety-updater)

こちらに限らずですがOSSコントリビュータも多く、参加前から萎縮してしまっていました。😅

npmに詳しく無いと影響範囲が分からない、というのは確かに事実ですね。

## [off-the-main-thread with WorkerDOM](https://speakerdeck.com/masashi/off-the-main-thread-with-workerdom)

Worker DOM(のみならずDOM周り含め)周辺の知識は勉強の足りない分野でしたが、

簡単に始められる印象で、改めてスライドを含め見直したいところですね。

## [How to hack VSCode: evil ways	](https://speakerdeck.com/fand/how-to-hack-vs-code-evil-ways-japanese)

GLSLライブコーディング [VEDA](https://atom.io/packages/veda)を作っている話。

拡張機能でDOMをイジり放題なAtomの特徴を活用しているとのこと。

私もAtomで愛用しているPowerモード、VSCodeでも:beforeや:afterに装飾を当てることで実現していたのですね。

## [2018 年は Firebase を使ったけど 2019 年は AWS Amplify を使おうと思う](https://speakerdeck.com/potato4d/aws-amplify-2019-number-kyotojs)

昨年年末のv-kansai #1でもAmplifyネタで喋った方([@is_ryo](https://twitter.com/is_ryo))がいらっしゃいました。

年末年始に私自身もAmplifyを試しましたが、当時の印象はAWS側で全てやってくれるので簡単。

去年のNetlifyの波のように、今年はAmplifyの波が来そうな気がしました。

## [CSS in JSでメディアクエリをパッとやる](https://speakerdeck.com/1natsu172/kyotojs15-handy-media-query)

画面別対応で少々面倒なメディアクエリをJSからのアプローチで解決したという話。

[handy-media-query](https://github.com/1natsu172/handy-media-query)を使うと無理をしてCSSでがりがりやる必要は無くJavaScriptで楽にアプローチする。

複雑なメディアクエリで無ければ、パッと使えるようなので機会あれば使いたいと思います😀

## [Introduction to dart/flutter](https://scrapbox.io/tomoz6o9-public/Introduction_to_Dart%2FFlutter)

こちらの登壇のみ、JavaScriptとは違った話(しかも今一番流行りのFlutter)でした。

スタイルの調整がネスト地獄になることは良くも悪くもWebのジャンルに存在しているという印象。

iOS/Androidといったネイティブ技術の素養も身につけていないと厳しいといった印象変わらなさそうです。

## [JavaScriptでもディープラーニングってやつでなんとかして](https://speakerdeck.com/spring_raining/kyoto-dot-js-15)

WebGLを使って機械学習、推論を行うといった中々奥深いことをやっているといった話でした。

Pythonのイメージのある機械学習ですが、JavaScriptでもTensorJSを筆頭に採用されており、

最近はMicrosoftも名乗りを上げているんだとか。(ONNX)

