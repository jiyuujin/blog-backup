---
date: 2019-09-17
title: 気にせず MPA + TS として導入しよう
description: Vue + MPA で構成されるWebアプリにTSを導入するためにこれだけは最低限守っていることなどを話しました。
slug: in-progress-to-vue-on-cakephp
category: Front
tags: 
 - CakePHP
 - Vue-CLI
 - Vue
---

## MPAとしてVueを導入する

最近はReact/Serverlessのお仕事と並行して、CakePHPにVueを導入するお仕事を進めてます。既に一部リリース済みですが既存のような新規案件、負債は決して存在しないとは言えないちょっぴりカオスな環境。先日そのMPA導入過程の中でも vue.config.js に主眼を置いて書きました。

<a class="link-preview" href="https://webneko.dev/posts/vue-config-and-more">vue.config.js</a>

### 後々になって変えたいと言われると、

その心は TypeScript を選定するか否か、結論は TS Go です！

プロジェクト内で実質自分のみ TypeScript を理解していない状況でしたが TypeScript を選定。頑張って勉強してねー、ってことで mm

## Lintを考える

早速 .eslintrc.js の初期設定では以下参考にさせていただきました🙏

<a class="link-preview" href="https://teppeis.hatenablog.com/entry/2019/02/typescript-eslint">@typescript-eslint ことはじめ</a>

最初から黄金比率 (まで行かなくても) 良いです。

```js
module.exports = {
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript'
    ],
    plugins: ['@typescript-eslint']
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    }
}
```

今回この組み合わせ(ESLint+Prettier)に加えて、一番のキモは eslint-config-standard も継承したこと。

```bash
yarn add -D eslint-config-standard
yarn add -D eslint-plugin-node
yarn add -D eslint-plugin-prettier
yarn add -D eslint-plugin-promise
yarn add -D eslint-plugin-standard
```

PRでのレビューを受け設定させていただきました。大変ありがとうございます🙏　細々としたルールの記述が減り、よりメンテし易くなったと思います。

CIにGitlab-CIを使っていますが無難に `eslint` コマンドを使いましょう。

```bash
npx eslint ./ --ext vue,js,ts
```

また `tsc` コマンドも利用すること。

```bash
npx tsc --noEmit
```

トランスパイルの結果をJavaScriptには出力しないオプションをすすめます。

### 順序立てて型安全を追求しましょう

これを踏まえて、

1. エンドポイントを interface で定義
2. その他最初は (分かんなかったら) Anyで対応

全てはサーバサイドとの通信を安全に完結させるため。通信処理を一つのmoduleとして切り分け、必要に応じてこのmoduleをインポートして返却値を厳密に管理します。

```ts
export default class SummaryService {
    public async fetchSummary(
        ids: string[],
        person: string,
        createdAt: string
    ): Promise<SummaryEndpoint> {
        const params = getParams(ids, person, createdAt)
        const res = await axios.get(`/summary?${params}`)
        return res.data
    }
}
```

今回MPAとしてVueを導入(将来的にはSPAとして一括導入を検討)しているが、画面全体でデータを管理する必要は無く vuex を一切採用していません。ちなみに `Vue.observable` を使ってアカウントステータスを管理していますが、今回は話が長くなるためまた後日共有させてください..🙏

上記のように非同期通信を最大限活用、Promise.allほんと便利！

```ts
mounted() {
    Promise.all([
        this.fetchSummaryA(),
        this.fetchSummaryB(),
        this.fetchSummaryC(),
        this.fetchSummaryD()
    ])
}
```

あとテーブルやグラフチャート用にデータを加工する訳ですが、必要に応じて props を渡します。

親コンポーネントから孫コンポーネントのように 2世代以上を超えて引数を渡すといったことの無いような設計を堅持しています。

おいおい自力で型定義を書ければ良いでしょう。

基本的にエンドポイントの型定義を書けると、特にプラグインをインストールしない限り問題無いと思います。今回トーストUIを別途入れていますが、流石に自力で型定義を書かなければいけません。

```ts
declare module "vue-toasted" {
    import Vue, { PluginFunction } from "vue";
    function install(): PluginFunction<any>;
    export interface VueToasted {
        show(message: string): void;
    }
}
```

## コンポーネントで既存のCSSと競合

実際にコンポーネントでは services にアクセスするための加工済データをローカルステートとして管理。こうしたコンポーネント化を進めるに当たって新たに導入検討を進めていた bootstrap-vue の存在。

### 想定と比べて深刻 (かも)

ボタンの背景色が表示されない、モーダルが動かない事象が発生。Vue CLI内では Scoped CSS を採用、それはあくまで Vue Component内の話。既存のCSSはグローバルに書かれており、競合が発生するのも納得。良くも悪くも新規ではなく既存案件であることを痛感した場面の一つでした。

そこでCSSのベタ書きに変更。今回は一例にモーダルを自作コンポーネント化しました。

```html
<atoms-button
    ref="branchSelectButton"
    :text="title"
    @handleClick="displayModal"
></atoms-button>
<div v-if="showModal === true">
    <div class="modal-mask" @click.self="showModal = false">
        <div :style="modalWrapperStyle">
            <div class="modal-container">

            </div>
        </div>
    </div>
</div>
```

基本的な考え方としてボタンをタップした時に `showModal` フラグを `true` にする一方で、マスク領域をタップすると `showModal` フラグを `false` にしています。

またButtonやInputなどで使える v-model をあえてプロジェクト内で使わない方針を立てました。

```html
<input
    v-model="searchText"
/>
```

大変便利であることは承知ですが、

```html
<input
    :value="searchText"
    @update="updateSearchText"
/>
```

内部的にイベントハンドラも含んでいることは非常に煩わしいのです。

## 最後に、

細々としたTipsを羅列した、これまでと違ってとても不恰好な登壇になってしまいましたが v-kansai #10 でも喋らせていただいております mm

<a class="link-preview" href="https://slides.com/jiyuujin/20190918#/">小さなことから改善してる話</a>

今後も必要に応じて共有していきたいと思います。
