---
date: 2019-12-18
title: 改めてTSを導入するとは
description: この記事は TypeScript Advent Calendar 2019 の 17 日目の記事です。今更感の方もいるかもしれませんが、改めてTSを導入する時にこの辺りを踏まえておくと良い話を簡単にお伝えできればと思います。
slug: imasara-typescript
category: Front
tags: 
 - TypeScript
---

## はじめに

主催するミートアップでは TS 経験者が一定数いる一方で、全く経験のない方もそれなりにいらっしゃいます。

そのため今回 TS を新たに始める人に向けた話とさせていただきました。

先日 AWSCDK を使った運用を、というのを書く予定だとお伝えしましたが、それはまた後日に。

### そもそもTSを入れるとは

たわいも無いミスを防ぐため。TS を導入しないと JavaScript を使うことになるが、この JavaScript がユルい言語。

想定しない箇所で想定しない型として認識していたり、過剰に型判定を盛り込んでいたりと大幅に時間を食ってしまう傾向が高いです。

変な箇所で時間を使うなら、最初から TS を入れておけと。

という訳で、エディタや ESLint、型定義の順に掻い摘んで見ていきましょう。

## Editorの事前準備

エディタは InteliJ や VSCode を中心に見ていきます。

このとき TS を使うポイントは最低限 autoFixOnSave オプションを有効化するだけ。

### IntelliJ

当の自身は普段 IntelliJ を使っています。

まず [Preferences] - [Languages & Frameworks] - [TypeScript] からコンパイルバージョンを設定。

続いて File Watcher 機能を使う。エディタ右上に [Add watcher] が表示されるので、適宜追加すれば autoFixOnSave オプションが有効化。

これにより、ファイル保存のタイミングで自動的に Lint Fix してくれる。

続いて効率的にデバッグを行うため tsconfig.json に以下のオプションを設定しています。

```json
{
    "compilerOptions": {
        "sourceMap": true,
        "inlineSources": true
    }
}
```

他、JetBrains 系 IDE でも同様に使えるので参考になれば。

### VSCode

(恐らく多数派であろう) VSCode での設定についても触れておきます。

私も動作確認がてら使ってみたところ、圧倒的に補完が効いてくれるので (IntelliJ よりオススメですね)

それはさておき [Preferences] - [Settings] から settings.json を設定します。

```json
{
    "prettier.eslintIntegration": true,
    "editor.formatOnSave": false,
    "eslint.autoFixOnSave": true,
    "eslint.options": {
        "configFile": "./.eslintrc.js"
    },
    "eslint.validate": [
        "javascript",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ]
}
```

IntellijJ 同様、autoFixOnSave オプションを有効化。VSCode デフォルトで入っている、formatOnSave オプションを無効化しないと、ルールの競合により上手く挙動しなかったのでこちらも行うと良さそうです。

### ESLint

ルートディレクトリに .eslintrc.js を設定した上で、今年の春ごろに TSLint から移行してね、とアナウンスされました。

基本的に @typescript-eslint/eslint-plugin を使うこと。

<a class="link-preview" href="https://github.com/typescript-eslint/typescript-eslint">@typescript-eslint/eslint-plugin</a>

実際に MPA として Vue/TS を導入した事例について登壇しています。

> v-kansai #10
> [MPAとして導入のVue/TS設計を考える](https://webneko.dev/posts/in-progress-to-vue-on-cakephp)

是非こちらもご確認いただければ。

## まずはシンプルに書く

TypeScript の設定ファイル tsconfig.json を生成。ここでの npx コマンドは npm v5.2 以降使える方法、裏側で `$(npm bin)` を叩いてくれることで local にインストールせずとも実行できてしまうスグレモノ。

```bash
npx tsc --init
```

最初は tsconfig.json で設定を触らず以下のように HelloWorld.ts を作って。

```ts
const message: string = "TS";
console.log(`Hello World ${message}`);
```

該当のファイル名を引数に ts-node を叩くと。

```bash
npx ts-node HelloWorld.ts
```

「Hello World TS」と表示されたら OK。

あとは tsconfig.json で自分好み、あるいはプロジェクトに応じてルールを決定します。

### 私なりの設定をちょこっと公開

ほんの一部に過ぎませんが、下記の設定を必ず入れるようにしています。

```json
{
    "compilerOptions": {
        "strict": true,
        "strictNullChecks": true,
        "noImplicitAny": true,
        "noImplicitThis": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
```

簡単に説明すると TS を導入している以上、厳格はもちろん暗黙を禁止。

使ってないのは存在すんなよ、といった型管理を目指しましたい。

## 型定義を書く

簡単なプログラムを実行できれば、いよいよプロジェクトで使うぞと強い意気込みを持ってもらっても構いません。

個別のエンドポイントを型で管理するため、自前で型定義を書くことが多いです。

ルートディレクトリに types という名前で新たに切っておけばソースコード全体の見通しも良くなる。

Vue のプロジェクトであれば、この下に shims-vue.d.ts などのような.d.ts ファイルを設定する。

```
+
|--- types
|  |--- shims-vue.d.ts
|  |--- ***.d.ts
```

TS で書かれているライブラリを使う時はそこまでシビアにならず済みますが、必ずしも甘い世界ではありません。適宜 `@types/***` っていうプラグインを提供していればそれをインストールする必要があります。

たとえば@types/node をインストールする場合 tsconfig.json の types に node を追加します。

```json
{
    "compilerOptions": {
        "types": [
            "node"
        ]
    }
}
```

また自前で型定義を書かないといけない時があって、ここから先はより深くなっていくのでここで。

## 最後に

ちょうど 1 年前の記事ですが、各種型について詳細に書かれています。

基本的に大幅な変更等は無くこちらもチェックいただければ。

<a class="link-preview" href="https://qiita.com/yuya_presto/items/f625da7b1a4d21c6ce7a#文法">次に JS ガッツリ書くときは TypeScript で #文法</a>

またこの秋に出た TS3.7 では Swift/Kotlin でお馴染みの Optional Chaining を始め、いくつか新しい機能が使えるようになっています。

TS 導入者の半数以上が常に最新バージョンを使っているアンケートも存在するので、置いてかれないようにキャッチアップしていきましょう。

<a class="link-preview" href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html">TS3.7</a>

### Optional Chaining

foo が null または undefined じゃない場合にのみ foo.bar.baz() を実行する。

```ts
let x = (foo === null || foo === undefined) ?
    undefined :
    foo.bar.baz();

// equivalent
let x = foo?.bar.baz();
```

### Nullish Coalescing

foo が null または undefined でなければ foo を代入する。

foo が null または undefined であれば bar() を実行する。

```ts
let x = (foo !== null && foo !== undefined) ?
    foo :
    bar();

// equivalent
let x = foo ?? bar();
```
