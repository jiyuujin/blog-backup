---
date: 2020-05-20
title: もっと身近にやってたPWA
description: 目下 Next.js + AppSync と言うサーバレスアーキテクチャの下で進めるお仕事で Auth0 を採用したりと、これまでのPWAの活動録を登壇させていただきました。
slug: pwa-more-closer-2020
category: 
tags: 
 - Vue
 - AWS
 - TypeScript
 - PWA
---

## はじめに

まだコロナが日本の世に広まる前 (今年1月) yumemi.vue #5 で登壇させてもらって以来、久々公に出させていただきました。目下 Next.js + AppSync と言うサーバレスアーキテクチャの下で進めるお仕事について、設計のポイントなどを話す予定でしたが、如何せんボリュームが大変多くPWAの要素を強めたかったこともあいまって、これまでこのPWAを意識せずともUX(ユーザエクスペリエンス)を向上してきた話を中心に喋らせていただきます。

## そもそも、PWAをやっていますか？

私はこれまで知らず知らずの内に、色々とやっているようです。

- Range Pickerを始めとしたSP対応
- ユーザを逃さない施策をきっかけに始めたpush通知
- Auth0を使って簡単にマルチデバイス対応

もちろんこれだけに留まりませんが、最近は数多ある仕様を実現すると自然にPWAも達成されていることが多いと思います。今後も変わらず、意識せずにPWAと触れて、様々な課題を解決していくものだと感じました。

簡単な例を当ブログでも2つほどご紹介。

### ゲームのアプリ内ブラウザで

とにかくガチャ画像を含め素材の量が多く、Webサイトのパフォーマンスが気になりました。既にServiceWorkerをインストールする準備をしていました。

```js
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// キャッシュのバージョン管理の自動化
const VERSION = '<%= hash %>';
const STATIC_CACHE_KEY = 'static-' + VERSION;

const PRECACHE_URLS = [
    'index.php',
    './', // Alias for index.html
    './css/app.css',
    './js/app.js',
    './js/manifest.js',
    './js/vendor.js'
];

const CACHE_VERSION = 1;
let CURRENT_CACHES = {
    offline: 'offline-v' + CACHE_VERSION
};

const OFFLINE_URL = 'offline.html';

self.addEventListener('install', event => {
    //console.log('Installing...');
    if (typeof self.skipWaiting === 'function') {
        //console.log('self.skipWaiting() is supported.');
        event.waitUntil(
            caches.open(PRECACHE)
                .then(cache => cache.addAll(PRECACHE_URLS))
                .then(self.skipWaiting())
        );
    } else {
        console.log('self.skipWaiting() is not supported');
    }
});
```

ここではアプリ内ブラウザのとあるページでガチャを紹介する際に、その画像を適切に指定してはキャッシュするようにしました。

Aurora / RDBでユーザデータを管理していたこと。新規に始めていたプロジェクトだからこそ、ちゃんと通知を受け取ってくれるサーバをAWS Lambdaに準備して、このデータ郡と連携を取って、明確なターゲットや時間を設定できるようにしました。

### どうしても工数を取れない.. ><

とある会員限定向け管理画面の話、せめてログイン直後に自動で表示させる方法があります。

```js
const version = '';
const newestTopicId = `Topic_${version}`;

// クッキーを設定する
docCookies.setItem(
  `COOKIE_TOPIC_${version}`,
  newEstTopicId,
  new Date()
);

if (docCookies.getItem(`COOKIE_TOPIC_${version}`)) {
  // 存在した場合、ポップアップを表示する
}
```

ここまで来ると、もはやPWAやService Workerというよりも、ごく普通のスタイルを設定したようにしか、見えてこないですね。DOMを直接触って適切な場所にクッキーを保持するという、何とも思い切った方法ですが、全く方策を打たないよりかは全然良いのかもしれません。


## 構成について

今回はその中でもAuth0をID認証基盤に採用して進めているおしごとについて。

:::message is-primary
- フロントエンド: Next.js + styled-components (Evergreen)
- バックエンド: AppSync + DynamoDB
- ID認証基盤: Auth0
:::

### ID認証基盤選定のポイント

認証基盤にCognitoを採用しなかった理由。一度簡易アプリを作って試しましたものの、少々面倒臭い設定が多く煩わしさを感じたこと。特に要因として大きかったソーシャルネットワーキングの紐付けで、今回求められる仕様の中でもマルチデバイスからアクセスするという目標を達成するには非常に大きな障壁になっていました。

またアクセス回数とそれに付随して回数制限や料金面を考慮するとAuth0優勢に。

<a class="link-preview" href="https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/limits.html">Cognito limits</a>

Cognitoでも提供されているログイン画面がAuth0でも提供されていることは大変嬉しいもので、この辺りを考慮して結果的にAuth0を採用する形となりました。

### データ、とそれに付随したフロー選定のポイント

今回の PWA night の登壇では話題が離れてしまうため割愛させていただきましたが、バックエンドにAppSyncを採用しており、そこで利用できるデータソースは以下のように存在。

- DynamoDB table
- Lambda function
- Elasticsearch domain
- Relational database
- HTTP endpoint

その中でDynamoDBを選定して感じたメリット。それはバックエンドを一から実装する必要が無いこと。resolverをAppSyncに設定するだけで、データソースへのアクセスを容易に実現できる。おしごとで進める前、事前に趣味用の一環でデモアプリを作成・挙動を確認しました。その当時と設計方針には決定的な違いが存在、おしごとなど本番で運用する場合は新規追加や更新、削除など何らかの変更を加えるpostの手段はAWS lambdaで準備したfunctionを踏み台にして更新、すなわち直接データのやりとりを一切せず個別のIAMポリシーを併用して運用することにしました。

さらに詳しくは近い内に別の場でこの知見を共有させてもらえれば、と思います🙏

## 詳しく見ていくと、

認証基盤に採用したAuth0、Next.jsで

### Auth0を使うには、

事前に `Single Page Application` の作成から始めてもらって問題無いが、順を追ってAllowed Callback URLsに `http://localhost:3000` を、Allowed Logout URLsに `http://localhost:3000` を設定。

![Auth0_1](//images.ctfassets.net/gzkue3szf85p/6Nk9CK1KwdWrOeGRHknSYx/4f567417770a17b3878fb976ee723545/Auth0_1.png)

続いてAllowed Web Originsに `http://localhost:3000` を設定。

![Auth0_2](//images.ctfassets.net/gzkue3szf85p/6dTwfxLPdT9MiqPRr3rsWi/82045118a3d5edaa152a248942d57905/Auth0_2.png)

この中で一つでも欠けてしまうとWebサイト側の認証に失敗するので、必ず忘れずに設定を済ませること。

## Next.jsで呼び出すには、

認証するためのフックを以下のように作る。

```js
export const UserProvider = ({ value, children }) => {
  const { user } = value;

  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};
```

作ったフックを

```js
const DefaultLayout = ({
    user,
    loading = false,
    children
}: DefaultLayoutProps | any) => (
    <UserProvider value={{ user, loading }}>
        <main>
            <div className="container">{children}</div>
        </main>
    </UserProvider>
)
```

基本的にたったこれだけでログイン、ログアウトを実現することができます。

### ルールを作る

Lambdaで関数を立てるようにルールという機能がありますが、slack通知とメールアドレスのドメインによる制限を盛り込みました。この内前者はslack-notifyというプラグインを利用して実現できます。

```js
const blackList = ['dame.com'];

function() {
  if (context.protocol === 'oauth2-refresh-token') {
    return callback(null, user, context);
  }

  const isDenied = blackList.some(
    function (domain) {
      const emailSplit = user.email.split('@');
      return emailSplit[emailSplit.length - 1].toLowerCase() === domain;
    }
  );

  if (!isDenied) {
    return callback(new UnauthorizedError('拒否されました'));
  }

  if (new Date().getHours() === 7) {
    slack.alert({
      text: user.name || user.email,
      channel: '#notify'
    });
  }

  callback(null, user, context);
}
```

まだまだ使えそうな機能もありそうなAuth0。今後製作・運営を進めながら順次、気づいた点を含め知見を共有・発信していければと思います🙏

## 最後に、

今日のブログでは PWA night #16 で登壇させていただいたLTによる記事となります。

:::message is-primary
もっと身近にやってたPWA

https://slides.com/jiyuujin/more-closer-pwa
:::

