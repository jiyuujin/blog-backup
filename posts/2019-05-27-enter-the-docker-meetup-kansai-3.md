---
date: 2019-05-27
title: Docker Meetup Kansai リポート
description: 初めて Docker Meetup Kansai #3 にお邪魔させていただきます。
slug: enter-the-docker-meetup-kansai-3
category: 
tags: 
 - Docker
 - Review
---

## 初めてお邪魔させていただきます！

開始時間まで静かに待つのもあれ.. ということで開口一番始まっていました。 Dockerイメージについて一つ、イメージレイヤの積み重ねであること。別々のイメージで同じ親を持つことができるので、複数のホストを立ち上げた場合でも立ち上げが早くなる仕組み。

### さくらインターネット株式会社 大阪本社にて、

度々お世話になっております、さくらインターネット株式会社さま！ 今回は日本MSP協会のご支援よりお食事まで、ということだそうです。🙏

![dockerkansai3-afterparty](//images.ctfassets.net/gzkue3szf85p/sdaAUQPOlArIrYMYUYdMM/fa42fa28029083f2534ac09f232676c3/IMG_1280.JPG)

余談にはなりますが、有り難くクーポンをいただきました。

![sakura-vps](//images.ctfassets.net/gzkue3szf85p/390pC2uOBrfkWYA5804mtz/6cc207b14430c198b280e6c67551bded/IMG_1291.JPG)


## DockerCon San Francisco 2019 (雑な) まとめ

さくらインターネット株式会社の前佛雅人さんの登壇、 DockerCon SF 2019 について掻い摘んで話されました。基本的には Web上の登壇情報をご確認ください。

1. Docker Enterprise 3.0
2. [DKS](https://blog.docker.com/2019/05/introducing-docker-kubernetes-service/) (Docker Kubernetes Service)
3. BuildKitの機能を全て使えるようになった [docker/buildx](https://github.com/docker/buildx)

## Dockerfile Best Practices DCSF19を読み込む

引き続き前佛雅人さんの登壇、Dockerfileを書く上での [ベストプラクティス](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) について。可能であればすぐに、 Docker BuildKitを使う方が良い。とにかく速度が速くなる。並列性や lazy upload、キャッシュの改良など従来の課題を解決・実現した dockerkitをチェックすべき！

```
# Docker BuildKit
export DOCKER_BUILDKIT=1
```

登壇中に紹介のあった BuildKitによる高速でセキュアなイメージビルド は、

<a class="link-preview" href="https://www.slideshare.net/AkihiroSuda/buildkit">Buildkitによる高速でセキュアなイメージビルド</a>

## Jupyterhubの DockerSpawnerの紹介

[kozo2](https://twitter.com/kozo2)さんの登壇、 DockerSpawnerの紹介について。 [Jupyter Notebook](https://jupyter.org/) は、クライアント・サーバ型の Webアプリで、 AI・データサイエンスでは無くてはならない存在。 Docker + Jupyter Notebookと比べて、ポート・データのマウントの管理の難が要らず、各ユーザに dockerコマンドの実行を許容する心配も不要になっているとのこと。ただし MLするのに GPUを使えず、現場への実戦投入は遠い模様。

<a class="link-preview" href="https://docs.google.com/presentation/d/1vM7vurd-KE4x-sKe5vT9ZoyBc2HSPER4CjsPV4QVJig/edit">Jupyterhubの DockerSpawnerの紹介</a>

## AB test with Docker

[chimame](https://twitter.com/chimame)さんの登壇、アプリケーションエンジニアとしての側面からアプローチした話をされていました。一定のルールでディレクトリを作成する仕様が理解しづらいこと、異職種間のコミュニケーションコストが高いこと。この課題を解決するため、 target groupごとに ABテストを実施、

<a class="link-preview" href="https://speakerdeck.com/chimame/b-test-with-docker">AB test with Docker</a>

## オンプレでPrivate Registry使ったDockerイメージの運用について

MicroAd インフラチームの[やっさん](https://twitter.com/yassan168)さんの登壇、オンプレでPrivate Registry使ったDockerイメージの運用について。 CircleCIで対応していない BuildKitを使えること、 [Portus](https://github.com/SUSE/Portus) を使ってリポジトリ上自動で管理するようにした。

<a class="link-preview" href="https://www.slideshare.net/yasukazunagatomi/20190524dockerkansai03/">オンプレでPrivate Registry使ったDockerイメージの運用について</a>

### 余談で、

時間が余ったこともありアンケートの時間がありました。 [directpoll](http://directpoll.com/) を使ったアンケート。これは v-kansaiでもやってみようと思った訳ですが、ひとまず今回の参加者層を聞く質問から入りました。アプリケーションレイヤを開発されている方を筆頭に、インフラをメインとされている方も多かったようです。

![dockerkansai3-directpoll1](//images.ctfassets.net/gzkue3szf85p/3oGMTp3jynui7gJWC8PCj3/eceae16f229a3bc68500cda03d020a2a/IMG_1273.JPG)

プロダウト環境は東京で AWS/GCPが多く、一方で大阪はオンプレが多いことを実感。

![dockerkansai3-directpoll2](//images.ctfassets.net/gzkue3szf85p/1MkQe169RfS75tQbeTRWJv/5812c5fb89aa31f4475c934a58401b84/IMG_1274.JPG)

Dockerの利用は本番環境でも多かったが、開発環境はそれ以上と。

![dockerkansai3-directpoll3](//images.ctfassets.net/gzkue3szf85p/3RC0mzSUOEgKXIImmIK57R/778f3aff6aa873d137ecf68de3421235/IMG_1276.JPG)

コンテナレジストリは DockerHubが流行りのようです。

![dockerkansai3-directpoll4](//images.ctfassets.net/gzkue3szf85p/3ox89qoYF6H2rNs4qs8Qq/d60e73fb5bb4bba46b6dca179a9ca3fc/IMG_1277.JPG)

## 最後に、

Docker界隈は Docker Osakaみたく、地域名では無く都市名が入っていないと Docker公式としての Meetupができないようで.. 🤔 全世界的にコミュニティ運営は、実に奥の深い世界だなぁと思った瞬間でした。
