---
date: 2019-07-15
title: Python Kansai リポート
description: 個人的に夕方までの参加と時間の制約はありましたが、少しお邪魔させていただきました。
slug: enter-the-python-kansai-1-in-osaka
category: 
tags: 
 - Python
 - Review
---

## 第1弾だったようで！

めでたく第1弾の開催、素直におめでとうございます..🎉

<a class="link-preview" href="https://scrapbox.io/pythonKansai/Python_Kansai_01_everyone's_note">scrapbox</a>

## 参加メモ

今回 [Scrapbox](https://scrapbox.io/pythonKansai/Python_Kansai_01_everyone's_note) (上記を参照してください) を準備していただいたようで、基本的に [Scrapbox](https://scrapbox.io/pythonKansai/Python_Kansai_01_everyone's_note) をご参照いただければ。🙏 とはいえ簡単にまとめてますので、良ければどうぞー

### 並列処理を使うと DASKは便利

HPCソリューションズ 飯坂剛一さんから、並列処理を使うと DASKは便利という話。基本はどれだけ並列性を盛り込めるか、アムダールの法則があります。メモリに入りきらない、時間のかかる処理などで DASKを使うと楽に実現できるそう。

<a class="link-preview" href="https://dask.org/">dask</a>

### エッジ AIでどう使っていくかハード寄りの観点からアプローチ

続いて株式会社ハカルス CTO [染田貴志 (@tksmd)](https://twitter.com/tksmd)さんから、エッジ AIでどう使っていくかハード寄りの観点から話されましたが潤沢なコンピューティングリソースを使うクラウド AIと対比した説明は印象的でした。ちなみに私を含め、現時点でエッジ AIを使っている方は少数派でした。

推論チップセットは群雄割拠、一番分かり易い例はラズパイ。 Pythonといえば [PINQ Z1](https://store.digilentinc.com/pynq-z1-python-productivity-for-zynq-7000-arm-fpga-soc/)、 Google Coralは楽に構築できて AUTOMLのモデルをも読み込めるらしいのでオススメという話でした。

<a class="link-preview" href="https://speakerdeck.com/hacarus/etuziaitopython">エッジAIとPython</a>

### Linked Open Data (LOD) の公開・利用方法

最後に大阪電気通信大学 古崎晃司さんから、海外では既にアプリケーションの一つとして使われ始める LOD (Linked Open Data)について。ちなみに私を含めこの LOD、 SPARQLまで知っている方は少数派でした。属性 (RDF / Resource Description Framework) に機械可読な形式として保存 (Webの場合の RDFは URL) Wikipediaにはウィキデータへのリンクが存在しているので、クエリを自由に変更して吐き出すこともできるそう。

<a class="link-preview" href="https://www.slideshare.net/KoujiKozaki/linked-open-datalod-155413298">Linked Open Data (LOD) の基本的な使い方</a>

## 最後に、

各コミュニティ 次回のご案内を含めて。

### 大阪で、

1. 直近平日の開催は 7/16 (火) もくもく会 #30
    - <a class="link-preview" href="https://osakapython.connpass.com/event/138852/">大阪Pythonの会 もくもく会 #30</a>
2. 直近土日の開催は 7/28 (日) もくもく会 #32
    - <a class="link-preview" href="https://osakapython.connpass.com/event/138855/">大阪Pythonの会 もくもく会 #32</a>

### 京都で、

7/19 (金) ディスカッションの会だそうです。

<a class="link-preview" href="https://hannari-python.connpass.com/event/136555/">はんなりPythonの会</a>