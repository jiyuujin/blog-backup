---
date: 2022-06-15
title: Google I/O と WWDC について語らいました
description: PWA Night 40 にて、先日行われた Google I/O 2022 と WWDC 2022 の Recap と称して登壇させていただいた。
slug: 22s-googleio-wwdc-recap
reaction: 🎨
category: Poem
tags: 
 - GoogleIO
 - WWDC
 - Web
---

PWA Night として記念すべき 40 回目に、先日行われた Google I/O 2022 と WWDC 2022 の Recap と称して登壇させていただいた。

https://pwanight.connpass.com/event/250815/

なお、登壇スライドは下記の通りです。

https://docs.google.com/presentation/d/1Y5ubD-CzpH8nFVWBaD_Fq5RSHCzxhTi6yIsAp45VH8w/edit?usp=sharing

## 簡潔なまとめ

私の肩書き上 Web エンジニアとアプリエンジニアを名乗っていることで、やや Web とモバイルに偏重気味になっている点はお許しください。

- Web 界隈では、特に Apple の Web に対する気合を感じた
- モバイル界隈では、言語の書き味が良くなった
- その他 AR などの新技術

中でも Google I/O の Developer Keynote トップで提供された話題として ARCore は新鮮だ。

今後その API を利用したサービスが出てくるものと考えると、さぞかし夢も広がるでしょう。

### Web 界隈

- Google I/O、 WWDC 共に Web で大きな動きが多かった
- 特に Apple の Web に対する気合を感じた

Container queries や Subgrid など Safari で使えるようになったのはもちろん、待望の push 通知も近く実現される知らせは大きな話題です。

macOS (Safari 16) では間も無く、また iOS や iPadOS では 2023 年にも実現されるとのこと。

CSS 技法は下記に示すようにモダンブラウザで広く使える状態であることが確認されているようです。

||Chrome|Safari|Firefox|
|:---|:---|:---|:---|
|subgrid|❌|🙆🏻‍♀️|🙆🏻‍♀️|
|subgrid<br/>grid-template-columns</br/>grid-template-rows|🙆🏻‍♀️|🙆🏻‍♀️|❌|
|focus-visible|🙆🏻‍♀️|🙆🏻‍♀️|🙆🏻‍♀️|
|contain|🙆🏻‍♀️|🙆🏻‍♀️|🙆🏻‍♀️|
|dialog|🙆🏻‍♀️|🙆🏻‍♀️|🙆🏻‍♀️|

### モバイル界隈

なんといっても Flutter 3 で 6 プラットフォームの開発が可能になったのは大きいです。

ちなみに、昨年リリースの Flutter 2 では Null Safety 対応が主な更新だったりするものの、今回そこまで更新するために手こずったという話はほとんど聞かれません。

また Dart/Swift の書き味が良くなっている。

- Dart 2.17
    - enum が強化された
    - super で記述量がグッと減った
- Swift 5.7
    - 型推論が改善された
    - Top-level await が導入された

もちろんこれだけに留まらないが、言語として書き味が良くなることは素直に歓迎したい。

それぞれの詳細について、下記記事をチェックしていただければ幸いです。

- [Dart 2.17: Productivity and integration](https://medium.com/dartlang/dart-2-17-b216bfc80c5d)
- [What's new in Swift 5.7](https://www.hackingwithswift.com/articles/249/whats-new-in-swift-5-7)

## 最後に

![](https://i.imgur.com/2jWZ7bh.jpg)

今日をもって IE11 は EOL を迎える。

Twitter には IE 丸々 28 年の歴史を振り返るショートムービーが回ってきている。

https://twitter.com/ooboonto/status/1535623399065718784?s=21&t=F33O5EtFjc04zrY3Hk463g

なお、前々から EOL のアナウンスがあったので、各プロダクト企業を始め IE 対応しない旨を明言することもしばしば。

昨年、自身が書いた [記事](https://webneko.dev/posts/pray-the-internet-explorer-for-memorial) があるので、こちらも合わせてご確認いただければ幸いです。

https://webneko.dev/posts/pray-the-internet-explorer-for-memorial

とはいえ IE を前提としたアプリケーションもまだ多く存在しているらしく、まだまだ完全に抜け切れないというのが率直なところのようです。

ちなみに WindowsServer 2022 では、引き続き IE11 が使えるらしいので、これはまあ複雑なところです。
