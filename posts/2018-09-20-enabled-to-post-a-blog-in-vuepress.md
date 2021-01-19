---
date: 2018-09-20
title: VuePressをブログとして使う
description: ドキュメント制作を容易に実現する VuePressをブログとして使います。
slug: enabled-to-post-a-blog-in-vuepress
category: Front
tags: 
 - Vue
---

## VuePressを使うなら、

結果的には `Nuxt.js` 案を採用した訳ですが、製作前は `VuePress` 案も検討していました。 `this.$site.pages` に同リポジトリ内のMarkdownファイルが一通り入っているので、適宜必要なMarkdownファイルを選択することでブログ化を実現することができます。

```js
computed: {
  posts() {
    // console.log(this.$site.pages)
    return this.$site.pages
      .filter(page => page.path.startsWith('/_posts/'))
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  },
},
```

Markdownから次のようにコンポーネントを呼び出すと良さそうです。

```md
---
home: false
---

<Post />
```

### 専用プラグインもあるようで..?

ブログ化専用プラグインも準備。 `@vuepress/plugin-blog` を使えばブログを実現できるようですが、機会あれば後日ご紹介できればと思います。
