---
date: 2019-09-08
title: KANSAI.TS 2 を開催しました
description: この度、前回以上に大LT大会の様相となった kansai.ts 第2弾 のリポートです。
slug: enter-the-kansai-ts-2-in-osaka
category: 
tags: 
 - TypeScript
 - Review
 - AWS
 - Vue
---

## 参加率 90.19% 😳

今回イベント開始前に出欠を取らせていただきました。基本的に v-kansai 等では取っていない出欠ですが、参加率が定量的な数値として目に見えるのは良いことですね。

![kansai-ts-2-applicants](//images.ctfassets.net/gzkue3szf85p/6coh26SzPlYwsCzcvLZEq2/cf7916a483b5541923fcf939f4b2bf60/kansai-ts-2-list.png)

今回も前回と同様に LT 8枠を公募、イベントページ公開と同時にLT枠が埋まる盛況ぶり。調子に乗って 10枠に引き上げるも、当日に飛び込みが生まれ前回以上に大LT大会の様相に！

前回に続いて私の登壇する幕はありませんでしたが、どこかで機会があればと思います。

![kansai-ts-2](//images.ctfassets.net/gzkue3szf85p/4TgRlYshovws33vwN9S4Tj/a2924a08163eb58f989363dc0fdad400/kansai-ts-2.png)

また先月の v-kansai に引き続き司会を [@is_ryo](https://twitter.com/is_ryo) さんに任せています😀

## 各登壇を順に、

### Composition API TypeScriptはVue.jsの夢を見るか？

[Daiki Kojima (@Daikids2)](https://twitter.com/Daikids2) さんからVueとTSを何を使って書くのか。デコレータなど、色々存在する中で Composition API が型推論に優しいことを理由の一つにオススメかも、と言う話でした。

(資料公開をお待ちください)

### ざっくりLSP

[丸末 皓太 (@mrsekut)](https://twitter.com/mrsekut) さんから、エディタ上で変数名を変えてくれたり影ながら動いてる Language Server と言う存在について。今すぐに活かせられるという訳では無いものの、奥の深い世界を感じ取ることができました。

<a class="link-preview" href="https://scrapbox.io/mrsekut-p/%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8ALSP">ざっくりLSP</a>

### C#erがTypeScriptでフロントエンドに挑戦している話

普段C#を書いてるという [@masanori_msl](https://twitter.com/masanori_msl) さんから、TSを使ってみてどうなのか。C#より柔らかい型でTS独自の仕様も少ないのは魅力的。ただし良くも悪くもJavascriptが兄弟関係にあって思わぬところでハマったそうです。

<a class="link-preview" href="https://speakerdeck.com/masui_masanori/c-number-ergatypescriptdehurontoendonitiao-zhan-siteiruhua">C#erがTypeScriptでフロントエンドに挑戦している話</a>

### 🎉 祝! GA! 🎉 AWSCDK for TypeScript

KYOSO株式会社 [@is_ryo](https://twitter.com/is_ryo) さんから AWSCDK をTSで書く話について。表題通り先日正式リリースされ、やらなければいけませんね (AWSを普段使う者として謎の使命感)

<a class="link-preview" href="https://docs.google.com/presentation/d/18vgUTXzcF6eofp3uLd-ZVmcaKsEYkTS-QjWQLXxCwBc/edit#slide=id.g5faa9da147_1_0">祝GA! AWSCDK for TypeScript</a>

以下サンプルリポジトリを参考にすると良さそうです。

<a class="link-preview" href="https://github.com/ryo-is/cdk-templates">ryo-is/cdk-templates</a>

### TypeScriptでCLIアプリケーション開発

[@s2terminal](https://twitter.com/s2terminal) さんから、TSを使ったCLIアプリケーション [i-read-u](https://github.com/s2terminal/i-read-u) の開発をした話を交えて。

<a class="link-preview" href="https://www.slideshare.net/ShutoSuzuki/typescriptcli">TypeScriptでCLIアプリケーション開発</a>

### GraphQLで使うデータに TypeScriptで型を定義する

METEORWORKS [@kamiyam](https://twitter.com/kamiyam) さんから `apollo cient:codegen` を使ってクエリから型定義を自動生成してくれる話。ネーミングが長過ぎると上手く行かなかったりする場合があるようです。

<a class="link-preview" href="https://speakerdeck.com/kamiyam/graphqldeshi-udetani-typescriptdexing-woding-yi-suru">GraphQLで使うデータに TypeScriptで型を定義する</a>

### VueコンポーネントをTypeScriptに置き換えた話

[@matometaru](https://twitter.com/matometaru) さんから、 [Vue Metal Grid](https://github.com/matometaru/vue-metal-grid) の開発でTSへの移行を進めている話。設計や命名等でハマったこと、色々と苦労しながらも型安全を追求している印象でした。

(資料公開をお待ちください)

### TypeScriptの型定義をPRする技術

[@ypresto](https://twitter.com/ypresto) さんから、型定義のモチベに `declare module` をまず書くこと。エディタ上で定義を追うことを私自身はやってたりしますが、丁寧にドキュメントを読み解くことが必要。また初めての登壇にしては掴みもまずまず、今後も知見を共有いただければと思います。

<a class="link-preview" href="https://speakerdeck.com/ypresto/typescriptfalsexing-ding-yi-woprsuruji-shu">TypeScriptの型定義をPRする技術</a>

### TSLint is ~~dead~~ will be deprecated

サイボウズ株式会社 [@shisama](https://twitter.com/shisama) さんから、TSLintがすっかり過去のものだという印象でしたが、 [tslint-to-eslint-config](https://www.npmjs.com/package/tslint-to-eslint-config) を使うことで設定ファイルを自動的に変換してくれるそうです。

<a class="link-preview" href="https://qiita.com/shisama/items/b3d63142797b07cb554e">tslint-to-eslint-configでtslint.jsonをeslintrcに変換する</a>

### Non-structual (Nominal) types

[Yukimasa Funaoka (@mochiya98)](https://twitter.com/mochiya98) さんから、 [Nominal types](https://typescript-jp.gitbook.io/deep-dive/main-1/nominaltyping) について。近く実装予定のようで、詳しくは以下イシューから辿っていただければ、と言ったような感じです。

<a class="link-preview" href="https://github.com/Microsoft/TypeScript/issues/202">Support some non-structural (nominal) type matching #202</a>

## 最後に、

第3弾の開催は年内 12月頃を予定、暫しお待ちいただければと思います。また 11/2 開催のフロントエンドカンファレンス関西2019ではスポンサー・登壇者絶賛募集中です！

<a class="link-preview" href="https://2019.kfug.jp/">kfug 2019</a>

このひと月後には東京開催ながらJSConfの動向も気になるところです。

<a class="link-preview" href="https://jsconf.jp/2019/">JSConf 2019</a>

これは年末まで忙しくなるぞー
