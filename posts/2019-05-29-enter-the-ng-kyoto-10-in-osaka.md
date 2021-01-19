---
date: 2019-05-29
title: ng-kyoto オンラインリポート
description: AngularJS + PHPを触っていたことのある私ですが、久しぶりに Angular界隈に顔を出しました。
slug: enter-the-ng-kyoto-10-in-osaka
category: 
tags: 
 - Review
 - Node.js
---

## 久しぶりの参戦！

ng-kyoto自体、久しぶりの参戦となりました。 Vueの人間だと思われている私自身ですが、一年前まで AngularJSのプロジェクトも経験。 Vueを使ってリプレースを進めたこともありましたがこのプロジェクトが頓挫。 Angularアプリケーションを喰ひ繫ぐため、パフォーマンス面で「遅くしない」ことをモットーに style guideを策定したり、 webpack/cypressを採用しながらテストの自動化などにも取り組んでいました。

### サイボウズ株式会社にて、

当初は ng-kyotoのみ開催だったようですが、色々あって ng-jpとの合同開催が実現。

![ng-kyoto-10-in-cybozu](//images.ctfassets.net/gzkue3szf85p/30pcYPTDrQnxnTJjS2MbGe/d29054834257073bfaaefbff6f8c8bc2/cybozu.png)

通信品質のみならず、設備が総じて優れているなぁと感じました！

![ng-kyoto-10-on-air](//images.ctfassets.net/gzkue3szf85p/6ZfxGD2oMacD3Vski5VGQc/cfe46d05633d72f089095b35e91b2634/ng-kyoto-10-on-air.png)

## NG-Conf 2019 レポート (30min)

ng-japan代表 [@lacolaco](https://twitter.com/lacolaco)さんの登壇、 Keynoteの内容を中心に掻い摘んで話されました。 Angularの今、今日リリースされた v8など。互換性や進歩性、スケーラブルの下で Angularの設計を進めており、小規模アプリでは Angular Photonなど試験的プロジェクトの存在から軽量化する流れがあるようです。直近半年後には v9がリリース予定、バンドルサイズが 150KBから 14KBまで減る可能性があるそうです。

1. Difference Loading
   - 必要なブラウザだけ ES5 moduleを読み込むことで初期読込を高速化。
2. Bazel
   - ルール定義だけで判定。
3. Angular Material
   - MDC Wevを使ったデザインの統一化。

<a class="link-preview" href="https://docs.google.com/presentation/d/e/2PACX-1vRHm-WmKwGP8-U17euwrD6kiwzm65afZXPg1i71CgpOqh5jFjJD3w9_OI9ToD5u8py7D9rqRu8uQWaI/pub">NG-Conf 2019 レポート</a>

<a class="link-preview" href="https://juristr.com/blog/2019/05/Angular-8-and-the-Future-NGConf-2019-Roundup">Angular8 and the Future NGConf 2019</a>

## LT in Tokyo..

### Modern Angular への道

ソラコムの [Yuta Shimizu (@pachirel)](https://twitter.com/pachirel)さんの登壇、 AngularJSから Angularに移行したプロジェクトについて。現在はハイブリッド運用中、いずれは完全に Angularへの移行を目指しているとのこと。 gulp, bower, .. と懐かしいワードから John Papaさんの [Style Guide](https://johnpapa.net/)を参考にした。 webpack導入と同時に typescriptを入れ、 7割方移行完了した。ただし Protractorでコケたが、 Cypressに置き換えでテスト失敗時に自動的にスクショが保存されるなど、効率化が図れた。

<a class="link-preview" href="https://www.slideshare.net/YutaShimizu1/our-track-to-modern-angular">Modern Angular への道</a>

### Lesson learned after using Bazel

Sylabs.ioの [Jia Li (@Jialipassion)](https://twitter.com/Jialipassion)さんの登壇、 Bazelを使ってみた所感について。ルールを定義するだけで良く、 Bazelは自然と判断します。たとえばビルドタスクが `output = f(input)` のようなピュアな関数になれば、 Bazelは変更ファイルの影響するアウトプットを自然と計算してくれます。

<a class="link-preview" href="https://slides.com/jiali/deck-3">Lesson learned after using Bazel</a>

### 小規模チームにおけるドキュメント駆動開発のすすめ

[飯塚航平 (@chankolfin)](https://twitter.com/chankolfin) さんの登壇、Voicyの開発をメインに行なっている経験談について。サーバサイドも合わせ一人で進めている中で、一気にプロジェクトを進めることは実質不可能、 [compodoc](https://compodoc.app/)を使うことでドキュメントを自動作成したという話でした。

## LT in Osaka..

### 7 => 8　にあげてみた

[sayanaka (@zich)](https://twitter.com/zich８)さんの登壇、社内プロジェクトを Angular7から Angular8に更新。 ng updateに allオプション、 forceオプションを付けてもアップデート可能でしたが、今回は ng update 明示指定を選択した。基本的に動作は問題無かったが、差分を見てみます。 polyfill.tsでの変更点、 @ViewChild/@ComponentChildは第２引数が必要になったこと。

<a class="link-preview" href="https://speakerdeck.com/sayanaka/ng-kyoto-angular-meetup-10">7 => 8　にあげてみた</a>

### すごい大規模楽しく作ろう

[@s_kozake](https://twitter.com/s_kozake)さんの登壇、サーバサイドに Java SpringBootをバックエンドに持ち 1-2年と長く要件定義・設計を進めている話。中でも IE11対応は本当に辛いですね。。 4時間 × 12回のペースで社内勉強会を開催しながら地道にプロジェクトを進めた。 PCファーストだったので [PrimeNG](https://www.primefaces.org/primeng/)を採用。タブレットでの遅さ、コンポーネントの多い画面で顕著だった。 ChangeDetectionStrategy.OnPushでパフォーマンス改善に貢献しているとのこと。現状パフォーマンス面の事例が少ないので今後、増えてくると良いねという話でした。

### Angularはいいぞ！

Ionic Japan UG Organizer、(一社) リレーションデザイン研究所 代表の [榊原昌彦 (@rdlabo)](https://twitter.com/rdlabo)さんの登壇、 tipsysを作った経験談から話されました。 Angularで良かったこと。やっぱり `ng update` は便利。パッケージの選定に悩まなくなったこと、 [deprecated予定のパッケージ](https://angular.io/guide/deprecations)も確認することができるようですね。 あと余談ですが、 Ionic [日本語化](https://ionicframework.com/jp/docs/)が完了したようです、是非ご確認いただければという話でした。

<a class="link-preview" href="https://speakerdeck.com/rdlabo/angular-is-good">Angularはいいぞ！</a>

## 最後に、

ng-japan 2019 は 7/13 (土) 開催予定、既に所定の参加枠を上回っており中々の盛況振りですね！

<a class="link-preview" href="https://ngjapan.connpass.com/event/131180/">ng-japan 2019</a>
