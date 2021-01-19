---
date: 2019-12-24
title: 2020年はVueをTSXで書く？
description: この記事は Vue Advent Calendar 2019 の 24 日目の記事です。Composition API採用後、VueをTSXで書く選択肢が生まれやすくなるため、簡単にスタートアップできることを書きました。
slug: live-together-vue-tsx-in-2020
category: Front
tags: 
 - Vue
 - TypeScript
 - Advent-Calendar
---

## まず前提として、

現時点で基本的にはVueをTSXで書けるようになっていると思いますが、まだまだ苦労を伴うと思います。そんなTSXをComposition APIと合わせて書いた時に感じた苦労話などを先日投稿、v-okinawa #3でもリモートながら喋らせていただいてます。

> v-okinawa #3
> https://webneko.dev/posts/enter-the-final-v-okinawa-in-2019

そして今日はそのTSXを使ってVueを書くためのスタートアップについて書きました。

### VueをTSで書くとは、

これまでVueをTSで書くためには素で書くかAPIを新たに入れるかという、大きく分けると二択存在。さらに細かく分けると以下3種類存在するかと思います。

1. Vue.extend
2. Class Component
3. vue-property-decorator

当然これらを使ってもTSXで書けると思うのですが、来たるVue3に向けComposition API採用によって、第一に書きやすいこと、より迅速にスタートアップできること、そしてTSXによる厳密な型管理を実現できます。あとはReactとVueの双方でTSXを書けるようになることは、相互乗り入れ(?)ではないですが、互いに往き来しやすいというメリットも生まれそうです。

## WebpackとVue、そしてTSX

まず基本から、Webpackをモジュールバンドラにした場合どんな感じで書けるのか。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
}
```

こんな感じで各種ローダを読み込むと最低限VueをTSで書けるようになると思います。

ここまではさくっと流した上で、TSXで書くための準備としてBabelの設定を行う必要があります。今回は babel-plugin-transform-vue-jsx を使いたいので、

```js
plugins: ['transform-vue-jsx]
```

ルートコンポーネントであるApp.vueをApp.tsxに置き換えます。

```ts
import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
    render(h: CreateElement): VNode {
        return (
            <div class="container">
                <transition name="fade">
                    <router-view />
                </transition>
            </div>
        )
    }
})
```

これでVueをTSXで書くための準備が整いますね。

<a class="link-preview" href="https://github.com/jiyuujin/vue-tsx-boilerplate">jiyuujin/vue-tsx-boilerplate</a>

詳しくはこちらのリポジトリを参照ください。

## Vue CLIでTSXを使う

構築できたとはいえ実際のプロジェクト導入にあたって、Webpackを直接メンテすることは極力避けたいですね。ということでVue CLIの中でTSXを使いましょう。

```bash
vue create vue-tsx-boilerplate
```

このように `vue create` すると、 @vue/cli-plugin-babel を確認することができますが、JSXをJavaScriptに変換してくれる babel-plugin-transform-vue-jsx が既に含まれています。

ではこれでTSXを書いて動くのか、残念ながら動きません。。🤷‍♀️

その理由はcreateComponentをhにマッピングできていないから。これを解決するため、自動でcreateComponentをhにマッピングしてくれる babel-preset-vca-jsx を利用します。

```js
presets: ['vca-jsx']
```

TSXのトランスパイル設定を忘れずに！

```json
{
    "jsx": "preserve",
}
```

React以外でもTSXを使えるようになります。

あとは型定義を拡張すること。

```ts
import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

ルートコンポーネントであるApp.vueをApp.tsxに置き換えます。

```ts
import { createComponent, SetupContext } from '@vue/composition-api'

export default createComponent({
    setup(props: {}, ctx: SetupContext) {
        return () => (
            <div class="container">
                <transition name="fade">
                    <router-view />
                </transition>
            </div>
        )
    }
})
```

これでVue CLIでもTSXを使って書けるようになります。

<a class="link-preview" href="https://github.com/jiyuujin/vue-cli-tsx-boilerplate">jiyuujin/vue-cli-tsx-boilerplate</a>

詳しくはこちらのリポジトリを参照ください。

## スタイルの適用

ここまで来ると次はスタイルですね。実際に私自身が書いているお供に vue-styled-components の存在があります。使い方こそ特筆すべき事項も無くてREADMEを見て構築いただければと思いますがreactと同様に CSS in JS で書けるのですんなりと入っていけました😊

<a class ="link-preview" href="https://www.npmjs.com/package/vue-styled-components">vue-styled-components</a>

ただし CSS in JS 自体向き不向きがあると思っているので必ずしもオススメはしません mm

以下のようにスタイルをテンプレートに直接書く方法もあります。

```ts
{`
    <style jsx>
        .title {
            height: 100%;
        }
    </style>
`}
```

この辺りは何が王道で、というのが自分自身でも分からないので教えて欲しいといった次第ですね笑　😅

## 最後に、

色々とスタートアップについて書いてきましたが、

```ts
<script lang="tsx">
import { createComponent, SetupContext } from '@vue/composition-api'

export default createComponent({
    setup(props: {}, ctx: SetupContext) {
        return () => (
            //
        )
    }
})
</script>
```

無理に拡張子をTSXにする必要はなく、Vueならではの書き方を踏襲することがとりあえず良さそうです。

来る2020年、早いうちにもVue3が正式に登場することになります (ると思います) VueをTSXで書く元年になるとも思っているので、個人的にはこの年末年始にでも慣らしておこうかな 🤙
