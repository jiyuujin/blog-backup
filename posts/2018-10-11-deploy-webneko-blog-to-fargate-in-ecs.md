---
date: 2018-10-11
title: Web猫ブログのインフラ周り
description: 当ブログの運用は、ECSコンテナに乗せたAWS Fargateを採用しました。

slug: deploy-webneko-blog-to-fargate-in-ecs
category: Server
tags: 
 - Nuxt
 - AWS
 - Vue
---

## Web猫ブログとは

フロントエンドにVue.jsのフレームワークの一つNuxt.jsを、Headless CMSの一つであるContentfulを採用しています。見えない裏側で Travisを使った自動化、Graphcool (GraphQL)やFirestoreも入っています。

<a class="link-preview" href="https://webneko.dev/">https://webneko.dev/</a>

## Dockerイメージを作成

ECSリポジトリに上げる準備をするため、Dockerfileを作ります。

```Dockerfile
FROM node:9.11.1-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --quiet
COPY . .
RUN yarn run build
CMD ["yarn", "run", "start"]
```

やっていることはbuildコマンドを叩いているだけ、然程難しくはありません。このようにDockerfileを準備できたら、実際にビルドを開始します。

```bash
docker build -t <IMAGE_NAME> .
```

## Tagを付与します

```bash
docker tag <IMAGE_NAME>:latest <ECSリポジトリ>:latest
```

## ECSリポジトリにPushします

```bash
docker push <ECSリポジトリ>:latest
```

## Fargateで構築

### クラスタを作成します

クラスター名のみならずコンテナ名やサービス名、タスク名は適当に決めます。

以下順次設定を終えると、タスク(Public IP + Port)で実行確認します。

1. ECS 左のメニューから `クラスター` を選択
2. グレーのボタン `今すぐ始める` を選択
3. コンテナの定義では `custom` を選択
4. 右から現れる設定タブで先にPushしたDockerイメージのURIを入力
5. ポートマッピングに `3000` を入力
6. ロードバランサの種類で `Application Load Balancer` を選択

### ドメインを設定します

1. クラスタ一覧から先ほど作成の `クラスタ` を選択
2. サービス名で実行されている `サービス` を選択
3. ロードバランシングからターゲットグループ名の作成されている `ロードバランサ` を選択
4. ターゲットグループに紐づいている `ロードバランサ` を選択
5. このロードバランサのAレコードをRoute53のドメインに追加
6. 下のタブでリスナーを選択
7. リスナーで `HTTP(80)` / `HTTPS(443)` を上記のターゲットグループにリダイレクトする設定を追加
8. ロードバランサに紐づいているセキュリティグループのインバウンドの `HTTP(80)` / `HTTPS(443)` をアクセス可能にする

### 常時SSL化も忘れずに！

1. ロードバランサのリスナーにて `HTTPS(443)` にACMで取得したSSL証明書を追加
2. リスナーの `HTTP(80)` を `HTTPS(443)` に転送するよう設定

## リポジトリ公開中

ブログでは随時お問い合わせコメント受付中、PRも絶賛受付中です。

<a class="link-preview" href="https://github.com/jiyuujin/webneko-blog">https://github.com/jiyuujin/webneko-blog</a>
