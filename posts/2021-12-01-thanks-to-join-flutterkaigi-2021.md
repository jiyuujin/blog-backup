---
date: 2021-12-01
title: FlutterKaigi 2021 お疲れさまでした
description: この記事は Flutter Advent Calendar 2021 の 1 日目の記事です。昨日無事に終えた FlutterKaigi 2021 そのティザーサイトの製作裏話について、また Web アクセシビリティに取り組んだ経験を中心に今回書かせていただいた。
slug: thanks-to-join-flutterkaigi-2021
reaction: 💙
category: Application
tags: 
 - Flutter
 - FirebaseHosting
 - Hosting
 - A11Y
 - Web
 - Canvas
---

Flutter Meetup Tokyo #16 (2021/08/11) の場で FlutterKaigi が公に出た。

日本で初めて Flutter をメインテーマに扱う技術カンファレンスです。

桜の咲く前から水面下で話し合いを続けた。そして見事一昨日、無事開催に至った。

今日はその裏側で動いていたウェブサイトについて書かせていただく。

### feature

各種ページのご紹介です。

- トップ
- スタッフ一覧
- 採択セッション一覧
- (厳密に言えばページでは無い) ライセンス
- ティーザー (幕間用)
- インタールード (幕間用)

#### トップ

|Home|
|:---:|
|![](https://i.imgur.com/m4j4n0o.jpg)|

#### スタッフ一覧

|スタッフ|
|:---:|
|![](https://i.imgur.com/MhA2AAS.jpg)|

#### 採択セッション一覧

|セッション|
|:---:|
|![](https://i.imgur.com/u1iKmcJ.jpg)|

#### ライセンス

|ライセンス|
|:---:|
|![](https://i.imgur.com/syBHbkh.jpg)|

#### ティーザー (幕間用)

|ティーザー|
|:---:|
|![](https://i.imgur.com/HHeOOhU.jpg)|

#### インタールード (幕間用)

|インタールード|
|:---:|
|![](https://i.imgur.com/g7K1QAn.jpg)|

### コントリビュータ一覧

こうして積極的に公式ウェブサイト開発が進められたのも、コントリビュータあってのお陰です。改めて感謝を申し上げる次第です。

https://github.com/FlutterKaigi/confwebsite2021/graphs/contributors

## 製作のきっかけ

製作を開始したのはキックオフミーティングからひと月経った 2021 年 04 月。ウェブサイトの大枠としてごくシンプルな形ではその頃の時点で完成していた。

製作開始当時から考えていたウェブサイトのページデザインについて下記の通りだ。

- ウェブサイトのページデザインは私の頭で思い描いたものをアウトプットした
- 白を基調としたシンプルなもの、ロゴを中央にデカデカと持ってくる

ただしページデザインを Figma などのデザインツールで管理していない。

実際、ページデザインの微調整が入った際に正解というものが無い以上、デザイナーに描いてもらった方がそうした事態も防ぐことができ後々良かったことも事実だ。

## 技術スタック

Flutter をメインとするカンファレンスの開催にあたっては、 Flutter を使わないウェブサイト製作なんて全く考えられなかった。

製作を開始した 1 か月前に Flutter 2 が登場して Web が stable となり、思い切って Flutter for Web の事例を日本で創り出す必要があった。

具体的に書きたいトピックスは下記の通り。

- Flutter
    - Flutter Localization
    - Accessibility
- Firebase Hosting
    - (Github pages)

### ローカライゼーション

対応言語は英語と日本語。各種 Web ブラウザで選択されている言語に合わせており、言語切り替えの機能を盛り込んでいない。

`pubspec.yaml` に flutter_localizations を設定する。

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
```

生成する `l10n.yaml` のディレクトリ `lib/l10n` を指定する。

あと文言一覧 `app_ja.arb` 、 `app_en.arb` 並びに l10n の定義を記したファイルが必要だ。

```yaml
arb-dir: lib/l10n
template-arb-file: app_ja.arb
output-localization-file: app_localizations.dart
```

これをもってローカライゼーションの準備が整った。

## アクセシビリティについて考える

現時点で決して「完全な形」であるとは言えないが、スクリーンリーダーを使ってテストしたところ、最低限ボタンの名称が読み上げられていることの確認は取れた。

https://twitter.com/jiyuujinlab/status/1463671840056885253?s=20

そもそもアクセシビリティを考えるポイントは下記の通りです。

- スクリーンリーダーを使って読み上げられるか
    - Android では Talkback を使って確認する
    - Android では、専用の「ユーザー補助検証ツール」を使って確認する
    - iOS では VoiceOver を使って確認する
- 文字のサイズ、色と背景色のコントラストが考えられているか
- ボタンのタップ領域が考えられているか
- ボタンをホバーした時の挙動が考えられているか
- レイアウトが崩れることの無いか

当ウェブサイトを製作して分かったこと、それは Flutter デフォルトのウィジェットを採用している以上、最悪何も考えなくても達成できているようです。

さらに各ウィジェットと SemanticNode の関連度の付与を目的として、実際に `Semantic Widget` と絡めた設計を推し進める必要がある。実際 FlutterKaigi 2021 ウェブサイトではそこまで進められていないため、これが「完全な形」ではないひとつの根拠です。

昨日のセッション「アクセシビリティが高い Flutter アプリケーションを開発する」を改めて見直したい。

[@preview](https://speakerdeck.com/akihisasengoku/akusesibiriteigagao-iflutterapurikesiyonwokai-fa-suru)

### 色と背景色のコントラストを考える

FlutterKaigi 2021 ウェブサイトでは「捕色」を考えた。

Flutter のブランドカラー並びに FlutterKaigi ロゴはブルーを基調しており、その対角線上に存在するオレンジをイベント申込ボタンの背景色として設定することにした。

|FlutterKaigi ロゴ|申込・タイムテーブルボタン群|
|:---:|:---:|
|<img src="https://i.imgur.com/ieVWVs3.jpg" width="120px">|<img src="https://i.imgur.com/Pf3FOHG.jpg" width="180px">|

### ボタンのタップ領域を考える

タップ可能な領域が小さい場合、誤タップや押しづらさに繋がる。

![](https://i.imgur.com/Ph2zNJz.jpg)

また `SystemMouseCursors.click` を設定したことにより、手動でカーソルを実現できる。

```dart
return IconButton(
  tooltip: 'ツールチップ文言',
  icon: SvgPicture.asset(
    '/${'アイコン名'}.svg',
    width: 60,
  ),
  onPressed: () async {
    await launch('URL');
  },
  mouseCursor: SystemMouseCursors.click,
);
```

### ボタンをホバーした時の挙動を考える

ツールチップを設定した。

![](https://i.imgur.com/uDtDTE6.jpg)

ツールチップを設定したことで、そのボタンが何者であるかを示した。

```dart
Tooltip(
  message: appLocalizations.openMainEventPage,
  child: ElevatedButton(
    onPressed: () async {
      await launch(
        'https://flutterkaigi.connpass.com/event/226034',
         webOnlyWindowName: '_blank',
      );
    },
    style: ElevatedButton.styleFrom(
      shape: const StadiumBorder(),
      padding: const EdgeInsets.all(24),
      primary: Colors.deepOrange,
      onPrimary: Colors.black87,
    ),
    child: Text(
      appLocalizations.applyMainEvent,
      style: const TextStyle(
        color: Colors.white,
        fontSize: 20,
      ),
    ),
  ),
),
```

```dart
return Tooltip(
  message: 'ツールチップ文言',
  child: Card(
    child: Column(mainAxisSize: MainAxisSize.min, children: <Widget>[
      ListTile(
        title: Text(
          'タイトル',
          style: const TextStyle(
            fontSize: 15.0, fontWeight: FontWeight.bold),
          ),
          onTap: () {
            // タップ時の処理をここに書く
          },
        ),
      ]));
```

## 新しい発見もあった

白を基調としたシンプルなものに一定の満足を感じながら、無地の背景が殺風景であることに違和感を覚え、自ら issue を切ったところひとつの「提案」がやって来た。

DartPad でアニメーションを確認できる。

https://dartpad.dev/?id=ff4a449f0e9cfbb0b79d6e397d9ce12b&null_safety=true

DartPad は最近、パッケージサポートが入って Firebase や Google font なども書けるようになった。

折角の機会というもの有り難く、この FlutterLogo を無造作に散りばめたアニメーションを取り入れた。

```dart
final _random = math.Random();

class Logo {
  Offset position = Offset.zero;
  double angle = 0.0;

  final double rotateSpeed = _random.nextDouble() * math.pi * 0.01;
  final double speed = _random.nextDouble() * 1 + 0.5;
  final double size = _random.nextDouble() * 60 + 30;

  Logo(this.position);
}

final logos = ValueNotifier<List<Logo>>([]);

class _Canvas extends StatefulWidget {
  const _Canvas({Key? key, required this.size}) : super(key: key);

  final Size size;

  @override
  _CanvasState createState() => _CanvasState();
}

class _CanvasState extends State<_Canvas> with SingleTickerProviderStateMixin {
  late final _controller =
      AnimationController(vsync: this, duration: const Duration(days: 1))
        ..addListener(
          () {
            final update = [...logos.value];
            for (final logo in update) {
              logo.position += Offset(0, -logo.speed);
              logo.angle += logo.rotateSpeed;
              if (logo.position.dy < widget.size.height / 3) {
                final index = logos.value.indexOf(logo);
                update[index] = generateLogo();
              }
            }
            logos.value = update;
          },
        );

  @override
  void initState() {
    logos.value = List.generate(10, (index) => generateLogo());
    _controller.forward();
    super.initState();
  }

  Logo generateLogo() => Logo(Offset(
        widget.size.width * _random.nextDouble(),
        widget.size.height,
      ));

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: logos,
      builder: (context, List<Logo> value, _) => _Background(logos: value),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

### ホスティングについて

当初 `github.io` を利用する方法も模索していたが、実際は Firebase hosting のプレビュー・本番の 2 ステージという、結果としてはミニマムな形で進めた。

`channelId` を切り替えることで、デプロイ環境も自動的に切り替えられる。

```yml
jobs:
  build-deploy:
    runs-on: ubuntu-18.04

    steps:
      - name: Transpile
        run: |
          flutter build web --web-renderer html

      - name: Deploy
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT_FLUTTERKAIGI }}"
          projectId: flutterkaigi
          channelId: live # プレビュー環境か、本番環境か
        env:
          FIREBASE_CLI_PREVIEWS: hostingchannels
```

React や Vue 同様、経ったひとつのコマンドを実行することでシンプルなデプロイが実現する。

なお `--web-renderer html` を付けて実行している理由、それはレンダリング時に日本語の描画問題を回避してくれるためです。

## 最後に

FlutterKaigi 2021 無事開催でき、スタッフ一同ほっと一安心です。

また本日以降 Flutter Advent Calendar 2021 で様々な Flutter の知見が集まるでしょう。少し早いですが、良い一年をお迎えください。

### もうひとつ宣伝をば

明後日 12 月 3 日、年内最後の `Flutter Spaces Live!!` を開催予定です。

テーマは下記の通りです。

- 前半 FlutterKaigi 2021 の裏話
- 後半 2021 年 Dart/Flutter でこんな更新があった話

[@preview](https://flutter-jp.connpass.com/event/230112/)

ご気軽にご参加くださいませ。

### Apple WebGL 2.0 のエラーについて

当ウェブサイトを始め Flutter for Web 製のウェブサイトが iOS 15.0 / macOS Monterey 12.0.0 で表示されなくなった。

https://github.com/flutter/flutter/issues/89655#issuecomment-942813217

ですが、先月 26 日リリースの iOS 15.1 / macOS Monterey 12.0.1 でその不具合は治っている。

ただしこれ以前のバージョンでは `GPU Process: Canvas Rendering` をオフにしないとレンダリングされない。

`設定` - `Safari` - `詳細` - `Experimental Features` で設定して欲しい。

まだまだ Flutter for Web をプロダクションで使うには厳しいとも感じた次第です。
