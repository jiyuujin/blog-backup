---
date: 2019-02-04
title: 東京で初登壇させていただきました
description: 昨年後半より、露出をメキメキと増やしていますが、この度東京で初めて喋る機会をいただきました。
slug: enter-the-laravel-vue-js-meetup-7
category: 
tags: 
 - Laravel
---

## 登壇、総括を軽く。

5分LTでしたが想定以上に喋り過ぎてしまい、当初考えていた Laravelで Google Oauth2認証を使って業務効率化を図った話でも良かったかもしれません。近い内にどこかで、と考えておりますのでその際はよろしくお願いします。

## コンシューマ向け SPAでプロダクトを開発して得た知見

前置きとして今回はにゃんこ大戦争とは別の経験から話しました。公式サイトのみ PC/SP両対応、アプリ内ブラウザは文字通り SPのみ。 CSSフレームワークを一切採用せず、複雑な mixinsも採用していません。Webサイト側で API 40-50程度、 Componentは 100超えの規模感。管理画面もゼロから制作していましたが、先の 2-3倍の規模感をご想像ください。

<a class="link-preview" href="https://slides.com/jiyuujin/20190131">コンシューマ向け SPAでプロダクトを開発して得た知見</a>

## その他 LTセッション

### 初めてのLaravelで学習を始めるまでのお話

[@show60](https://twitter.com/show60)さんの登壇、Laravelを始める上で必須の環境構築、奥の深い設計周りについて。初心者ならでは、の詰まった点を発表されました。

<a class="link-preview" href="https://speakerdeck.com/show60/chu-metefalselaraveldexue-xi-woshi-merumadefalseohua">初めてのLaravelで学習を始めるまでのお話</a>

### Popular Vue.js UI Frameworks in 2019

[株式会社プラムザ (plumsa)](https://www.plumsa.co.jp/) ララ・ベル子さんの「中の人」の登壇、 UIフレームワークをGithubスター数で比較してみた話でした。

<a class="link-preview" href="https://speakerdeck.com/fromarm4/popular-vue-dot-js-ui-frameworks-in-2019">Popular Vue.js UI Frameworks in 2019</a>

### 実運用におけるLaravelとNuxtでのRepositoryのレイヤ分割の話

[@konshou](https://twitter.com/konshou)さんの登壇、クリーンアーキテクチャや ADRなど実際によく見る構図について。これらは実際にどう使われているの.. ?といった観点で話されました。

1. DBなどデータソースに変更があった場合、ドメインのレイヤのみ変更する
2. フロントとのつなぎ込みの変更があった場合、ServiceProviderのレイヤのみ変更する

<a class="link-preview" href="https://speakerdeck.com/konshou/shi-yun-yong-niokerularaveltonuxtdefalserepositoryfalsereiyafen-ge-falsehua">実運用におけるLaravelとNuxtでのRepositoryのレイヤ分割の話</a>

### Testing on Laravel

[@nunulk](https://twitter.com/nunulk)さんの登壇、 Laravelでのテストの話。これまでスピードを重視したことで個人的にはテストをがっつり書いてこなかった人でしたが、 Model Factory + Fakerの辺りが凄く気になりました！ そろそろ本気を出してテストを書いていきたいと思います。

<a class="link-preview" href="https://speakerdeck.com/nunulk/testing-on-laravel">Testing on Laravel</a>
