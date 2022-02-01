---
date: 2022-01-20
title: Web アクセシビリティ メモ
description: Web アクセシビリティの個人的備忘用にメモに際し、チェックリストの作成なども行っている。
slug: getting-started-a11y
reaction: 👩🏼‍🦽
category: Scrap
tags: 
 - A11Y
---

## Web アクセシビリティ向上にあたって

現在 @jiyuujin 自らジョインさせていただいているプロジェクトで freee アクセシビリティー・ガイドライン並びにチェック・リストを利用させていただく。

- [freee アクセシビリティー・ガイドライン](https://a11y-guidelines.freee.co.jp/)
- [freee アクセシビリティー・チェック・リスト](https://a11y-guidelines.freee.co.jp/checks/index.html)

こうした知見を活用する上で、まずは後者チェック・リストの形式で残しておくと良さそうです。

Web アクセシビリティ向上のために活動している米国の非営利団体 WebAIM (Web Accessibility in Mind) が策定した [WebAIM's WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist) を利用させていただく。

独自ガイドラインの作成を試みるより、先人たちの知恵を上手く利用する方が効率的です。

### Web アクセシビリティを進める理由

視聴覚や手・腕の動きに障害を持っている方はもちろん、加齢により機能が低下したりしても何らかの代替手段によって若者と同様に Web サイトを閲覧また操作できることを目指す。

Web アクセシビリティのレベルは国際標準「Web コンテンツ・アクセシビリティ・ガイドライン(WCAG) 2.0」や国内規格「JIS X 8341-3:2016」への準拠度によって示すことができる。

達成項目における「適合レベル」が A / AA / AAA の 3 段階で定められており AAA が最高位です。大まかには以下の 4 カテゴリーに分類でき、その中に個別の適合項目が列挙されている。

- 知覚可能: 情報が利用者の知覚できる方法で提示可能であること
- 操作可能: UI が問題なく操作可能であること
- 理解可能: 情報及び UI の操作が理解可能であること
- 堅牢性: 支援技術を含む UA (UserAgent) が確実に解釈できるよう堅牢であること

その際 [WCAG 2.1](https://waic.jp/docs/WCAG21/) (W3C 勧告 Web Content Accessibility Guidelines 2.1) は （HTML や CSS といった特定の技術以外にも適用できることを目的に抽象的に書かれているため) 具体的に何をすべきかを読み取りにくいと判断し、代わりに WebAIM のチェックリスト をベースにすることを決めていた。

## チェックリスト

なお、こちらのチェックリストは限定公開です。

[https://docs.google.com/spreadsheets/d/1M-NBu2QWsruxrmp4oJxecWi-Q9yIg0DKL3HqNONv5bU/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1M-NBu2QWsruxrmp4oJxecWi-Q9yIg0DKL3HqNONv5bU/edit?usp=sharing)

### 知覚可能

可能な Web コンテンツは、視覚、聴覚、触覚などの感覚で利用できる。

#### [1.1.1 Non-text Content](https://www.w3.org/TR/WCAG21/#non-text-content) (Level A)

- 画像、フォーム画像ボタン、イメージマップホットスポットには、適切で等価な代替テキストがある
- 内容を伝達しない画像、装飾的な画像、既にテキストで伝達されている内容を含む画像は、空の代替テキスト `alt=""` を与えるか CSS 背景として実装します。リンクされている画像にはすべて説明的な代替テキストをつける
- 複雑な画像には、それに相当する代替テキストを文脈の中で提供するか、別のリンク先ページで提供する
- フォームボタンには説明的な値がある
- マルチメディアが埋め込まれている場合は、アクセシブルなテキストで識別できるようにする

フレームや iframe に適切なタイトルが付けられている。

```html
<iframe src="ad.htm" title="Advertisement">
```

フォームの入力には関連するテキストラベルがある。

##### [Text Inputs](https://webaim.org/techniques/forms/controls#input)

```html
<label for="name">Name:</label>
<input id="name" type="text" autocomplete="name">
```

##### [Text Areas](https://webaim.org/techniques/forms/controls#textarea)

```html
<label for="address">Enter your address:</label><br>
<textarea id="address" autocomplete="street-address"></textarea>
```

##### [Checkboxes](https://webaim.org/techniques/forms/controls#checkbox)

```html
<fieldset>
<legend>Select your pizza toppings:</legend>
<input id="ham" type="checkbox" name="toppings" value="ham">
<label for="ham">Ham</label><br>
<input id="pepperoni" type="checkbox" name="toppings" value="pepperoni">
<label for="pepperoni">Pepperoni</label><br>
<input id="mushrooms" type="checkbox" name="toppings" value="mushrooms">
<label for="mushrooms">Mushrooms</label><br>
<input id="olives" type="checkbox" name="toppings" value="olives">
<label for="olives">Olives</label>
</fieldset>
```

##### [Radio Buttons](https://webaim.org/techniques/forms/controls#radio)

```html
<fieldset>
<legend>Choose a shipping method:</legend>
<input id="overnight" type="radio" name="shipping" value="overnight">
<label for="overnight">Overnight</label><br>
<input id="twoday" type="radio" name="shipping" value="twoday">
<label for="twoday">Two day</label><br>
<input id="ground" type="radio" name="shipping" value="ground">
<label for="ground">Ground</label>
</fieldset>
```

#### [1.2.1 Prerecorded Audio-only and Video-only](https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded) (Level A)

音声のみ（ポッドキャスト、MP3ファイルなど）の場合、関連するコンテンツのトランスクリプトが提供される。

関連するコンテンツのトランスクリプトまたはオーディオディスクリプションは、ビデオが装飾されていない限り、非ライブビデオオンリーで提供される。

#### [1.2.2 Captions (Prerecorded)](https://www.w3.org/TR/WCAG21/#captions-prerecorded) (Level A)

ライブ映像以外の映像 (YouTube 動画など) にキャプションを同期して表示する。

#### [1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded) (Level A)

ライブ映像でない場合は、トランスクリプトまたはオーディオディスクリプションが提供される。

音声では表示されない関連する映像コンテンツがある場合のみ必要です。

#### [1.2.4 Captions (Live)](https://www.w3.org/TR/WCAG21/#captions-live) (Level AA)

音声を含むライブメディア (音声のみの放送やウェブキャスト、ビデオ会議など) には、同期されたキャプションが提供される。

#### [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-description-prerecorded) (Level AA)

ライブ映像以外の映像には、音声ガイドが付く。音声に表示されない視覚的なコンテンツがある場合のみ必要です。レベル AA に必須ではないが、最適なアクセシビリティのために WebAIM は音声記述に加えてトランスクリプトを推奨している。

#### [1.2.6 Sign Language (Prerecorded)](https://www.w3.org/TR/WCAG21/#sign-language-prerecorded) (Level AAA)

音声を含むメディアには、手話映像が提供される。

#### [1.2.7 Extended Audio Description (Prerecorded)](https://www.w3.org/TR/WCAG21/#extended-audio-description-prerecorded) (Level AAA)

音声のタイミング（音声の間が足りないなど）の関係で映像に音声を付加できない場合、音声を付加できる間がある映像の代替版を提供する。

#### [1.2.8 Media Alternative (Prerecorded)](https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded) (Level AAA)

ビデオトラックがある録画済みメディアには、トランスクリプトが提供されます。最適なアクセシビリティのために、WebAIMはすべてのマルチメディアにトランスクリプトを付ける。

#### [1.2.9 Audio-only (Live)](https://www.w3.org/TR/WCAG21/#audio-only-live) (Level AAA)

音声があるライブコンテンツには、説明用のテキスト原稿（例えば、ライブ音声のスクリプト）が提供される。

#### [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships) (Level A)

セマンティックマークアップは、見出し `<h1>` や領域/ランドマーク、リスト `<ul>` / `<ol>` および `<dl>` 、強調または特殊テキスト `<strong>` や `<code>` 、 `<abbr>` 、 `<blockquote>` など。

表は表形式のデータに使用され、データセルはそれらのヘッダーに関連付けられる。データテーブルのキャプションが存在する場合にデータテーブルに関連付けられる。

テキストラベルはフォーム入力要素に関連付けられている。関連するフォーム要素は `fieldset` / `legend` でグループ化される。

#### [1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence) (Level A)

読む順番やナビゲーション（コード順で決定）は論理的で直感的です。

#### [1.3.3 Sensory Characteristics](https://www.w3.org/TR/WCAG21/#sensory-characteristics) (Level A)

形や大きさ、視覚的な位置に依存しない。

例: 「続けるには四角いアイコンをクリック」や「説明は右側の列にあります」など。

#### [1.3.4 Orientation](https://www.w3.org/TR/WCAG21/#orientation) (WCAG 2.1 Level AA)

ウェブコンテンツの向きは、特定の向きが必要な場合を除き、縦向き、横向きだけに限定されるものではありません。

#### [1.3.5 Identify Input Purpose](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (WCAG 2.1 Level AA)

特定の種類のユーザー情報を収集する入力フィールドには、適切なオートコンプリート属性が定義されている。

#### [1.3.6 Identify Purpose](https://www.w3.org/TR/WCAG21/#identify-purpose) (WCAG 2.1 Level AAA)

HTML5 リージョンや ARIA ランドマークは、ページの領域を特定するために使用される。

ARIA は、必要に応じて HTML のセマンティクスを強化し、インターフェースコンポーネントの目的をよりよく識別するために使用される。

#### [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) (Level A)

色を、内容を伝えたり、視覚的要素を区別する唯一の方法として使用しない。

リンクと周囲のテキストのコントラスト比が3:1以上で、リンクの上にカーソルを置いてフォーカスを得たときに追加の区別（例えば、下線）が提供されない限り、色だけでリンクを周囲のテキストと区別するために使用することはできない。

#### [1.4.2 Audio Control](https://www.w3.org/TR/WCAG21/#audio-control) (Level A)

ページ内で3秒以上自動再生される音声は、停止、一時停止、ミュート、音量調整ができる機構を設ける。

#### [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum) (Level AA)

テキストおよびテキストの画像は、4.5:1以上のコントラスト比を持つ。大きな文字は 18 ポイント以上 （通常 24 px） または 14 ポイント以上 （通常 18.66px） を有している。太字は少なくとも 3:1 のコントラスト比を有している。

#### [1.4.4 Resize text](https://www.w3.org/TR/WCAG21/#resize-text) (Level AA)

ページを 200% に拡大したときに、読みやすく機能的である。 1.4.10 （以下） では、拡大表示されたコンテンツに対して、より高い要件が導入されている。

#### [1.4.5 Images of Text](https://www.w3.org/TR/WCAG21/#images-of-text) (Level AA)

テキストだけで同じ視覚的表現ができる場合は、そのテキストを表現するために画像は使用されない。

#### [1.4.6 Contrast (Enhanced)](https://www.w3.org/TR/WCAG21/#contrast-enhanced) (Level AAA)

文字と文字の画像は 7:1 以上のコントラスト比を持つ。大きなテキストは、少なくとも 18 ポイント （通常 24px） または 14 ポイント （通常 18.66px） を有している。太字は、少なくとも 4.5：1 のコントラスト比を有している。

#### [1.4.7 Low or No Background Audio](https://www.w3.org/TR/WCAG21/#low-or-no-background-audio) (Level AAA)

音声は背景雑音がない、あるいは非常に少ないため、音声を容易に識別できる。

#### [1.4.8 Visual Presentation](https://www.w3.org/TR/WCAG21/#visual-presentation) (Level AAA)

- 1 文以上のテキストブロック
- 幅が 80 文字以下
- 完全な両端揃え （左右の余白に揃える） ではない
- 適切な行間 （テキストの高さの 1/2 以上） と段落間隔 （行間の 1.5 倍） を確保する
- 前景色と背景色が指定されている
  - CSS で特定の要素またはページ全体に適用できる （他の要素にも継承される）
- 文字サイズを 2 倍にしたときに水平方向のスクロールを必要としない

#### [1.4.9 Images of Text (No Exception)](https://www.w3.org/TR/WCAG21/#images-of-text-no-exception) (Level AAA)

画像内にテキストを使用するのは、装飾のため（画像では内容が伝わらない）、またはテキストだけでは情報が伝えられない場合のみです。

#### [1.4.10 Reflow](https://www.w3.org/TR/WCAG21/#reflow) (WCAG 2.1 Level AA)

コンテンツや機能の損失は発生せず、横幅320ピクセルでコンテンツを表示しても、横スクロールは回避される。このためほとんどの Web サイトでは、レスポンシブデザインが必要です。 Web ブラウザの window 幅を 1280px に設定、ページのコンテンツを 400% にズームしてテストするのが最適です

データテーブル、複雑な画像 （地図やチャート） 、ツールバーなど、水平スクロールを必要とするコンテンツは除外される。

#### [1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast)(WCAG 2.1 Level AA)

- グラフィックオブジェクト （アイコンやチャートやグラフの構成要素） とカスタマイズしたインタフェースコンポーネント (ボタン、フォームコントロール、フォーカスインジケータ、アウトライン) を区別するために、少なくとも 3:1 のコントラスト比が存在する
- カスタマイズされたインタラクティブコンポーネントの様々な状態 （フォーカス、ホバー、アクティブ） で、少なくとも 3:1 のコントラストが提供されなければならない

#### [1.4.12 Text Spacing](https://www.w3.org/TR/WCAG21/#text-spacing) (WCAG 2.1 Level AA)

段落の間隔をフォントサイズの2倍、テキストの行の高さ・間隔をフォントサイズの1.5倍、単語の間隔をフォントサイズの0.16倍、文字の間隔をフォントサイズの0.12倍に適応しても、内容や機能の損失は生じません。テキストを含む要素のピクセル高さの定義を避けることで最もよくサポートされる。

#### [1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (WCAG 2.1 Level AA)

ホバーやキーボードのフォーカスで追加コンテンツが表示される場合、新たに表示されたコンテンツは、入力エラーが発生したり、他のページのコンテンツを隠したり邪魔になったりしない限り、ポインタやキーボードのフォーカスを動かさずに（一般にEscキーで）削除することができます。ポインターを新しいコンテンツに移動させても、コンテンツは消えません。新しいコンテンツは、ポインタまたはキーボードのフォーカスがトリガーとなるコントロールから離れるか、新しいコンテンツが削除されるか、または新しいコンテンツが関連しなくなるまで、表示され続けなければならない。

### 操作可能

インターフェイスのフォーム、コントロール、ナビゲーションが操作可能である。

#### [2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard) (Level A)

キーボードで実現できない機能（フリーハンド描画など）を除き、すべてのページ機能をキーボードで利用できるようにしました。

ページ指定のショートカットキーやアクセスキー（アクセスキーは通常避けるべき）は、既存のブラウザやスクリーンリーダーのショートカットと競合しないようにする。

#### [2.1.2 No Keyboard Trap](https://www.w3.org/TR/WCAG21/#no-keyboard-trap) (Level A)

キーボードのフォーカスが特定のページ要素に固定されることはありません。ユーザーはキーボードのみを使用して、ナビゲーション可能なすべてのページ要素に移動することができる。

#### [2.1.3 Keyboard (No Exception)](https://www.w3.org/TR/WCAG21/#keyboard-no-exception) (Level AAA)

すべてのページ機能をキーボードで操作できる。

#### [2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (WCAG 2.1 Level A)

キーボードショートカットが印刷可能な文字キーを使用している場合、ユーザーはキーコマンドを無効にしたり、定義されたキーを印刷不可能なキー（Ctrl、Altなど）に変更したり、関連するインターフェースコンポーネントやボタンがフォーカスされたときにのみショートカットを有効にすることができる必要がある。

#### [2.2.1 Timing Adjustable](https://www.w3.org/TR/WCAG21/#timing-adjustable) (Level A)

ページやアプリケーションに時間制限がある場合、ユーザーにはその制限をオフにしたり、調整したり、延長したりするオプションが与えられます。ただし、リアルタイムのイベント（オークションなど）で時間制限が絶対必要な場合や、時間制限が20時間以上の場合はこの限りではありません。

#### [2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG21/#pause-stop-hide) (Level A)

5秒以上続く自動的に動く、点滅する、またはスクロールするコンテンツ（カルーセル、マルク、アニメーションなど）は、ユーザーによって一時停止、停止、または非表示にすることができる。

自動的に更新されるコンテンツ（例えば、動的に更新されるニュースティッカー、チャットメッセージなど）は、ユーザーによって一時停止、停止、または非表示にすることができ、ユーザーは更新のタイミングを手動で制御することができる。

#### [2.2.3 No Timing](https://www.w3.org/TR/WCAG21/#no-timing) (Level AAA)

コンテンツや機能には、時間的な制限や制約がありません。

#### [2.2.4 Interruptions](https://www.w3.org/TR/WCAG21/#interruptions) (Level AAA)

割り込み（アラート、ページ更新など）は、ユーザーが延期または抑制することができる。

#### [2.2.5 Re-authenticating](https://www.w3.org/TR/WCAG21/#re-authenticating) (Level AAA)

認証セッションが終了した場合、ユーザーは再認証を行い、現在のページのデータを失うことなく活動を継続できる。

#### [2.2.6 Timeouts](https://www.w3.org/TR/WCAG21/#timeouts) (WCAG 2.1)

ユーザーが20時間以上活動していない状態でデータが保存されない限り、データ消失の可能性があるタイムアウトについてユーザーに警告しなければならない。

#### [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold) (Level A)

ページコンテンツが1秒間に3回以上点滅することはありません。ただし、点滅するコンテンツが十分に小さく、点滅が低コントラストで赤色が多すぎない場合は除きます。(一般的なフラッシュと赤色フラッシュのしきい値を参照）。

#### [2.3.2 Three Flashes](https://www.w3.org/TR/WCAG21/#three-flashes) (Level AAA)

1秒間に3回以上点滅するページコンテンツはありません。

#### [2.3.3 Animation from Interactions](https://www.w3.org/TR/WCAG21/#animation-from-interactions) (WCAG 2.1 Level AAA)

ユーザーとのインタラクションをきっかけとした、必要のないアニメーションやムーブメントを無効にできる。

#### [2.4.1 Bypass Blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks) (Level A)

ウェブページ間で繰り返されるナビゲーションやその他のページ要素をスキップするためのリンクが提供されている。

適切な見出し構造および/またはページ領域/ランドマークの識別は、十分なテクニックと見なされるかもしれません。見出しや領域によるナビゲーションはほとんどのブラウザでサポートされていないため、WebAIMでは、目の見えるキーボードユーザーを最もよくサポートするために、見出しや領域に加えて「スキップ」リンクを推奨している。

#### [2.4.2 Page Titled](https://www.w3.org/TR/WCAG21/#page-titled) (Level A)

ウェブページには、説明的で情報量の多いページタイトルが付けられている。

#### [2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order) (Level A)

リンクやフォーム要素などのナビゲーションは、論理的で直感的な順序になっている。

#### [2.4.4 Link Purpose (In Context)](https://www.w3.org/TR/WCAG21/#link-purpose-in-context) (Level A)

各リンク（またはフォーム画像ボタンやイメージマップホットスポット）の目的は、リンクテキストのみ、またはリンクテキストとそのコンテキスト（周囲のテキスト、リストアイテム、前の見出し、テーブルヘッダーなど）から判断できる。

同じテキストを持つリンク（またはフォーム画像ボタン）が異なる場所に移動する場合は、容易に区別がつく。

#### [2.4.5 Multiple Ways](https://www.w3.org/TR/WCAG21/#multiple-ways) (Level AA)

関連ページ一覧、目次、サイトマップ、サイト内検索、全ページ一覧のうち、少なくとも2つの方法で、サイト内の他のウェブページを探すことができる。

#### [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG21/#headings-and-labels) (Level AA)

フォームやインタラクティブ・コントロールのページ見出しやラベルは、情報を提供するものである。見出し（例：「詳細」）やラベルテキスト（例：「名前」）の重複は、構造上適切な区別がつかない限り避ける。

#### [2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible) (Level AA)

どのページ要素に現在のキーボードフォーカスがあるかが視覚的にわかる（つまり、ページをタブで移動すると、自分がどこにいるかがわかる）ようになっている。

#### [2.4.8 Location](https://www.w3.org/TR/WCAG21/#location) (Level AAA)

ウェブページが一連のページの一部である場合や複雑なサイト構造の場合、例えばパンくずや一連のページの現在のステップ（例えば「Step 2 of 5 - Shipping Address」）を指定することによって、現在のページの位置を示すことができる。

#### [2.4.9 Link Purpose (Link Only)](https://www.w3.org/TR/WCAG21/#link-purpose-link-only) (Level AAA)

各リンク（またはフォーム画像ボタン、イメージマップホットスポット）の目的は、リンクテキストのみから判断することができる。

同じテキストを持つリンク（またはフォームイメージボタン）が異なる場所に行くことはありません。

#### [2.4.10 Section Headings](https://www.w3.org/TR/WCAG21/#section-headings) (Level AAA)

文書全体の構造だけでなく、コンテンツの個々のセクションは、必要に応じて見出しを使用して指定される。

#### [2.5.1 Pointer Gestures](https://www.w3.org/TR/WCAG21/#pointer-gestures) (WCAG 2.1 Level A)

多点または経路ベースのジェスチャー（画面をつまむ、スワイプする、ドラッグするなど）が機能にとって不可欠でない場合は、1点の起動（ボタンの起動など）で機能を実行できる。

#### [2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (WCAG 2.1 Level A)

コントロールの不用意な起動を避けるため、画面をクリック、タップ、長押ししたときに、不要なダウンイベント（onmousedownなど）を起動させないようにしてください。代わりにonclickやonmouseupなどを使用してください。onmouseup（または類似のもの）を使用する場合は、実行されたアクションを中止または元に戻すメカニズムを提供する必要がある。

#### [2.5.3 Label in Name](https://www.w3.org/TR/WCAG21/#label-in-name) (WCAG 2.1 Level A)

インターフェース部品（リンク、ボタンなど）がテキスト（またはテキストの画像）を提示する場合、その部品のアクセス可能な名前（ラベル、代替テキスト、aria-labelなど）は、可視テキストを含まなければなりません。

#### [2.5.4 Motion Actuation](https://www.w3.org/TR/WCAG21/#motion-actuation) (WCAG 2.1 Level A)

モバイル機器のシェイクやパンなど、機器を動かすことで起動する機能や、カメラに向かって手を振るなど、ユーザーの動作によって起動する機能は無効化し、ボタンなどの標準的なコントロールで同等の機能を提供することが可能です。

#### [2.5.5 Target Size](https://www.w3.org/TR/WCAG21/#target-size) (WCAG 2.1 Level AAA)

クリックできるターゲットは、そのサイズの代替ターゲットが提供されている、ターゲットがインラインである（文中のリンクなど）、ターゲットがオーサーモディファイされていない（デフォルトのチェックボックスなど）、または小さなターゲットサイズが機能上不可欠である場合を除いて、少なくとも44×44ピクセルのサイズでなければなりません。

#### [2.5.6 Concurrent Input Mechanisms](https://www.w3.org/TR/WCAG21/#concurrent-input-mechanisms) (WCAG 2.1 Level AAA)

コンテンツは、タッチのみ、キーボードのみといった特定のモダリティへの入力を制限するものではなく、代替入力（モバイルデバイスでのキーボード使用など）をサポートする必要がある。

### 理解可能

情報とユーザーインターフェイスの操作は理解できる必要がある。

#### [3.1.1 Language of Page](https://www.w3.org/TR/WCAG21/#language-of-page) (Level A)

ページの言語は、HTMLのlang属性（例: `<html lang="en">`）で識別される。

#### [3.1.2 Language of Parts](https://www.w3.org/TR/WCAG21/#language-of-parts) (Level AA)

異なる言語で書かれているページ内容の言語は、lang属性を使って識別される（例: `<blockquote lang="es">`）。

#### [3.1.3 Unusual Words](https://www.w3.org/TR/WCAG21/#unusual-words) (Level AAA)

曖昧な言葉、馴染みのない言葉、非常に特殊な使われ方をする言葉は、隣接するテキスト、定義リスト、用語集、その他の適切な方法で定義されている。

#### [3.1.4 Abbreviations](https://www.w3.org/TR/WCAG21/#abbreviations) (Level AAA)

見慣れない略語の意味は、初めて使われるときに `<abbr>` 要素で展開するか、定義や用語集にリンクすることで提供される。

#### [3.1.5 Reading Level](https://www.w3.org/TR/WCAG21/#reading-level) (Level AAA)

初等教育9年程度の人が合理的に読むことができない高度な内容については、より理解しやすい代替手段を用意している。

#### [3.1.6 Pronunciation](https://www.w3.org/TR/WCAG21/#pronunciation) (Level AAA)

発音が重要な単語は、その単語の直後に発音を記載するか、リンクや用語集で紹介している。

#### [3.2.1 On Focus](https://www.w3.org/TR/WCAG21/#on-focus) (Level A)

ページ要素にフォーカスが当たった場合、ページの大幅な変更、ポップアップウィンドウの発生、キーボードフォーカスの追加変更など、ユーザーを混乱させたり方向感覚を失わせたりするような変化は発生しません。

#### [3.2.2 On Input](https://www.w3.org/TR/WCAG21/#on-input) (Level A)

ユーザーが情報を入力したり、コントロールと対話したりするとき、ユーザーに前もって知らせない限り、ページの大幅な変更、ポップアップウィンドウの発生、キーボードフォーカスの追加変更、その他ユーザーを混乱させたり方向転換させたりするような変更は発生しません。

#### [3.2.3 Consistent Navigation](https://www.w3.org/TR/WCAG21/#consistent-navigation) (Level AA)

ウェブページ上で繰り返されるナビゲーションリンクは、サイト内を移動する際に順番が変わることはありません。

#### [3.2.4 Consistent Identification](https://www.w3.org/TR/WCAG21/#consistent-identification) (Level AA)

複数のウェブページにまたがって同じ機能を持つ要素は、一貫して識別される。例えば、サイト上部の検索ボックスは常に同じ方法でラベル付けする。

#### [3.2.5 Change on Request](https://www.w3.org/TR/WCAG21/#change-on-request) (Level AAA)

ページの大幅な変更、ポップアップウィンドウの出現、キーボードフォーカスの無制限な変更、その他ユーザーを混乱させたり方向感覚を失わせたりするような変更は、ユーザーによって開始される必要があります。また、そのような変更を無効にするオプションも用意されている。

#### [3.3.1 Error Identification](https://www.w3.org/TR/WCAG21/#error-identification) (Level A)

必須のフォーム要素や、特定のフォーマット、値、長さを必要とするフォーム要素は、要素のラベルでこの情報を提供する。

フォームの検証エラーは、効率的で直感的、かつアクセスしやすくなっています。エラーが明確に特定され、問題のある要素に素早くアクセスでき、ユーザーは簡単にエラーを修正してフォームを再送信できる。

#### [3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG21/#labels-or-instructions) (Level A)

必要なインタラクティブ要素について、説明、例、適切な位置のフォームラベル、フィールドセット/凡例により、十分なラベル、合図、指示が提供されている。

#### [3.3.3 Error Suggestion](https://www.w3.org/TR/WCAG21/#error-suggestion) (Level AA)

入力エラーが検出された場合（クライアントサイドまたはサーバーサイドの検証による）、タイムリーかつアクセスしやすい方法で入力を修正するための提案が提供されている。

#### [3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/TR/WCAG21/#minimize-error-reversible) (Level AA)

ユーザーが法律、財務、試験データなどを変更・削除できる場合、変更・削除の取り消し、検証、確認が可能です。

#### [3.3.5 Help](https://www.w3.org/TR/WCAG21/#help) (Level AAA)

フォームの完成と提出を助けるために、指示と合図が文脈で提供されている。

#### [3.3.6 Error Prevention (All)](https://www.w3.org/TR/WCAG21/#error-prevention-all) (Level AAA)

ユーザーが情報を送信できる場合、その送信は可逆的、検証的、または確認的である。

### 堅牢性

コンテンツは、支援技術を含むさまざまなユーザーエージェントが解釈できるように十分に堅牢である必要がある。

#### [4.1.1 Parsing](https://www.w3.org/TR/WCAG21/#parsing) (Level A)

HTML のバリデーションやパースの重大なエラーを回避することができる。 http://validator.w3.org/ で確認してください。

#### [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

アクセシビリティを考慮したマークアップを行う。これには HTML の仕様に従い、フォーム、フォームラベル、フレームタイトルなどを適切に使用することが含まれる。

HTML では不十分な場合は、アクセシビリティを高めるためにARIAを適切に使用する。

#### [4.1.3 Status Messages](https://www.w3.org/TR/WCAG21/#status-messages) (WCAG 2.1 Level AA)

重要なステータスメッセージが表示され、そのメッセージにフォーカスが設定されていない場合は、ARIAアラートまたはライブリージョンによって、スクリーンリーダーのユーザーにメッセージを通知する必要がある。

## 優先度

- テキストのコントラスト
- 画像および代替テキスト
  - alt 属性
- フォーム入力要素のラベル
  - `<label>` 要素
  - aria-label 属性
  - aria-labelledby 属性
- 見出し
- ランドマーク
- WAI-ARIA
- あいまいなリンクラベル
  - `click here`
  - `more`
  - `continue`

## 法的制約

法的制約は 2021 年に障害者差別解消法が改正されたことを受けて、民間事業者も Web アクセシビリティ対応が義務化された点にも注意したい。

## 最後に

WCAG 自体更新され続けており (今後も更新されることが予想されており) WebAIM の策定しているチェックリストも更新されていくことが予想される。

そうした周りの状況に付随してプロジェクトのガイドラインも更新の必要に迫られる訳で、そのメンテナンスコストもばかにならないなと考えている。

### 参照・法律

- 障害者の権利に関する条約 (略称：障害者権利条約)
  - https://www.mofa.go.jp/mofaj/gaiko/jinken/index_shogaisha.html
- 障害を理由とする差別の解消の推進
  - https://www8.cao.go.jp/shougai/suishin/sabekai.html
- 障害を理由とする差別の解消の推進に関する法律
  - https://www8.cao.go.jp/shougai/suishin/law_h25-65.html
- みんなの公共サイト運用ガイドライン (2016 年版)
  - https://www.soumu.go.jp/main_sosiki/joho_tsusin/b_free/guideline.html
- 障害を理由とする差別の解消の推進に関する法律の一部を改正する法律案 - 参議院
  - https://www.sangiin.go.jp/japanese/joho1/kousei/gian/204/meisai/m204080204059.htm
- 閣法 第204回国会 59 障害を理由とする差別の解消の推進に関する法律の一部を改正する法律案 - 衆議院
  - https://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/honbun/g20409059.htm
- 障害者差別解消法の見直しの検討に係る団体ヒアリング
  - https://www8.cao.go.jp/shougai/suishin/sabekai/group_hearing/index.html
