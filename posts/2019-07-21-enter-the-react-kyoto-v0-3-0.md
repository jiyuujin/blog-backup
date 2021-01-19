---
date: 2019-07-21
title: React.kyoto v0.3.0を開催しました
description: 京都とついてるけど大阪で久々にやる！ 、をモットーに 2年ぶり開催となりました。
slug: enter-the-react-kyoto-v0-3-0
category: 
tags: 
 - React
 - Review
 - Storybook
 - TypeScript
---

## 2年も空いて久々！

当初私自身が立ち上げた訳ではなく、2年ほどブランクが空いていることもあり、比較的集客しやすい大阪に変更。大阪 なんばにある ITプロパートナーズさんにて開催する運びとなりました。

![itpro-namba](//images.ctfassets.net/gzkue3szf85p/4Bk32GHrXjr7He0K1eTB6/ec6a815d8568012083206088dec684f4/itpro.png)

今回 2度ほど増枠させていただいてますが、結果的に 40名近くご参加いただき満員御礼でした。

登壇枠ももっと集まるとなお、といったところですが。。😅

### React 16.x Roadmap

たかが 2年と言いたいところですが React v16.0台になり、色々変わりました。今後も気になる機能がリリース予定、詳しくは以下公式ロードマップをご確認ください。

<a class="link-preview" href="https://ja.reactjs.org/blog/2018/11/27/react-16-roadmap.html">React 16.x Roadmap</a>

## 今回の登壇の数々

### ReactとDOMイベント

HAL大阪　船岡之晟さんから、 Reactでよく見る `onClick () => { }` イベントについて。一般的な JSで見るイベントと機構が実際は違う。合成イベント (Synthetic Event)という React独自のイベント機構のようですね。

<a class="link-preview" href="https://ja.reactjs.org/docs/events.html">合成イベント (Synthetic Event)</a>

<a class="link-preview" href="https://docs.google.com/presentation/d/1bLvV1ykK2bqReA8dlqSsEqYHzdvHyrl-5loM5JptMMI/edit">ReactとDOMイベント</a>

もう一つオマケと題し以下サンプルプロジェクトを通して、なぜ `useEffect` がた変更を検知できないか。これに対しては `useLayoutEffect` を使って同期通信に対応すること、あとは色々頑張るしかなさそうという話でした。

<a class="link-preview" href="https://codesandbox.io/s/react-useeffect-chat-example-sjcq5">Code Sandbox</a>

### unstated-next による Redux に頼らない状態管理の考察

続いて Ubie株式会社 神保嘉秀さんから、ファイルサイズが小さい点、コンテナという概念を利用していることと聞き大変分かり易かったです。コンテナの粒度を小さくし過ぎると煩雑に、かえって大きくし過ぎると reduxが抱える課題に再び直面。素の Reactでやるか、 reduxでやるかの違いかと私は思った訳ですが、結果的には設計次第といったように思います。

また書き換えの頻発する stateを対象に部分移行してみては、といった所感も出ましたが一度試してみようと思います。

<a class="link-preview" href="https://github.com/jamiebuilds/unstated-next">unstated-next</a>

<a class="link-preview" href="https://speakerdeck.com/jmblog/unstated-next-niyoru-redux-nilai-ranaizhuang-tai-guan-li-falsekao-cha">unstated-next による Redux に頼らない状態管理の考察</a>

### Learning Hooks

サイボウズ株式会社 [Taiki Nishi (Nokogiri / @nkgrnkgr)](https://twitter.com/nkgrnkgr) さんから、 React v16.8よりリリースされた Hooks APIについて。 `useState` や `useEffect` など、普段使っている方なら新鮮味は無いかもしれません。  Recomposeに頼らなくても Hooksを使えるようになったのも非常に大きいことを感じる今日この頃です。

<a class="link-preview" href="https://speakerdeck.com/undefined_name/learning-hooks">Learning-Hooks</a>

### 腐らないUIテストのためのStorybook + Storyshots

最後に 関西 Node学園オーガナイザ [@shisama](https://twitter.com/shisama) さんから。Reactとは直接関係は無かったですが Storybookとそれに伴う UIテストについて。ちなみに [@storybook/cli](https://www.npmjs.com/package/@storybook/cli)、何気に初めて知った存在でした。 Storybook上にアドオンの一つとして [@storybook/addon-storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots)を追加、 Jestにも組み込めるためテストの自動化も実現してくれます。

<a class="link-preview" href="https://speakerdeck.com/masashi/number-react-kyoto-v0-dot-3-0">腐らないUIテストのためのStorybook + Storyshots</a>

あと、私ですが急遽当日の午前中に登壇することを決めたものの、思ったように登壇スライドの作成に時間を取れずブログ公開 (下記参照してください) のみとさせていただきました。

次回の関西 Node学園 #7 にも参加させていただく予定ですので、その際はしっかりと喋らせてもらおうと思います。笑

<a class="link-preview" href="https://webneko.dev/posts/the-react-applications-in-serverless-architecture">Reactで始めるサーバレス</a>

<a class="link-preview" href="https://nodejs.connpass.com/event/137950/">関西 Node学園 #7</a>

## 最後に、

次回の開催は未定です。好評であれば 2-3か月後にまたやりましょう！

どちらにせよ、さすがにまた 2年空けることはしません🙅‍♀️ 

