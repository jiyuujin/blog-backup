---
date: 2019-06-10
title: KANSAI.TS 初開催です
description: 令和明けてふと個人的にやりたいと思ったことをまた一つ実現しました。今後 TypeScriptでもゆるふわ交流できれば、と考えております。
slug: enter-the-kansai-ts-1-in-osaka
category: 
tags: 
 - TypeScript
 - AWS
 - Review
---

## 関西で、いいえ日本で初開催でした！

東京でも来週に開催、抽選倍率が大変なことになっていますが、奇しくも東京より先んじて開催することになっていました。 5/3のもくもく会の中でふと、私自身がやりたいと言った 3日後に今回のイベントページを公開する運びとなっています。またイベントページを公開したタイミングで参加枠、LT枠共に埋まり、キャンセルも中々出ない状況は驚きました。

![kansai-ts-group](//images.ctfassets.net/gzkue3szf85p/2GtlbqVaR9usT7ZJ0tMidq/29b3d0cf4a1e472a574c89ac3ad99b15/kansai-ts-group.png)

LT枠に空きが出たら私も喋りたいなと思いましたが、今回はその必要が無かったようです。。汗

### GVH Osaka (グローバルベンチャーハビタット大阪) にて、

無事初回を終えることができました👏

![gvh-osaka](//images.ctfassets.net/gzkue3szf85p/48cMBz6rYYv7PbFcYtO3rf/32c3b027318258708ea8e719ae4ab6e1/gvh-osaka.png)

セッション終わりに、記念撮影もさせていただきました！

![kansai-ts-1](//images.ctfassets.net/gzkue3szf85p/3gWcCrGWIubwdni3HKRHNF/ec31791d917875a0b674f4f09a820724/kansai-ts-1.png)

※ ちなみに GVH Osakaで何らかのイベントを開催・共催したい場合は以下よりできますので良ければご利用ください。

<a class="link-preview" href="https://docs.google.com/forms/d/e/1FAIpQLSeHMSQNITHlffLMcO6yeg86xLYo-6Z6QlKVExyGlnQoFMeWgw/viewform">イベント依頼フォーム</a>

## Advanced built-in types

関西 Node学園オーガナイザ [@shisama](https://twitter.com/shisama) さんの登壇、色々な型定義のご紹介がありました。 readonlyは認識していましたが、まだまだこれからと言った型定義もあり、深く見ていく必要がありそうです。

- Partial
- Required
- ReadOnly
- Pick
- Record
- Exclude
- Extract
- NonNullable
- Parameters

<a class="link-preview" href="https://speakerdeck.com/masashi/number-kansaits-1">Advanced built-in types</a>

## AWS CDK for TypeScriptを紹介するぜ

KYOSO株式会社 [@is_ryo](https://twitter.com/is_ryo)さんの登壇、構成管理で Cloud Formationのテンプレートを生成できる AWS-CDKを TypeScriptで書く話。この AWS-CDKを使う上であくまで　public betaでありプロダクションとして使うには時期尚早であること、突然の仕様変更がありうるためアップデートには気をつけて使う必要がありそうですね。

<a class="link-preview" href="https://master.d1r9qwzhk27es2.amplifyapp.com/">AWS CDK for TypeScriptを紹介するぜ</a>

## ざっくり AssemblyScript

[丸末 皓太 (@mrsekut)](https://twitter.com/mrsekut)さんの登壇、フロント・バック共に TypeScriptで実現できる AssemblyScriptについて。一部 Rustより速かったり、 Cよりファイルサイズが小さく済んだりするらしいですが、基本的にビルドすると .tsから .wat/.wasmを生成する仕組みで動作。 [サンプル](https://github.com/mrsekut/simple-assemblyscript-sample)を作っているそうなので少し参考にさせていただきたいと思います。

<a class="link-preview" href="https://scrapbox.io/mrsekut-p/%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8AAssemblyScript">ざっくり AssemblyScript</a>

## Alexaスキル開発で始めるTypeScript

株式会社デジタルキューブ Hide Okamotoさんの登壇、 Alexaスキル開発を TypeScriptで始める話。 gulpfileなどタスクランナーを除いてほぼ 100% TypeScript製のフレームワークであること、 Input/Outputで型の恩恵を受けられる。音声から文字を認識、 Lambdaで JSONを受け取って JSONを返す仕組みも単純明快な印象。設計周りは [ask-sdkの設計を覗き見る
](https://qiita.com/shinichi-takahashi/items/7191d3d393e08b2746f0)を見ると良さそう。

<a class="link-preview" href="https://speakerdeck.com/hideokamoto/kansaits01">Alexaスキル開発で始めるTypeScript</a>

また来月 6-7日に スキルアワード2019 ハッカソンがさくらインターネット株式会社 大阪本社にてあるので、興味ある方は是非！

<a class="link-preview" href="https://amazonalexadeveloper2019vol3.splashthat.com/">スキルアワード2019 ハッカソン</a>

## Cognitive Complexityでコードの複雑さを定量的に計測しよう

[@s2terminal](https://twitter.com/s2terminal)さんの登壇、 [Code climate](https://codeclimate.com/)で定量的に計測できる話。ネストが深かければ深いほど人間にとって理解することは難しいレベル、この観点を Cognitive Complexityと呼ぶことは初めて知りました。

Dockerで動作する [サンプル](https://github.com/s2terminal/cognitive-complexity-example )を作ったそうで `docker-compose run --rm analyze` コマンドを叩くことで簡単に計測できるので一度試してみようと思います！

<a class="link-preview" href="https://www.slideshare.net/ShutoSuzuki/cognitive-complexity-149117241">Cognitive Complexityでコードの複雑さを定量的に計測しよう</a>

## 【VSCode Remote】10秒でNuxt環境を構築【脱WebStorm】

[@salamander_jp](https://twitter.com/salamander_jp)さんの登壇、VSCodeの拡張機能について。指定の vscode-remote-try-nuxtリポジトリをクローンし VSCodeを開くと、 [Reopen in Container]をクリックすることでコンテナ内で開発できるようになります。ところが先日の v-kansai #6 同様デモでコケると。。 成功時の動画を事前に撮影した方が良かったかもしれませんね。

<a class="link-preview" href="https://qiita.com/relu/items/defde8de8c4d21af662f">VSCode Remote】10秒でNuxt環境を構築【脱WebStorm】</a>

## TypeScirptでAPIの受け入れテストを記述

株式会社chatbox 代表取締役 [後藤知宏 (@mikakane)](https://twitter.com/_mikakane)さんの登壇、 REST APIを使う場面で TypeScriptを部分的に導入した話について。 TypeScriptを導入するには一から型定義する必要があるため、デザイナーが多いプロジェクトなどでは導入コストが高くなってしまう。とはいえ実行時に型チェックしてくれないが、せめて REST APIでの型チェックは厳格に管理しておきたい。こうした限定場面で [io-ts](https://github.com/gcanti/io-ts)を使うと良いかもしれません、一度試してみようかと思いました。

## 最後に、

次回 kansai.ts #2 は 9月上旬開催予定 (7月上旬にイベントページを公開・募集開始予定) 参加枠、LT枠共に今回よりも増やして準備していますので、是非ご気軽に参加いただければ幸いです。

また kansai.ts用のコミュニティを discordで作りました (どんな感じで進めるかは全く想定外ですが)

<a class="link-preview" href="https://discord.gg/AJPs2Uh">kansai.ts discord</a>
