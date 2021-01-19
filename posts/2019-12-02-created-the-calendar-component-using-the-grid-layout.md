---
date: 2019-12-02
title: アドベントカレンダーを自作する
description: この度アドベントカレンダーの専用ページを自作。まずは中核の存在であるカレンダーをGridレイアウトを使って作ります。
slug: created-the-calendar-component-using-the-grid-layout
category: Front
tags: 
 - Vue
 - Advent-Calendar
 - Nuxt
 - CSS
---

## 俺だけアドベントカレンダーとは、

Qiitaのアドベントカレンダーでもいくつか書かせていただく予定ですが、それ以外でも技術ネタを発信したいと考え、当ブログに俺だけアドベントカレンダー 専用ページを作りました。

<a class="link-preview" href="https://webneko.dev/advent-calendar/2019">Advent Calendar 2019</a>

この年末恒例特別なイベントという印象がありますが、基本的にはカレンダーを作れば良いのです。当ブログでは既にVuexストアでブログのコンテンツ情報が格納されています。ブログのリンク先を各日に設定、1日から25日まで公開することで大方の目的は達成します。

### 曜日から開始、終了位置を求める

日付操作にはmomentより軽量の `dayjs` を使います。

```ts
const startDay = dayjs(`${this.year}/12/01`).format('dddd')
```

キモは開始日12月1日の曜日を確認することです。日曜日の場合は0、月曜日の場合は1のように、開始位置を求めます。

```ts
const endDay = dayjs(`${this.year}/12/31`).format('dddd')
```

この開始位置は、月が始まるまでの余白を設定する際に役立ちます。同様に終了日12月31日の曜日も確認し、終了位置を求めます。

### Gridレイアウトを利用する

カレンダー全体を囲う要素に対して `display: grid;` を指定。

```css
.calendar {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, minmax(20px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows: 120px;
    overflow: auto;
}
```

その子要素を7行ずつループさせればOK 25日まで日付の他にアイコンを表示。26日以降についてはアドベントカレンダーの決まりにより、ブログ記事のリンクと紐付けできないよう日付のみを表示するようにしました。

```css
.day img {
    opacity: 100%;
}
```

該当日の記事が投稿され次第、アイコンのopacityを100%にし、そのリンク先へ飛べるようにします。

### 開始、終了位置をここで使う

先ほど求めた開始位置や、終了位置をどこで使うのか。

```html
<div
    v-for="i in startOfMonth"
    :key="i"
    class="day day--disabled"
/>
```

2019年12月こそ日曜日からスタートしますが、毎月必ず日曜日から始まる訳ではありません。ですがカレンダーの並びとしてこの日曜日から始めなければならず、開始位置（または終了位置）がキモになるという訳です。

## 詳しくは、

ソースコードを確認してください

<a class="link-preview" href="https://github.com/jiyuujin/webneko-blog/blob/master/components/AdventCalendar.vue">AdventCalendar.vue</a>

あとは容易に動的ページに載せるだけ。 `pages/advent-calendar/` に `_year.vue` を作成し、Routeパラメータに該当年を指定します。

```ts
async asyncData({ route }) {
    await store.dispatch('product/fetchPost', {
        'slug': '',
        'month': `${route.params.year}-12`
    })
}
```

最後のキモはRouteパラメータ `route.params.year` を使ってアクセスしていること。

既にVuexストアでコンテンツ情報の取得を行っており、今回もブラウザのレンダリング前に該当する年のコンテンツ情報を取得すべくasyncDataで呼び出すことにしました。

### ここだけの話、来年以降も使えます笑

該当年を入れるようにしたことで今年2019年に限らず以後使えるようになります😅
