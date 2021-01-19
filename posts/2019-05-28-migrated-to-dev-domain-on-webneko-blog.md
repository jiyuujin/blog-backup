---
date: 2019-05-28
title: devドメインに移行しました
description: devドメイン解禁されました。機会あって webneko.devを取得しています。
slug: migrated-to-dev-domain-on-webneko-blog
category: Server
tags: 
 - Nuxt
 - AWS
 - Vue
---

## .dev 解禁

今年 2月に解禁となった devドメインをこの度購入。取得経費は ¥1,400 plus tax/年。 devドメイン最大の特徴は HSTS (HTTP Strict Transport Security) 機能、 devドメインへの接続を HTTPSに限定するもので HTTPでアクセスすると強制的に HTTPSにリダイレクトする仕組みとなっているようです。

<a class="link-preview" href="https://www.blog.google/technology/developers/hello-dev/">hello-dev</a>

## ひとまず Netlifyで試します

デプロイ先に distを設定、デプロイしましょう。環境変数を設定し忘れないこと。デプロイに成功すると、早速カスタムドメイン化の作業に進みます。

```bash
# Deploy
nuxt generate
```

Aレコードに 104.198.14.52を設定します。

![netlify-domain](//images.ctfassets.net/gzkue3szf85p/1631PfNgB4DH5VlIcDU47B/263b31549ffcd6485045d5489e881f20/netlify-domain.png)

引き続き HTTPS対応のため CNAMEに webneko.dev.を設定します。

![custom-record](//images.ctfassets.net/gzkue3szf85p/28oN8BW4z6t2BfDN2GHfFt/a71c93585ad651c5f24ef47eb78acb69/custom-record.png)

流石 Netlifyを使うと 5分もあれば全てをこなせますね！

## では ECS + Fargateを変えずに

半年前に構築したインフラをそのまま採用します。

<a class="link-preview" href="../deploy-webneko-blog-to-fargate-in-ecs">Web猫ブログのインフラ周りを少々</a>

### ドメインは Route53で管理

1. Route53でホストゾーンを新規作成
2. Google Domainsでネームサーバを設定
3. Route53で設定したネームサーバを 1個ずつ登録

### ACMで SSL証明書を発行

1. 証明書のリクエストをクリック
2. パブリック証明書のリクエストを選択
3. ドメイン名 `webneko.dev` を追加
4. 検証方法 DNSを選択
5. 確認画面で確定
6. DNSの検証画面が表示されることを確認
7. 新たに取得された CNAMEを、 Google Domainsで設定
8. 序でに Route53でのレコードも設定しておきます
9. 検証開始をクリック

### 旧ドメインから新ドメインにリダイレクト

旧ドメイン `webneko.info` から新ドメイン `webneko.dev` にリダイレクトさせるようにします。ちなみに現時点で旧ドメインを削除せず、暫くは共存させる予定で進めることにします。

1. ロードバランサの Aレコードを Route53のドメインに追加
2. S3 Bucketを作成、ファイルは一つも無くて OK
3. エンドポイントをメモ
4. Static website hostingオプションから `このバケットを使用してウェブサイトをホストする` を選択
5. リダイレクトルールを記述
6. CloudFrontで先ほどメモしたエンドポイントを `Origin Domain Name` に設定
7. `Alternate Domain Names (CNAMEs)` に旧ドメインを設定

## Adsense対応は、

Google Adsenseを一旦外しました、再度申請を上げたいと思います。
