---
date: 2019-05-28
title: devドメインに移行しました
description: devドメイン解禁されました。機会あって webneko.devを取得しています。
slug: migrated-to-dev-domain-on-webneko-blog
reaction: 😾
category: Server
tags: 
 - Nuxt
 - AWS
 - Vue
---

今年 2 月に解禁となった dev ドメインをこの度購入。取得経費は ¥1,400 plus tax/年。 dev ドメイン最大の特徴は HSTS (HTTP Strict Transport Security) 機能、 dev ドメインへの接続を HTTPS に限定するもので HTTP でアクセスすると強制的に HTTPS にリダイレクトする仕組みとなっているようです。

<a class="link-preview" href="https://www.blog.google/technology/developers/hello-dev/">hello-dev</a>

## ひとまず Netlifyで試します

デプロイ先に dist を設定、デプロイしましょう。環境変数を設定し忘れないこと。デプロイに成功すると、早速カスタムドメイン化の作業に進みます。

```bash
# Deploy
nuxt generate
```

A レコードに 104.198.14.52 を設定します。

![netlify-domain](//images.ctfassets.net/gzkue3szf85p/1631PfNgB4DH5VlIcDU47B/263b31549ffcd6485045d5489e881f20/netlify-domain.png)

引き続き HTTPS 対応のため CNAME に webneko.dev.を設定します。

![custom-record](//images.ctfassets.net/gzkue3szf85p/28oN8BW4z6t2BfDN2GHfFt/a71c93585ad651c5f24ef47eb78acb69/custom-record.png)

流石 Netlify を使うと 5 分もあれば全てをこなせる。

## では ECS + Fargateを変えずに

半年前に構築したインフラをそのまま採用します。

<a class="link-preview" href="../deploy-webneko-blog-to-fargate-in-ecs">Web 猫ブログのインフラ周りを少々</a>

### ドメインは Route53で管理

1. Route53 でホストゾーンを新規作成
2. Google Domains でネームサーバを設定
3. Route53 で設定したネームサーバを 1 個ずつ登録

### ACMで SSL証明書を発行

1. 証明書のリクエストをクリック
2. パブリック証明書のリクエストを選択
3. ドメイン名 `webneko.dev` を追加
4. 検証方法 DNS を選択
5. 確認画面で確定
6. DNS の検証画面が表示されることを確認
7. 新たに取得された CNAME を、 Google Domains で設定
8. 序でに Route53 でのレコードも設定しておきます
9. 検証開始をクリック

### 旧ドメインから新ドメインにリダイレクト

旧ドメイン `webneko.info` から新ドメイン `webneko.dev` にリダイレクトさせるようする。ちなみに現時点で旧ドメインを削除せず、暫くは共存させる予定で進めることにします。

1. ロードバランサの A レコードを Route53 のドメインに追加
2. S3 Bucket を作成、ファイルはひとつも無くて OK
3. エンドポイントをメモ
4. Static website hosting オプションから `このバケットを使用してウェブサイトをホストする` を選択
5. リダイレクトルールを記述
6. CloudFront で先ほどメモしたエンドポイントを `Origin Domain Name` に設定
7. `Alternate Domain Names (CNAMEs)` に旧ドメインを設定
