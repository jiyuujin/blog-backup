---
date: 2021-12-17
title: Gatsby 3 に更新する
description: この記事は React Advent Calendar 2021 の 18 日目の記事です。今年春にリリースされた Gatsby 3 について書かせていただいた。
slug: gatsby-3-updates
reaction: 🧔🏻
category: Front
tags: 
 - Gatsby
 - React
 - Advent-Calendar
---

今年春 Gatsby 3 がリリースされた。

[v3 Release Notes](https://www.gatsbyjs.com/docs/reference/release-notes/v3.0/)

Gatsby 公式より Gatsby 3 を解説する記事も出ている。

[Introducing Gatsby 3.0 – Faster in Every Way that Matters](https://www.gatsbyjs.com/blog/gatsby-v3/)

主な内容は下記の通りです。

- GraphQL 15 support
- React 17 support
- Webpack 5 support

これ以外にあとパフォーマンス向上も入っている。

GraphQL 15 や Webpack 5 など、細かい話は今回割愛させていただく。

また React 17 について、来週の React Advent Calendar 23 日目で書かせていただく予定です。

## とある Gatsby プロジェクトの話

これは私自身のプロフィールサイトの話です。

[@preview](https://yuma-kitamura.nekohack.me/)

Gatsby プラグインを v3.0 系に更新するのと同時に、周辺のプラグインも合わせ v3.0 系に更新する。

```json
{
  "dependencies": {
    "gatsby": "3.14.6",
    "gatsby-plugin-google-analytics": "3.14.0",
    "gatsby-plugin-manifest": "3.14.0",
    "gatsby-plugin-react-intl": "3.0.2",
    "gatsby-plugin-sass": "4.14.0",
    "gatsby-plugin-sharp": "3.14.3",
    "gatsby-plugin-typescript": "3.14.0",
    "gatsby-source-filesystem": "3.14.0",
    "gatsby-transformer-sharp": "3.14.0",
    "gatsby-transformer-yaml": "3.14.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
  },
  "devDependencies": {
    "@types/react": "17.0.37",
    "@types/react-dom": "17.0.11",
  }
}
```

結論を言うとこのアップデートをもって `gatsby develop` の挙動確認を取れた。

これでも上手く挙動確認を取れない場合は node_modules や .cache を削除して実行すると良い。

しかし、もう少し注意したいことがある。

- 新たな gatsby-plugin-image に変更する
- gatsby-transform-sharp をインストールする
- CSS Modules を ES Modules としてインポートする

### 新たな gatsby-plugin-image に変更する

gatsby-image を使っていると下記エラーを吐き出すので注意して欲しい。

```bash
warn [gatsby-transformer-sharp] The "fixed" and "fluid" resolvers are now deprecated. Switch to
"gatsby-plugin-image" for better performance and a simpler API. See https://gatsby.dev/migrate-images
 to learn how.
```

gatsby-plugin-image をインストールする必要がある。

```bash
npm i gatsby-plugin-image

yarn add gatsby-plugin-image
```

リリースノート等でも言及されていた新しい Gatsby Image です。

### gatsby-transform-sharp をインストールする

あまり見覚えの無いエラーを吐き出したら注意して欲しい。

```bash
Cannot find module '../build/Release/sharp.node'
```

もとは Gatsby 2 で Sharp を使用しなくても挙動確認を取れていた。

しかし、この度 Gatsby 3 に更新すると gatsby-transformer-sharp をインストールする必要がある。

```bash
npm i gatsby-transformer-sharp

yarn add gatsby-transformer-sharp
```

これで無事に解決する。

### CSS Modules を ES Modules としてインポートする

それまで CSS Modules を使う際 styles でインポートしていたものを個別でインポートする必要がある。既存の変数名に被りが出てしまい、その辺りの微調整は少し不便に感じた。

## 最後に

これをもって localhost で挙動確認して問題が無いことを確認できた。

現在は Gatsby 4 もリリースされている。

[v4 Release Notes](https://www.gatsbyjs.com/docs/reference/release-notes/v4.0/)

主な内容は下記の通り、ビルド周りの変更が多いようです。

- Deferred Static Generation (DSG)
- Server-Side Rendering (SSR)

ただし、国際化対応で使用されることの多い [React Intl](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-intl/) が、現時点で Gatsby 4 に対応していない。

暫くは Gatsby 4 対応を待ちたい。
