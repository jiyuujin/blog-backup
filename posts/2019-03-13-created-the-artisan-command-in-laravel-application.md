---
date: 2019-03-13
title: Artisanコマンドを自作する
description: Laravelで自作のArtisanコマンドを作る話を少し。
slug: created-the-artisan-command-in-laravel-application
category: Server
tags: 
 - Laravel
---

## Artisanコマンドを自作する

Laravelを構成している CLI (Command-Line Interface)である Artisanの話。今回は App\Console下で、独自のArtisanコマンドを自作する。シグネチャやコマンドの詳細を設定した上で、 `handle()` メソッドで実際にコマンドが叩かれた時に実行する処理を実装する。

https://laravel.com/docs/5.4/artisan

```bash
# コマンド一覧を確認できる
php artisan list
```

### 最終的には「一発叩けば」を実現

自作コマンドを定義するクラスで、シグネチャを指定して実行することができる状態を目指す。

```bash
# 自身で決めたシグネチャを指定して実行する
php artisan command:<シグネチャ>
```

## 自作コマンドを定義する

基本的にはシンプル。 `protected $title` にシグネチャを、 `protected $description` に詳細を入れる。 `fire()` メソッドにはコマンド発火時に何をするか処理を入れる。 `getArgument()` メソッドを使うとコマンドに引数を持つことが可能、 `array('example', InputArgument::REQUIRED, 'An example argument.')` を初期値として持っている。

```php
<?php
namespace App\Console\Commands;

class <自作コマンドを定義するクラス> extends Command
{
　　　　protected $signature = '<シグネチャ>';

　　　　protected $description = '<コマンドの詳細>';

　   public function __construct()
 　  {
  　     parent::__construct();
   　}

   　public function handle()
   　{
        //
   　}
}
```

## 使用するための準備

app/Console/Kernel.phpで上記で作った自作コマンドのクラスを定義。気軽にArtisanコマンドを自作、実行することができるようになった。

```php
<?php
namespace App\Console;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        // 適宜追加する
        <コマンドを定義するクラス>::class,
    ];
}
```
