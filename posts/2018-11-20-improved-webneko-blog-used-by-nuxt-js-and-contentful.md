---
date: 2018-11-20
title: vuex設計やmarkdownのパースについて
description: Web猫ブログのUI/UXを向上させました。検索機能、ページネーション、Markdown部分のスタイル修正などについて簡単に記録しておきます。
slug: improved-webneko-blog-used-by-nuxt-js-and-contentful
category: Front
tags: 
 - Nuxt
 - Contentful
---

## Vuexでコンテンツ管理を目指す

たった2日で開発のスタートアップを切った当ブログ。ですが UIコンポーネントの作成を /pages 下に集中させるため、 Vuexで全てのブログデータを管理することにしました。

```store/index.js
client
    .getEntries(contentfulOptions)
    .then(entries => {
      commit('setPosts', entries.items)
      // console.log(entries)
    })
    .catch(console.error)
```

`search` パラメータが存在した場合にのみ、ES構文の `includes` を使って特定します。

```store/index.js
const searchPosts = entries.items.filter(item => {
    if (item.fields.title.includes(params.search) === true) return item
})
commit('setPosts', searchPosts)
```

基本的には `content_type` と `order` を付ければ取得できます。また `skip` と `limit` のオプションを追加することで簡単にページネーションも実現できます。

```store/index.js
const PAGE_SIZE = 10;

const contentfulOptions = {
    content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    order: ORDER,
    skip: (params.skip - 1) * PAGE_SIZE,
    limit: PAGE_SIZE
}
```

## Markdown部分のスタイル修正

Markdownのパースに `markdown-it` を採用。下記のプラグインを追加して、様々なフォーマットに対応しています。

-　`markdown-it-container`
-　`markdown-it-link-attributes`
-　`markdown-it-attrs`
-　`markdown-it-highlightjs`

```json
dependencies: {
    "@nuxtjs/markdownit": "^1.2.2",
    "@nuxtjs/markdownit-loader": "^1.1.1",
    "markdown-it": "^8.4.2",
    "markdown-it-attrs": "^2.3.2",
    "markdown-it-highlightjs": "^3.0.0",
}
```

### ちょっとしたスタイルを付けたい

ちょっとしたスタイルを付ける場合 `markdown-it-container` を使えば容易に応用できる。

```ts
const md = require('markdown-it')
export default {
    markdownit: {
        use: [
            ['markdown-it-container', 'warning', {
                validate: function(params) {
                    return params.trim().match(/^message\s+(.*)$/);
                },
                render: function (tokens, idx) {
                    const m = tokens[idx].info.trim().match(/^message\s+(.*)$/);
                    if (tokens[idx].nesting === 1) {
                        return '<div class="message ' + md.utils.escapeHtml(m[1]) + '"><div class="message-body">';
                    } else {
                        return '</div></div>\n';
                    }
                }
            }],
        ]
    }
}
```

### リンクであることを分かり易くしたい

リンクであることを分かり易くする場合 `markdown-it-link-attributes` や `markdown-it-attrs` を使って実現できる。

```ts
export default {
    markdownit: {
        use: [
            [
                'markdown-it-link-attributes',
                {
                    pattern: /https?:/,
                    attrs: {
                        target: '_blank',
                        rel: 'nofollow noopener noreferrer'
                    }
                }
            ],
            'markdown-it-attrs'
        ]
    }
}
```

### ハイライトを付けたい

ソースコードなど、特定の箇所に対してハイライトを付ける場合 `markdown-it-highlightjs` と `highlight.js` を使えば容易に導入できる。

```ts
const hl = require('highlight.js')
export default {
    css: [
        {
            src: '~/node_modules/highlight.js/styles/hopscotch.css',
            lang: 'css'
        }
    ],
    markdownit: {
        highlight: (str: string, lang: string) => {
            if (lang && hl.getLanguage(lang)) {
                return (
                    '<pre class="hljs"><code>' +
                    hl.highlight(lang, str, true).value +
                    '</code></pre>'
                )
            }
            // 言語設定が無い場合、プレーンテキストとして表示
            return (
                '<pre class="hljs"><code>' +
                hl.highlight('plaintext', str, true).value +
                '</code></pre>'
            )
        }
    }
}
```


上記のように設定すると、コードブロックの箇所も整理整頓され表示されました。
