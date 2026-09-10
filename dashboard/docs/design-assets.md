# 透明な青い薔薇のデザイン素材

白 `#F8F9FA`、青 `#1674C9`、淡青 `#D3E3F2` を軸に、本人写真と研究紹介を同じ導入画面に置いています。本文は濃青、細いリンク文字は `#145DA0`。青い薔薇は本人が大切にしている可能性の象徴です。

## 写真・装飾

本人写真は、本人が承認した円形の表示範囲をローカルで抽出したWebPです。151×151pxの素材をPC最大144px、スマホ88pxで表示します。顔の生成補完は行っていません。原本資料やQRコードは公開しません。

`src/assets/blue-rose.webp` は、内蔵画像生成で制作した600×600pxの装飾用イラストです。実物の作品、研究成果、撮影した花ではありません。生成には「薄い透明なガラスの花弁、中心と縁の青、一輪、白背景、葉・台座・文字なし」という文章だけを使用しました。個人資料や本人写真を生成サービスへ渡していません。花は静止画で、読み込み前にも本文を読めます。

## 軽い粒子表現

Three UI Communityの [Predictive Arc](https://github.com/MengTo/threeui/blob/68802d5428071ada5c20db8094b1649e6bb770ed/src/shaders/predictive-arc/predictiveArcRenderer.ts) のCanvas 2D部分を、疎な青の粒子・透明背景・経過時間による動きへ変更しています。MITライセンスと著作権表示は `public/third-party-licenses.txt` に同梱します。全カタログ、Three.js、外部素材は取り込んでいません。

最大30fps、画面外・非表示タブでは停止。停止／再開操作を設け、`prefers-reduced-motion` は静止状態にします。Canvasを利用できない場合も静止画・本文・ナビゲーションは残ります。

## フォントとアイコン

既存のInter Latin Variable（48,256 bytes）を自己配信し、日本語はHiragino Kaku Gothic ProN、Yu Gothic等の端末フォントを使います。外部フォントAPIへの通信はありません。InterのSIL OFL 1.1と著作権表示は `public/font-license.txt` に保持。アイコンは既存のlucide-react（ISC）です。依存パッケージ・有料サービスは追加していません。

原資料・試作・比較画像・本人確認記録はGitと配信物の両方から除外します。本人が今回提供した言葉以外の経歴・日付・結果のデータは維持しています。
