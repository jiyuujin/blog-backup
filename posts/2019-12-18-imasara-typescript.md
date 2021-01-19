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

主催するミートアップではTS経験者が一定数いる一方で、現在自身がアサインしているプロジェクトを始め、全く経験のない方も(結構)それなりにいたことから、今回TSを新たに始める人に向けた話とさせていただきました。

先日AWSCDKを使った運用を、というのを書く予定だとお伝えしましたが、それはまた後日に mm

### そもそもTSを入れるとは

たわいも無いミスを防ぐため。TSを導入しないとなると、JavaScriptを使うことになると思いますが、このJavaScriptってのが良くも悪くもユルい言語。想定しない箇所で想定しない型として認識していたり、過剰に型判定を盛り込んでいたりと大幅に時間を食ってしまう傾向が高いと思います。

変な箇所で時間を使うなら、最初からTSを入れておけと！

という訳で、エディタやESLint、型定義の順に掻い摘んで見ていきましょう。

## Editorの事前準備

エディタはInteliJやVSCodeを中心に見ていきます。このときTSを使うポイントは最低限、autoFixOnSaveオプションを有効化するだけでも、より迅速な開発に貢献できるかと思います。

### IntelliJ

当の自身は普段、IntelliJを使っています。まず [Preferences] - [Languages & Frameworks] - [TypeScript] からコンパイルバージョンを設定。

File Watcher機能があります。TSファイルを作るとエディタ右上に [Add watcher] が表示されると思うので、適宜追加することでautoFixOnSaveオプション有効化されるようになります。これにより、ファイル保存のタイミングで自動的にLint Fixしてくれます。

続いて効率的にデバッグを行うため tsconfig.json に以下のオプションを設定しています。

```json
{
    "compilerOptions": {
        "sourceMap": true,
        "inlineSources": true
    }
}
```

他、JetBrains系IDEでも同様に使えると思うので参考になればと思います🙏

### VSCode

(恐らく多数派であろう)VSCodeでの設定についても触れておきます。私も動作確認がてら、使ってみたところ、圧倒的に補完が効いてくれるので (IntelliJよりオススメですね) 笑

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

IntellijJ同様、autoFixOnSaveオプションを有効化。VSCodeデフォルトで入っている、formatOnSaveオプションを無効化しないと、ルールの競合により上手く挙動しなかったのでこちらも行うと良さそうです。

### ESLint

ルートディレクトリに .eslintrc.js を設定した上で、今年の春ごろにTSLintから移行してね、とアナウンスされたと思いますが基本的に @typescript-eslint/eslint-plugin を使うこと。

<a class="link-preview" href="https://github.com/typescript-eslint/typescript-eslint">@typescript-eslint/eslint-plugin</a>

実際にMPAとしてVue/TSを導入した事例について登壇しています🙇‍♀️

> v-kansai #10
> [MPAとして導入のVue/TS設計を考える](https://webneko.dev/posts/in-progress-to-vue-on-cakephp)

是非こちらもご確認いただければと思います。

## まずはシンプルに書く

TypeScriptの設定ファイル tsconfig.json を生成。ここでのnpxコマンドはnpm v5.2以降使える方法、裏側で `$(npm bin)` を叩いてくれることでlocalにインストールせずとも実行できてしまうスグレモノ。

```bash
npx tsc --init
```

最初は tsconfig.json で設定を触らず以下のように HelloWorld.ts を作って、

```ts
const message: string = "TS";
console.log(`Hello World ${message}`);
```

該当のファイル名を引数にts-nodeを叩くと、

```bash
npx ts-node HelloWorld.ts
```

「Hello World TS」と表示されたらOK

あとは tsconfig.json で自分好み、あるいはプロジェクトに応じてルールを決定します。

### 私なりの設定をちょこっと公開！

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

簡単に説明するとTSを導入している以上、厳格はもちろん、暗黙を禁止、使ってないのは存在すんなよ、といった型管理を目指しましょうといった次第です。

## 型定義を書く

簡単なプログラムを実行できれば、いよいよプロジェクトで使うぞと強い意気込みを持ってもらっても構いません。個別のエンドポイントを型で管理するため、自前で型定義を書くことが多いと思います。ルートディレクトリにtypesという名前で新たに切っておけばソースコード全体の見通しも良くなります。

Vueのプロジェクトであれば、この下に shims-vue.d.ts などのような.d.tsファイルを設定します。

```
+
|--- types
|  |--- shims-vue.d.ts
|  |--- ***.d.ts
```

TSで書かれているライブラリを使う時はそこまでシビアにならず済みますが、必ずしも甘い世界ではありません。適宜 `@types/***` っていうプラグインを提供していればそれをインストールする必要があります。

たとえば@types/nodeをインストールする場合 tsconfig.json のtypesにnodeを追加します。

```json
{
    "compilerOptions": {
        "types": [
            "node"
        ]
    }
}
```

また自前で型定義を書かないといけない時が(結構)あるのですが、ここから先はより深くなっていくのでここで〆

## 最後に、

ちょうど1年前の記事ですが、各種型について詳細に書かれています。基本的に大幅な変更等は無いと思うので是非こちらもチェックいただければと思います🙏

<a class="link-preview" href="https://qiita.com/yuya_presto/items/f625da7b1a4d21c6ce7a#文法">次にJSガッツリ書くときはTypeScriptで #文法</a>

またこの秋に出たTS3.7ではSwift/Kotlinでお馴染みのOptional Chainingを始め、いくつか新しい機能が使えるようになっています。TS導入者の半数以上が常に最新バージョンを使っているアンケートも存在するので、置いてかれないようにキャッチアップしていきましょう。。🤙

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
