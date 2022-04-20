---
date: 2022-04-07
title: アクセシビリティ界隈の動きに触れてみる
description: 毎週木曜の昼に内々でアクセシビリティ勉強会を開催しています、今回は最新ニュース (Axe Con 2022) を中心に記録しています。
slug: accessibility-study-2022-04-07
reaction: 🤖
category: 
tags: 
 - A11Y
 - React
 - TypeScript
---

今回触れる内容は最新ニュースを中心に下記の通りです。

- [Axe Con 2022 備忘録](https://www.deque.com/axe-con/)
- [100 万のホームページに対するアクセシビリティ自動検証 - 2022 年の調査](https://accessible-usable.net/2022/04/entry_220407.html)
- [freee アクセシビリティー研修パブリック・ビューイング](https://freee.connpass.com/event/244031/)

## Axe Con

2022 年 3 月、デジタル領域のアクセシビリティをテーマに、[Deque Systems, Inc.](https://deque.com/) 主催の下執り行われた。

[Chrome のライブキャプション機能](https://blog.google/products/chrome/live-caption-chrome/) を有効にして動画を再生できる点は、さすがアクセシビリティを大いに考慮したカンファレンスであるという印象を持った。

### The Future of the Web and Accessibility

[セッション詳細](https://www.deque.com/axe-con/sessions/opening-keynote/)

歴史から始まり、最近流行りの XR やメタバースを含む新たな Web 体験におけるアクセシビリティの重要性について触れられた。

- 特定の障害への配慮を強化
- XR やメタバースを含む新たな Web 体験への対応
- アクセシビリティ技術のフレームワーク全レベルに対応したガイドラインを提供

また WCAG 3.0 への言及もあった。

W3C はこの [開発目標](https://www.w3.org/TR/wcag-3.0/#:~:text=1.3-,Goals%20and%20Requirements,-The%20goal%20of) に下記を採用している。

> Web、ePub、PDF、アプリケーション、モバイルアプリ、その他の新しい技術を含むデジタル製品を、障害者にとってよりアクセスしやすく、使いやすいものにする

なお 2021 年 1 月に作業草案となり、最新版は 2021 年 12 月 7 日に公開された。最終的に 2023 年以前に最終版が発行されることはないと思われる。

詳細は、下記 Github issue をご確認いただきければ幸いです。

https://github.com/w3c/silver/issues

### The State of Accessibility Report Findings

[セッション詳細](https://www.deque.com/axe-con/sessions/the-state-of-accessibility-report-findings/)

ウェブサイトや代表的なモバイルアプリ (有償、無償、各 20 ずつ) を対象に [最新の調査 (pdf)](https://pages.diamond.la/hubfs/SOAR%20/SOAR%202021/FINAL%20DOCUMENTS/2021%20Diamond%20State%20of%20Accessibility%20Report.pdf) でアクセシビリティの傾向をまとめている。

### Making Content Usable for People with Cognitive and Learning Disabilities

[セッション詳細](https://www.deque.com/axe-con/sessions/making-content-usable-for-people-with-cognitive-and-learning-disabilities/)

下記のように定量的な根拠で示しつつ、スコープとなる機能的なニーズ (注意障害、言語障害、学習障害、記憶障害、実行機能障害) を整理。

それらを下に、具体的な留意事項について俯瞰した内容を中心に触れられた。

- [米国の総人口の 12 ％が認知的な障害を持っている](https://dhds.cdc.gov/SP?LocationId=59&CategoryId=DISEST&ShowFootnotes=true&showMode=&IndicatorIds=STATTYPE,AGEIND,SEXIND,RACEIND,VETIND&pnl0=Chart,false,YR4,CAT1,BO1,,,,AGEADJPREV&pnl1=Chart,false,YR4,DISSTAT,,,,,PREV&pnl2=Chart,false,YR4,DISSTAT,,,,,AGEADJPREV&pnl3=Chart,false,YR4,DISSTAT,,,,,AGEADJPREV&pnl4=Chart,false,YR4,DISSTAT,,,,,AGEADJPREV)
- [世界の総人口の 1/6 が 2050 年までに 65 歳を超える](https://www.un.org/en/global-issues/ageing)
- [10-20 ％の人がディスレクシアの兆候を示す](http://dyslexia.yale.edu/dyslexia/what-is-dyslexia/)
- [100 人に 1 人以上が自閉症児である](https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders)

### Removing Bias with Wizard of Oz Screen Reader Usability Testing

[セッション詳細](https://www.deque.com/axe-con/sessions/removing-bias-with-wizard-of-oz-screen-reader-usability-testing/)

スクリーンリーダーにおける利用を想定した Web サイトのプロトタイピングで、「オズの魔法使い」を実施した事例紹介を中心に触れられた。

### Scoring the Accessibility of Websites

[セッション詳細](https://www.deque.com/axe-con/sessions/scoring-the-accessibility-of-websites/)

米国の非営利団体 Web AIM が開発した Web アクセシビリティのスコア化手法「AIM (Accessibility IMpact)」の紹介を中心に触れられた。

## 100 万のホームページに対するアクセシビリティ自動検証

全体的なエラー件数は、昨年とほぼ変わらない水準だったようです。また 96.8 ％のホームページで、何らかの WCAG への不適合が検出されている。

なお、当該記事では下記観点を中心に触れられている。

- テキストのコントラスト
- 画像および代替テキスト
- フォーム入力要素のラベル
  - `<label>` 要素や `aria-label` 属性、 `aria-labelledby` 属性の多用
- 適切な見出し
  - 複数の `<h1>`
- 適切なランドマーク
  - `main` 要素や `role="main"` 属性の多用
- 不適切な ARIA 属性
- 曖昧なリンクラベル

いま一度、見直しておきたい。

## freee アクセシビリティー研修パブリック・ビューイング

4 月 28 日に開催予定。
