---
date: 2019-07-16
title: MPAとしてVueを導入する
description: WebpackベースのVue CLIを今回初めて採用、サーバサイドにVueを組み込む際に必要だったことを軽く記録します
slug: vue-config-and-more
category: Front
tags: 
 - CakePHP
 - Vue-CLI
 - Vue
---

これまでにお仕事で [Vue CLI](https://cli.vuejs.org/) をベースに使った場面は無く、今回 [CakePHP](https://cakephp.org/jp) のフロントエンドに Vue CLI を組み込んだ経験を中心に記録します。

### Vue CLI を導入する

新たに `frontend` ディレクトリを準備します。

```bash
# Vue CLI
vue create frontend
```

具体的なインストール方法は割愛、以下公式ページをご確認ください。

<a class="link-preview" href="https://cli.vuejs.org/guide/installation.html">Vue CLI Installation</a>

ルートディレクトリに今回の主役 vue.config.js です。

```js
pages: {
    index: {
        entry: './frontend/src/main.ts',
        template: './frontend/public/index.html',
        filename: 'index.html',
        chunks: [
            'chunk-vendors',
            'chunk-common',
            'index'
        ]
    }
}
```

別途エントリーポイントや出力先などを設定します。

```js
configureWebpack: {
    resolve: {
        alias: {
            '@': path.join(__dirname, 'frontend/src/')
        }
    }
}
```

プロジェクトの起点が決まれば、トランスパイルしてできたファイル群の置き場所を決めます。

```js
chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        config.output.filename('[name].js')
        config.output.chunkFilename('js/[name].js')
    }
}
```

ハッシュ値を付けずにトランスパイルも可能。

これでレンダリングする準備は整いました。

### Gitlab-CIを設定する

CI を使って自動化しています。

```yaml
"Yarn":
  stage: Frontend
  image: node:10
  before_script:
    - 'node --version'
    - 'yarn --version'
  script:
    - 'cd ${CI_PROJECT_DIR}'
    - '# Install dependencies...'
    - 'yarn install --cache-folder ${CI_PROJECT_DIR}/.yarn-cache --pure-lockfile --non-interactive --no-progress'
    - '# Install ESLint PlugIns...'
    - 'yarn add eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/typescript-estree'
    - '# Run ESLint...'
    - 'node_modules/eslint/bin/eslint.js'
    - '# Run Unit Test...'
    - 'yarn test:unit'
    - '# Run Vue Transpile...'
    - 'yarn build'
  cache:
    key: "${CI_PROJECT_ID}_cache_yarn"
    paths:
      - .yarn-cache/
      - node_modules/
  artifacts:
    paths:
      - doc_root/webroot/dist
    expire_in: 3 hour
```

## 最後に、

サーバサイドでルーティングが既に存在していましたが、将来的な SPA 移行に備えるため、順当に `vue-router` を採用し、フロントエンドでルーティングを管理しました。 `frontend/main.ts` 内で、既に存在していたサーバサイドのルーティングに合わせてルーティングリストを準備します。

```html
<div id="app">
    <router-view/>
</div>
```

`.tpl` ファイルに実 DOM を配置することで、無事「仮想 DOM」としてレンダリングされることを確認しましょう。
