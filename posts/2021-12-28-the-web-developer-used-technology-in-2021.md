---
date: 2021-12-28
title: Webデベロッパとして2021年に使った技術スタック
description: 今年も振り返る。昨年に続いて 2021 年の最後に 2 年も続いた「コロナ禍」な一年間を振り返る。
slug: the-web-developer-used-technology-in-2021
reaction: ⛄️
category: 
tags: 
 - Review
---

2021 年最後のポスト。

## 立場

前半はフロントエンドエンジニアを主に時たまサーバサイドも触れながら、後半はフロントエンドに限らずサービス開発エンジニアとしてプロダクトの成長に関わらせていただいた。

また今年も個人としてのプロダクトをいくつか製作・運用を進めている。

- 半期前半は主に CakePHP/React/AWS を使用しているサービスの運用・開発に
- 半期後半は主に React/Express/WebSocket/AWS を使用しているサービスの運用・開発に

そうした前提の下で一年間の KPT、利用した技術一覧を見ていく。

### Keep : 良かったこと / 今後も続けたいこと

- 開発者の視点でアクセシブルな開発を啓蒙、パフォーマンス最適化、フロントエンド環境刷新
- 属人化解消を目的としてエンジニア教育に注力
- ブログ 40 件 (技術記事を当ブログで 30 件 / 112635 文字数、個人・イベント振り返りを Note で 10 件)
- 登壇 3 件 (オンライン 3 件)
- 日本初 Flutter カンファレンス (FlutterKaigi) のオーガナイズ
- VS Code Meetup 主催のカンファレンス (VSCodeCon JP) のお手伝い
- OSS にコントリビュート 7 プロジェクト
    - nuxt-community/content-module
    - FlutterKaigi/confwebsite
    - etc
- `オハヨーエンジニア` や `Flutter Spaces Live!!` の運営 (Twitter Spaces) を通して MC 力を身に付けた

### Problem : 上手く行かなかったこと

- 比較的モダンな技術スタックを使っていてもなお、もっとできることがあるよねと考えさせられた
- Flutter ハンズオンで自身の満足がいく運営の下進められなかった
- 下半期は PWA Night を始めとした各種コミュニティの運営に支障を来たした
- 昨年に続いて v-kansai の活動は引き続き停止したまま

昨年以上に設計を考えさせられる比重 (時間) が大きいと感じた。プロダクトの安定稼働はもちろん、それと並行していかに機能開発とそのブラッシュアップを高めていくかと言うのを求めていることを実感した。

またコミュニティについては整理する時間が必要だ。場合によっては運営を下りる選択肢も厭わない。

## 利用技術一覧

[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/0-profile-details.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/1-repos-per-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/2-most-commit-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/3-stats.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/jiyuujin/github-profile-summary-cards/master/profile-summary-card-output/github/4-productive-time.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)

これは [GitHub Profile Summary Cards](https://github.com/vn7n24fzkq/github-profile-summary-cards-example) という便利ツールを使わせてもらい自動生成している。自身の Github アカウント内のみ、他 Gitlab を使っているプロジェクト等あったが、この自動生成分には含まれていない。

なお今年もテーマの主軸は TypeScript/React/AWS の辺りでした。

[@preview](https://docs.google.com/spreadsheets/d/1ft-vSMBrJW9z--xdtgSHGkME_ph9i2hbHMRFwyG255s/edit?usp=sharing)

昨年同様、適宜業務の必要に応じてフロントエンド環境の刷新から運用効率化の一端を担うツール製作まで、幅広く動いていた一方でイベント振り返りを Note で書いた点が昨年と違う。

昨年の記事と比較・参照していただけると幸いです。

[Web デベロッパとして 2020 年に使った技術スタック](https://webneko.dev/posts/the-web-developer-used-technology-in-2020)

## 特記事項

スキルに焦点を合わせて書かせていただいた昨年の振り返りとは趣向を変えて、今年はプロジェクトに焦点を合わせて書かせていただいた。

この 2 年間、取り組んできたプロジェクトでは下記の通りです。

- PWA 対応のセルフオーダー画面を構築 (AWS Lambda や Vue を利用)
- React/MobX を利用した MPA 環境を構築
- CakePHP/React/AWS を使用しているサービスで Webpack をバンドラに使う
- React/Express/WebSocket を使用しているサービスで CRA 環境の下使う

今年もちょっとしたツール製作などを含めても React/TypeScript をメインに書いた。また Svelte を書く機会もあった (作った) のは大きい。一方で、昨年後半から 1 年以上にわたってお仕事の場面では Vue をほとんど書かなかった。

またアクセシブルな開発の実現に向けて、プロジェクト内で啓蒙・推進した。そのベースのひとつとも言えるガイドラインの策定は目下進行中。来年以降、公開できる範囲内でその知見を共有・発信できれば幸いです。

また FlutterKaigi 2021 ティザーサイトの製作を通し、コントリビュートの機会を獲得できたことも大きい。

## 最後に

来年以降、フロントエンド技術に限らずインフラサイドへの知見を深めることはもちろん、今年以上に OSS への関与を増やすことを目標のひとつに掲げたい。
