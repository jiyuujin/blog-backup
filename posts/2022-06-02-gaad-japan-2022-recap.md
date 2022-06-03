---
date: 2022-06-02
title: GAAD Japan 2022 Recap
description: 5 月第 3 木曜日の「世界的な」アクセシビリティを考える日を始め、アクセシビリティの祭典や TechFeed Conference など多くの知見が 5 月に発表されたので、その記録をば。
slug: gaad-japan-2022-recap
reaction: 🎧
category: Scrap
tags: 
 - A11Y
---

5 月はアクセシビリティ周辺の知見が多く (下記参照) 発表、中でも特に第 3 木曜日は毎年「世界的な」アクセシビリティを考える日として定められている。

- TechFeed Conference 2022
   - [WCAG 2.2で追加される達成基準](https://www.slideshare.net/mlca11y/wcag-22-251780511)
- Google I/O 2022
   - [Full accessibility tree in Chrome DevTools](https://developer.chrome.com/blog/full-accessibility-tree/)
- アクセシビリティを考える日
   - GAAD Japan 2022
- アクセシビリティの祭典 2022

## アクセシビリティを考える日

GAAD Japan 主催の下、今年もオンライン形式で開催されている。

https://accessibility.day/%E6%97%A5%E6%9C%AC%E8%AA%9E/

さすがと言わんばかりのものが字幕だ。

全てのセッションに字幕 ([UDTalk](https://udtalk.jp/gaadjp2022/)) が付けられ、配信されている。

https://udtalk.jp/gaadjp2022/

音を出さなくても、内容が分かるというのは望ましいところ。

### 法的制約

直接アクセシビリティと書いていないものの、このニュースは明白です。

[障害のある人が情報得やすくする法律 衆院本会議で可決・成立](https://www3.nhk.or.jp/news/html/20220519/k10013633191000.html)

いよいよ、日本国内でも法的制約を理由付けに啓発が進められるのではと考えられる。

アクセシビリティに対する考え方を先んじて認識するきっかけのひとつこそ、昨年 2021 年の GAAD Japan などでも例の上がった、ドミノ・ピザ社の訴訟事例です。

::: message is-primary

視覚障がいの男性がウェブサイトやアプリのアクセシビリティが不十分でメニューを注文できなかったことが ADA 法違反として訴えた裁判が起き、男性が勝訴している。

[米最高裁でドミノ・ピザが視覚障がい者に敗訴、知らなかったら済まされない企業ウェブ・アプリのアクセシビリティの必要性](https://mbit.co.jp/mag/column/36306)

:::

アメリカでは、全体の訴訟件数の 6 割が ADA 法違反です。

アメリカにおける ADA 法違反の訴訟件数。
- 2020 年 3550 件
- 2021 年 4500 件を超える予想

そもそもこの ADA 法を制定したきっかけとして、ワシントン D.C. にある政府機関へのアクセスが不便だったことが挙げられる。

実際に車椅子利用者たちが車椅子を使わずに階段を上るという身をもって抗議したところより起因していると言われている。

この手のアクセシビリティ訴訟も理由付けとして、より一層啓発が進むのではと見受けられる次第。

- 定期的なアクセシビリティチェック
- 社内で技術サポートできる体制
- 全体的なウェブサイトのあり方の見直し

あと私自身が実践できていないのは情報発信です。最近でこそプロジェクト内に対しオフィスアワーで実施することを定例化したが、それも外向けにはできていないのが現状です。

またアクセシビリティ関連のデモ作成と、それに伴う「外部への」発信も主体的に行っていきたい。

### 企業活動

余談で Apple のウェブサイトにも、アクセシビリティのセクションが入ったそうです。

[アクセシビリティ - Apple (日本)](https://www.apple.com/jp/accessibility/)

## アクセシビリティツリーとは

セッションについて共有する前に、アクセシビリティツリーを是非ともチェックしておきたい。

GAAD 2022 に限らず Google I/O 2022 や TFCon 2022 でも触れられた。

- [プレビュー機能: フルページアクセシビリティツリー](https://developer.chrome.com/ja/blog/new-in-devtools-98/#a11y-tree)
- [アクセシビリティツリーを読む](https://docs.google.com/presentation/d/1pj1azprtCUM9b1tLWEO82wqHuX9lYOoacROfmbzRTmY/edit#slide=id.g129f6bb0506_2_32)

[アクセシビリティツリー](https://developer.mozilla.org/ja/docs/Glossary/Accessibility_tree) とはユーザエージェント（ブラウザ）が HTML/CSS をパースして、レンダーツリーを生成するのと同様に、支援技術に対して提供する API です。

なお、その仕様は [AOM](https://github.com/WICG/aom) によって策定されている。

::: is-primary

[登壇](https://docs.google.com/presentation/d/19oRSGdHoHaGgdMVy7BT2rg8XINRnDWmWUv8Yp66bd4E/edit?usp=sharing) では、簡単な [デモ](https://codepen.io/jiyuujin/pen/gOrvJwO) を通して解説させていただく。

https://docs.google.com/presentation/d/19oRSGdHoHaGgdMVy7BT2rg8XINRnDWmWUv8Yp66bd4E/edit?usp=sharing

:::

### 印象に残ったセッションについて

それでは、ここで本題に入らせていただく。

どのセッションも印象に残ったが、掻い摘んで書くと下記の通りだ。

- note や kintone、クラウドワークスの取り組み
- 伊原さん ([@magi1125](https://twitter.com/magi1125)) の良いパターン・アンチパターン
- [axe-core](https://github.com/dequelabs/axe-core) を利用した自動テスト
    - 昨年も同じ axe-core を利用した自動テストについて [発表](https://docs.google.com/presentation/d/1PPMrT7djg4pP7No_Jzj2h9PSSb4ZfmatC9GgNjm2YxI/edit?usp=sharing)  / [ブログ](https://accessible-usable.net/2021/05/entry_210527.html) があった

#### エンジニア視点

技術発信（特に外向けを中心に）を始め、座学より体験を重視する。

- freee の 研修動画 と合わせ、トレーニングページを見る
- OS のアクセシビリティ設定を触る

#### プロダクト視点

プロジェクトの進め方によって、様々な選択肢があるので、適切なものを選びたい。

- オーナーの明示
- ミッションの言語化
    - freee は「誰もが自由に経営できる統合型経営プラットフォーム」
    - note は「誰もが創作をはじめ続けられるようにする」
    - クラウドワークスは「世界で最もたくさんの人に報酬を届ける会社になる」
- コアの定義
    - 社外 PR を念頭に、改修の観点を絞る

## 話題の本の紹介

今年春に出版された話題の [HTML解体新書](https://www.amazon.co.jp/HTML解体新書-仕様から紐解く本格入門-太田-良典/dp/4862465277) を下に話されたのもひとつ大きかった。

## 事例を知る、現状を認識する

こういう類の情報で「無知」という状態は怖い存在です。

アクセシビリティの祭典 2022 で知ることができ、今後の活動に変化が生まれると幸いです。

- 日本の点字ブロックを参考に生まれた NaviLens
- [ハッタツソン](https://fes.hattatuson.com) で生まれたプロジェクトの紹介動画
   - 誰もが働きやすい環境を作るアプリ [コンダクター](https://hattatuson.com/projects/conductor)
   - 休憩支援アプリ [リッスル](https://hattatuson.com/projects/lissle)

## 資料一覧

登壇スライドを始め、参照する資料を列挙している。

### GAAD 2022

GAAD Japan 2022 の資料一覧です。

- [Web アクセシビリティのイントロダクション・ムービーを公開](https://www.kao.com/jp/corporate/news/business-finance/2022/20220519-002/)
- [サイバーエージェントのアクセシビリティ向上の取り組み紹介と、Next Experts (アクセシビリティ) としての所信表明](https://docs.google.com/presentation/d/1bcWJVRTJRfQ0bd4iNZW1pB1XsqFsk_F90ZgxKTygQ70/edit?usp=sharing)
- [2021 年、サイバーエージェントのアクセシビリティを振り返る](https://developers.cyberagent.co.jp/blog/archives/33931/)
- [HTML と Web アクセシビリティを見つめなおす ​ ― HTML 解体新書 発売に ​ よせて](https://www.docswell.com/s/momdo/54MX1Z-20220519)
- [クラウドワークスのこれまでの取り組み、新たなミッションと考えるこれからについて](https://docs.google.com/presentation/d/1o4OH7a2mNvzTBvTP88tswxb4mNuRW2PjKLphKm43ChU/edit?usp=sharing)
- クラウドワークス [アクセシビリティを向上していくために出来ることから進めていく活動](https://note.com/earlgray_mk/n/n159046bd58e7)
- クラウドワークス [あなたのその資料、色を変えるともっと伝わるかも。](https://note.com/earlgray_mk/n/n83ef87b183cc)
- クラウドワークス [アクセシビリティ啓蒙活動は旗を振り続ければいつのまにか誰かが付いてきてくれる。](https://medium.com/@earlgraymk/アクセシビリティ啓蒙活動は旗を振り続ければいつのまにか誰かが付いてきてくれる-ed4c5ed5db06)
- [axe-core で楽々アクセシビリティチェック](https://www.docswell.com/s/ydnjp/ZG6PMK-2022-05-12-193320) (GAAD 2022)
- [あなたのウェブサイトのアクセシビリティ、一括自動テストしてみませんか?](https://docs.google.com/presentation/d/1PPMrT7djg4pP7No_Jzj2h9PSSb4ZfmatC9GgNjm2YxI/edit?usp=sharing) (GAAD 2021)
- [「職能の越境」でアクセシビリティが加速する](https://docs.google.com/presentation/d/1fz1637rymBjb0ym0CfYFtT7N0KXMsa_BL-n3RXzYBtQ/edit#slide=id.g12c9278a8cc_2_55)
- [note アクセシビリティ施策](https://note.com/info/m/mb0ecfac0e3ed)
- [ユーザーと一緒に進めるアクセシビリティ](https://docs.google.com/presentation/d/1Uayti5omG2z7DOKfJFWxws3-jp-lX1_2YHSZEh7DlCo/edit#slide=id.g11b1bbf5e00_2_286)
- [note アクセシビリティ施策](https://note.com/info/m/mb0ecfac0e3ed)
- [GAAD 2022 自社サービスのアクセシビリティ向上、良いパターンとアンチパターン](https://docs.google.com/presentation/d/1kWDcqV4H0Vefs6Pj35TH6Nrc-50nnRbZdp6b9qOJIms/edit?usp=sharing)

### アクセシビリティの祭典 2022

現時点で分かっている資料に限って、更新させていただいた。

- [ウェブはすべての人が使えるべきもの ～障碍者の力でアクセシビリティ改善～](https://www.docswell.com/s/ydnjp/K17N7K-2022-05-12-192201)

## 参照動画

アーカイヴ動画一覧です。

### GAAD Japan 2022 動画一覧

分かり次第更新させていただく予定です。

### GAAD Japan 2021 動画一覧

GAAD Japan 2021 のアーカイヴ動画一覧です。

- [オープニング](https://www.youtube.com/watch?v=8wWr6aguKNc)
- [北米のアクセシビリティ最前線](https://www.youtube.com/watch?v=mLGXt17lpqk)
- [スクリーンリーダーは怖くない！ NVDA & VoiceOver 10の基本テクニック](https://www.youtube.com/watch?v=BlrqBNfnwwc)
- [誰もがウェブサイトを持つために…ウェブサイトビルダーができること](https://www.youtube.com/watch?v=1LCb-7ju3_U)
- [あらゆる人がゲームを楽しめる世界を目指す Xbox の取り組み](https://www.youtube.com/watch?v=ZrXoMTUnBlU)
- [辻ちゃん・ウエちゃんのAccessiブルGoGo!「このタグはこんな風に聞こえる」の巻](https://www.youtube.com/watch?v=UfyTMGGEIW8)
- [チームで取り組む！ サイボウズのアクセシビリティ ～開発プロセスにアクセシビリティをインクルードする～](https://www.youtube.com/watch?v=4yJ0nMK4Bg)
- [ジンドゥー AIビルダーで作るアクセシブルなサイト](https://www.youtube.com/watch?v=ikPdDoEvXCY)
- [アクセシブルなUIライブラリがアクセシブルなサービスを作る SmartHR UIのアクセシビリティ向上事例](https://www.youtube.com/watch?v=hyuQ3SUEfgc)
- [チームで取り組む！サイボウズのアクセシビリティ](https://www.youtube.com/watch?v=ot9AChBA2H0)
- [エンディング](https://www.youtube.com/watch?v=qJpj5D4Bekc)
- [もう難しいなんて言わせない！ 受託でも絶対に取り組めるアクセシビリティ](https://www.youtube.com/watch?v=Rc5lWJlp0XQ)
- [あなたのウェブサイトのアクセシビリティ、一括自動テストしてみませんか？ Puppeteer で『axe』を実行するお手軽スクリプトのご紹介](https://www.youtube.com/watch?v=PgQbHQZ6zfE)
