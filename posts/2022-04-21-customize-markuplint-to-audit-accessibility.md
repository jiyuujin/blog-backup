---
date: 2022-04-21
title: 内々勉強会 - markuplint をカスタマイズする会
description: 毎週木曜の昼に内々でアクセシビリティ勉強会を開催しています、今回は markuplint ルールのカスタマイズを中心に記録しています。
slug: customize-markuplint-to-audit-accessibility
reaction: 🌺
category: Front
tags: 
 - A11Y
 - React
 - TypeScript
---

今回触れる内容は下記の通りです。

- (前置き) markuplint を導入する
- markuplint ルールのカスタマイズ
  - `indentation` ルールを切る
  - `<img>` 要素で設定可能な属性を個別に調整する
  - アンカー `<a>` 要素の `rel` 属性で入力すべき値を個別に調整する
  - メディア要素の `controlslist` 属性で入力可能な値を調整する
  - Emotion 利用の際に `<div>` 要素で `css` 属性の使用を許容する
  - `permitted-contents` ルールの利用を考慮する
- 最新ニュース一覧
  - `<aside>` 要素でアクセシビリティマッピングの変更を認識する
  - `<dialog>` 要素でアクセシビリティを意識する
  - 代替テキストはなぜ簡潔にすべきか
  - 新たに freee アクセシビリティ研修動画が公開されている
  - Global Accessibility Awareness Day 2022 (GAAD Japan) 登壇者が発表されている

記事と合わせ [登壇スライド](https://docs.google.com/presentation/d/1IGtF7dFfB4QTHNPBDND8KeczHRSrs0Uy7eBMvYqYHdQ/edit?usp=sharing) も作成している。

https://docs.google.com/presentation/d/1IGtF7dFfB4QTHNPBDND8KeczHRSrs0Uy7eBMvYqYHdQ/edit?usp=sharing

## markuplint を導入する

前置きとして、前回は markuplint の導入を進めた。

その詳細は [markuplint おさわり会](https://webneko.dev/posts/setup-markuplint-to-audit-accessibility) に記載しているので、是非ともチェックいただきたい。

https://webneko.dev/posts/setup-markuplint-to-audit-accessibility

## markuplint ルールのカスタマイズ

主に下記の通りです。

- `indentation` ルールを切る
- `<img>` 要素で設定可能な属性を個別に調整する
- アンカー `<a>` 要素の `rel` 属性で入力すべき値を個別に調整する
- メディア要素の `controlslist` 属性で入力可能な値を調整する
- Emotion 利用の際に `<div>` 要素で `css` 属性の使用を許容する
- `permitted-contents` ルールの利用を考慮する

なお、 `<audio>` / `<video>` 要素で `track` 属性が書かれていないケースが挙げられる。これは字幕に対応していないことを意味しており、下記のようなエラーを確認できる。

```bash
error: 要素「track」が必要です (required-element)
```

よく分からない場合は、無理にカスタマイズを行わなくても良いでしょう。

今回、個々の該当ファイルを `excludeFiles` へ設定した。

他の解決策があれば、それに切り替えれば良い。

### `indentation` ルールを切る

Prettier ルールとの Conflict を解消するため。

```.markuplintrc
{
  "rules": {
    "indentation": false
  }
}
```

### `<img>` 要素で設定可能な属性を個別に調整する

`width` 属性や `height` 属性はデフォルトで必須の属性となっているため。

```.markuplintrc
{
  "nodeRules": [
    {
      "tagName": "img",
      "rules": {
        "required-attr": [
          "alt",
          "src"
        ]
      }
    }
  ]
}
```

### アンカー `<a>` 要素の `rel` 属性で入力すべき値を個別に調整する

`rel` 属性で `noopener` が含まれているか、機械的にチェックしたいケースがあるため。

```.markuplintrc
{
  "nodeRules": [
    {
      "tagName": "a",
      "rules": {
        "required-attr": [
          {
            "name": "rel",
            "value": "/noopener/i"
          }
        ]
      }
    }
  ]
}
```

### メディア要素の `controlslist` 属性で入力可能な値を調整する

[`controlslist` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/video#attr-controlslist) を設定することで、メディア要素 (`<audio>` / `<video>`) に表示するコントロールの選択を補助してくれる。

この属性に入る可能性の値をあらかじめ定義しておき、機械的にチェックしたいケースがあるため。

```.markuplintrc
{
  "rules": {
    "invalid-attr": {
      "option": {
        "attrs": {
          "controlslist": {
            "enum": ["nodownload"]
          },
        }
      }
    }
  }
}
```

### Emotion 利用の際に `<div>` 要素で `css` 属性の使用を許容する

CSS-in-JS に Emotion を利用している場合に、 `<div>` 要素で `css` 属性を使っているケースがあるため。

```.markuplintrc
{
  "rules": {
    "invalid-attr": {
      "option": {
        "attrs": {
          "css": {
            "disallowed": true
          }
        }
      }
    }
  }
}
```

### `permitted-contents` ルールの利用を考慮する

[`permitted-contents`](https://markuplint.dev/rules/permitted-contents) のルールで個別のタグを定義していけば、より精度の高いチェックツールが完成されて来そうです。

```.markuplintrc
{
  "rules": {
    "permitted-contents": [
      {
        "tag": "x-container",
        "contents": [
          { "require": "x-item" },
          { "optional": "y-item" },
          { "oneOrMore": "z-item" },
          { "zeroOrMore": "#text" },
          // ❌ Cannot specify keywords simultaneously
          {
            "require": "x-item",
            "optional": "y-item"
          }
        ]
      }
    ]
  }
}
```

## 最新ニュース一覧

主に下記の通りです。

- `<aside>` 要素でアクセシビリティマッピングの変更を認識する
- `<dialog>` 要素でアクセシビリティを意識する
- 代替テキストはなぜ簡潔にすべきか
- 新たに freee アクセシビリティ研修動画が公開されている
- Global Accessibility Awareness Day 2022 (GAAD Japan) 登壇者が発表されている

### `<aside>` 要素でアクセシビリティマッピングの変更を認識する

詳細は [こちら](https://blog.w0s.jp/669) よりご確認いただきたい。また [参照 PR](https://github.com/w3c/html-aam/pull/350) と合わせチェックいただくと良さそうです。

https://blog.w0s.jp/669

`<section>` や `<article>` 、 `<nav>` 要素と同じく比較的自由な場所に配置できる `<aside>` のデフォルトロールは `complementary` です。

`complementary` はトップレベルのランドマークである必要がある一方、補足的なコンテンツがメインコンテンツに関連していない場合はより一般的なロールを割り当てる必要がある。

結果として状況により適用ロールを変えることでその解決を図った。

### `<dialog>` 要素でアクセシビリティを意識する

詳細は [こちら](https://web.dev/building-a-dialog-component/) よりご確認いただきたい。

https://web.dev/building-a-dialog-component/

先日 Safari 15.4 をもって正式にリリースされた `<dialog>` 要素。この要素を使ったダイアログ作成と、アクセシビリティについてもより深く掘り下げて書かれている。

ダイアログ表示とユーザー入力を無視する `inert` / `autofocus` 属性や ESC キーの非表示など。

### 代替テキストはなぜ簡潔にすべきか

詳細は [こちら](https://www.mitsue.co.jp/knowledge/blog/a11y/202204/19_1430.html) よりご確認いただきたい。

そもそも代替テキストが必要なものであるという認識はさておき、代替テキストを設定するためには、下記のような 2 つの選択肢が挙げられる。

- システムがあらかじめ入れておく
- 顧客にその都度入れて貰う

そのうち後者の最たる例が、つい最近 Twitter に入った画像の [alt 属性](https://help.twitter.com/ja/using-twitter/add-image-descriptions) です。

https://help.twitter.com/ja/using-twitter/add-image-descriptions

実際 alt 属性に設定したい情報をユーザに入力させるというものですが、想定されていない使われ方もちらほら散見されており色々と物議を醸しているようです。

いずれにせよ代替テキストへ長い文言を設定した場合に、スクリーンリーダーで読み上げてくれるものの、大変聞き辛い印象しか残らないウェブサイトとなってしまう可能性がある。

それを防ぐためにも、代替テキストは必要最低限のものに留めて設定する必要があるという訳です。

### 新たに freee アクセシビリティ研修動画が公開されている

詳細は [こちら](https://newsrelea.se/GKxagV) よりご確認いただきたい。

https://newsrelea.se/GKxagV

- アクセシビリティ研修動画 - 技術職対象 (Basic) - ※ 2022 年 4 月公開
  - https://youtu.be/c10ojoUEs8Q
- アクセシビリティ研修動画 - 技術職対象 (Advance) ※ 2022 年 4 月公開
  - https://youtu.be/-WIDffVLYeA
- アクセシビリティ研修動画 - 全職種対象 ※ 2022 年 2 月公開
  - https://youtu.be/gm1-xOnR9Z4

### Global Accessibility Awareness Day 2022 (GAAD Japan) 登壇者が発表されている

今年も 5 月の第 3 木曜日に開催予定、合わせて [登壇者](https://www.gaad.jp/speakers/) も続々と発表されている。

[登壇者一覧 - GAAD Japan 2022](https://www.gaad.jp/speakers/)

## その他

記事と合わせ [登壇スライド](https://docs.google.com/presentation/d/1IGtF7dFfB4QTHNPBDND8KeczHRSrs0Uy7eBMvYqYHdQ/edit?usp=sharing) も作成している。

https://docs.google.com/presentation/d/1IGtF7dFfB4QTHNPBDND8KeczHRSrs0Uy7eBMvYqYHdQ/edit?usp=sharing
