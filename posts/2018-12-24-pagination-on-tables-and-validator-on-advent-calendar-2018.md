---
date: 2018-12-24
title: LARAVELで〆、バリデーションとページ管理
description: Laravel #2 Advent Calendar 2018 25日目の記事です。

slug: pagination-on-tables-and-validator-on-advent-calendar-2018
category: Server
tags: 
 - Laravel
---

## 今年初挑戦のアドカレ

去年のアドカレで、Nuxt凄い！ Netlifyを使ってみたら凄く楽といった記事を目にし以降存分に利用させていただきました。逆に今年は私から発信できれば、と思い初挑戦させていただきます。今回 VueやNuxt、Firebaseに引き続き第4弾、Laravel編です。

### これまでの記事は、

1. [FIRESTOREに移行したら色々と楽になった話](https://webneko.info/posts/migration-to-firestore-on-advent-calendar-2018)
2. [プレゼンテーションスライドもVUEで作っちゃう話](https://webneko.info/posts/created-presentation-slide-by-vue-on-advent-calendar-2018)
3. [ATOMIC DESIGNでの技術選定の結果、そして今後](https://webneko.info/posts/doing-my-best-to-atomic-design-on-advent-calendar-2018)

## 技術スタック

2年近くアプリ内ブラウザ、管理画面を Laravelで制作。バックエンドでゲームサーバが動作、データベースは MySQL/Redisを使っています。

### マスタデータの管理やアイテム付与など

全体として変わったことをしていません。 Google Spreadsheetとの連携辺りでしょうか。今回はユーザデータの管理で DBファサードを使って JSON形式を取得しています。

```php
// 各キーワードを取得
$user_name = $request->query('userName');

switch ($user_table) {
    case 'user.users':
        $query = DB::connection('user')->table('users as u');
            break;
    //
}
```

管理画面ではプルダウンメニューよりテーブルを選択、検索するためにキーワード入力できる InputFormなどが存在。以下のようにバリデーションも欠かさず実装します。

```php
private $userValidator = [
    'userTable' => 'max: 16',
    'userName' => 'max: 64',
];

public function list(Request $request) {
    $this->validate($request, $this->userValidator);
}
```

バリデータで引っ掛かるとフロントでは以下のようにエラーを表示させるようにします。

```html
<form-error
    v-if="errors[item]"
    :errors="errors[item]"
/>

<!-- components/common/ FormError.vue -->
<span v-for="(item, index) in errors">
    {{ item }}
</span>
```

### ページネーションは、

少し詰まった。結果的に LengthAwarePaginatorを採用しています。 config/app.phpでページ数を予め設定すること。

```php
use Illuminate\Support\Facades\Input;
use Illuminate\Pagination\LengthAwarePaginator;

$page = Input::get('page', 1);
$paginate = config('app.paginate_limit');
$currentPage = LengthAwarePaginator::resolveCurrentPage();
$dataForCurrentPage = $query->slice(($currentPage - 1) * $paginate, $paginate);
$query = new LengthAwarePaginator($dataForCurrentPage, count($query), $paginate, $page);
```

一つは検索機能を充実させるため、前のページに戻るか、次のページに進むことが実現できること。各ページにアクセスする必要が無くなりました。

```
# デフォルトのページネーション
[<] [1] [2] [3] ... [10] [>]

# 実現したいページネーション
[<] [>]
```

もう一つは、テーブルを結合して成型しなければいけなかったこと。ログテーブルは各月で管理しているが、テーブルを結合せず済む場合と処理を分ける必要があった。


あとはフロントで取得するのみ。

```js
created() {
    const self = this;
    axios
        .get('/users')
        .then(function(response) {
            self.responseData = response.data;
    });
}
```

検索したい文字列や日時は随時 paramsに追加します。

```js
created() {
    const self = this;
    let params = 
        'userTable=' + this.searchData.userTable + 
        '&userName=' + this.searchData.userName;
    axios
        .get('/users?' + params)
        .then(function(response) {
            self.responseData = response.data;
    });
}
```


