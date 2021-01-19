---
date: 2019-07-18
title: Reactで始めるサーバレス生活
description: Amplify + Cognitoを使った簡単な認証の下で稼働する管理画面を制作します。
slug: the-react-applications-in-serverless-architecture
category: Front
tags: 
 - React
 - AWS
---

## Reactを。。？

Web上で自身の職務経歴を管理することを目指す、というプロジェクトを進めている私ですが、この経験談を少しばかり触れたいと思います。ハマった部分も極めて少なく、導入編が中心となってしまいますが、悪しからず..🙏

```bash
# React (TS)
create-react-app <APPLICATION_NAME> --typescript
```

React v16.8は、兼ねてより大きく注目されていた Hooksを含んでいます。

<a class="link-preview" href="https://reactjs.org/blog/2019/02/06/react-v16.8.0.html"></a>

### AWSリソースを設定する

今回は Amplifyのライブラリを利用するために、 AWS側に必要なリソースをセットアップ。その設定ファイルをプロジェクト内に作成、複数のオプションを聞いてきますが特にデフォルトの設定のままで構いません。 (プロジェクト次第です)

```bash
amplify init
```

適宜使いたいサービスを追加、一方で初期化したい場合など追加済みのサービスを削除することも可能です。今回 AppSyncを使うため APIを追加します。またアプリケーションの認証に Cognitoを採用、 `Authentication Type` に `Amazon Cognito User Pool` を設定します。

```bash
amplify add[/remove] api
amplify push
```

実行すると簡単な CRUD処理を実現してくれる GraphQLのクエリが自動作成されます。

<a class="link-preview" href="https://aws-amplify.github.io/docs/js/react">aws-amplify</a>

## アプリケーションを設計する

そもそも、なぜ Amplifyだったか。

```tsx
import { withAuthenticator } from 'aws-amplify-react';

function App() {
  return (
    <div>
      <!-- コンテンツの中身 -->
    </div>
  );
}

export default withAuthenticator(App, {
  includeGreeting: true
});
```

`withAuthenticator` APIを利用することで簡単にアプリケーションの認証を実現できるから。

デフォルトの画面を使っても良いのですが、今回 webpack.config.jsを独自で書いていることもあり全てのカスタム化を目指して進めています。そのため、独自の登録・ログイン画面を作りたく `SignUp` / `SignIn` APIを利用することで実現できます。

```tsx
import { Authenticator, SignUp, SignIn } from 'aws-amplify-react';

function App() {
    return (
        <div>
            <Authenticator hideDefault={true}>
                <SignIn />
                <MyCustomSignUp override={SignUp}/>
            </Authenticator>
        </div>
    )
}

export default App;
```

カスタム化とはいえ、既に準備されている APIを呼び出すだけで開始できます。

## ここに、「力」を入れた！

今回ハマる箇所もなく現在進行形で進んでいますが、掻い摘んでご紹介しないといけません。スキーマとしてユーザ (UserForm)、経歴 (JobForm)など準備。それぞれのデータを `Object` という一纏めにして管理、型定義も合わせて `Object` の中で各項目を設定しています。

```ts
type JobForm {
    strong_point: string
    // ・・・
}

// ・・・
```

文字列を入力する場面が多く、以下のように極力纏めて作っています。

```tsx
const Component: React.FC<Props> = props => (
    <form className={props.className}>
        {(['strong_point', 'weak_point', 'self_introduction', ... ] as const).map(resumeIndex => (
            <input {/*・・・*/} />
        ))}
    </form>
)
```

気づかされるのは Form周りでシンプルに書けるようになった Hooks APIの存在の大きさ。

```tsx
const useJobs = () => {
    const [jobs, setJobs] = useState<JobForm[]>([]);
    useEffect(() => {
        (async () => {
            // 取得したり、追加したり、
        })
    })
}
```

`graphqlOperation` も Amplify側で既に準備されている APIです。自動生成された GraphQLのクエリを使って、データの取得や追加など最低限の CRUD処理を実現できます。

### 型周りでハマった。。

唯一ハマったことに Local環境下で Webサーバが立ち上がらない事象が発生。。

```bash
@types/aws-amplify-react(node:71116) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
```

調べていると tsconfig.json `noImplicitAny: false` に修正して解決しました。

## 最後に、

プロジェクト自体現在進行形ですので、随時共有できればと思います。
