# 「対話の余白」のデザイン素材

紙色 `#f3f0e7`、深緑 `#253b31`、朱色 `#ac432a` を基調に、日本語の明朝見出し、英語のセリフ体、読みやすい本文を組み合わせています。研究・経歴の内容は共通の `src/data/portfolioData.js` に保持し、視覚表現と公開事実の編集を分けています。

## フォント

| 用途 | 素材と配信方法 |
| --- | --- |
| 日本語の主要見出し・氏名 | Noto Serif JPの固定ウェイト500、40文字のWOFF2サブセットを自己配信。11,160 bytes |
| 英数字の本文・ナビゲーション | `@fontsource-variable/inter` のLatin WOFF2を1ファイルだけ自己配信。依存版は `package-lock.json` で固定 |
| 英語の装飾的な見出し | Georgia / Times New Roman / serif の端末フォント |
| 日本語の本文とフォールバック | Hiragino、Yu Gothic、Yu Mincho等の端末フォント |

Notoの実ファイルは [`src/assets/noto-serif-jp-headings-500.woff2`](../src/assets/noto-serif-jp-headings-500.woff2)。CSSでは `Portfolio Mincho` として、`font-weight: 500`、`font-style: normal`、`font-display: swap` を指定します。外部のフォントAPIへの通信は行いません。

### Notoの出典・ライセンス

出典は [Google FontsのNoto Serif JP](https://github.com/google/fonts/tree/main/ofl/notoserifjp)。再生成時の入力は、リビジョン `8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5` の [可変TTF原本](https://raw.githubusercontent.com/google/fonts/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf) と [OFL原文](https://raw.githubusercontent.com/google/fonts/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/notoserifjp/OFL.txt) です。

このサブセットはSIL Open Font License 1.1に基づく改変フォントです。元の著作権・商標・ライセンス情報をフォントmetadataに保持し、元のOFLを [`docs/licenses/noto-serif-jp-OFL.txt`](licenses/noto-serif-jp-OFL.txt) と [`public/font-license.txt`](../public/font-license.txt) に同梱しています。後者はビルド時に配信ルートの `font-license.txt` へコピーされます。OFLファイルのGoogleの著作権表示と、フォント内部のAdobeの著作権・Notoの商標表示を保持してください。

Interの出典とライセンスは [Inter公式リポジトリ](https://github.com/rsms/inter) と [SIL OFL 1.1](https://github.com/rsms/inter/blob/master/LICENSE.txt) を参照してください。導入済みパッケージにも原ライセンスを含みます。

### 収録範囲と再生成

対象は次の主要見出し6件と氏名です。改行を除き、氏名中の空白を含む40個の異なるUnicode文字を収録しています。

```text
感情から、問いをひらく。
研究・制作
インターン
大会・受賞等
考え方・技術
次の問いを、一緒に。
鈴木 真理
```

作成にはfontTools 4.64.0とBrotli 1.2.0を使用しました。[fontToolsのサブセット機能](https://fonttools.readthedocs.io/en/latest/subset/index.html)で、次の順に再生成できます。

1. 上記の固定リビジョンのTTFとOFLを取得し、見出し一覧から改行・タブを除いたUnicode集合を作る。
2. `fontTools.subset.Options` の `layout_features`、`name_IDs`、`name_languages` をそれぞれ `['*']`、`name_legacy` を `True` とし、ヒンティングを保持する。
3. `Subsetter.populate(unicodes=...)` と `Subsetter.subset(font)` で収録文字を限定する。
4. `instantiateVariableFont(font, {'wght': 500}, inplace=True)` で固定ウェイト500にし、`font.flavor = 'woff2'` として保存する。
5. 出力を再度読み、対象40文字の欠落がないこと、可変軸が残っていないこと、ウェイト500と元の著作権・商標・ライセンスmetadataが保たれていることを確認する。OFLも同梱し、ブラウザで対象見出しを確認する。

採用ファイルのSHA-256は `c19ee76ef54d82c6d1fd39e697b2e78fda2a81abecb64fc61e72998d75bd7de7` です。文字やツール版を変更して再生成した場合は、容量とハッシュを再計測してください。

対象の見出し・氏名を変える場合は、文字集合とサブセットを更新し、収録検査もやり直します。本文やその他の小見出しにこの40文字版を広く適用すると、未収録文字だけが端末フォントへ切り替わります。表示対象に合うフォント指定を維持してください。

## 抽象ビジュアル

[`src/assets/light-form.webp`](../src/assets/light-form.webp) は、2026年9月7日のデザイン制作でAI生成した、光と透明性を表す抽象装飾です。生成画像を配信用の960 × 1200ピクセルのWebPへ変換し、36,634 bytesで同梱しています。SHA-256は `c95023503e2443ba9f89c70d538c984640fbb323485b0d1cdfcfb4e44883f670` です。

この画像は本人の写真、証書、研究データ、研究結果、Polarisの実画面・実物を表すものではありません。ページでは装飾画像として空のaltを指定し、研究関心などの意味のある文章はHTMLで表示します。配信WebPにはEXIF・XMP metadataを含めていません。

サイトの再ビルドは同梱したWebPを入力として行います。AI画像の再生成で同一のピクセルが得られることは前提にしません。生成過程の会話、私的な画像・資料、プロンプト、試作や検証ログは公開素材に含めません。
