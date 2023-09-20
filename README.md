# ゆめみフロントエンドコーディング試験

DEMO： https://population.cho-ice.xyz/

## 環境構築

### リポジトリのクローン

`git clone https://github.com/avaice/yumemi-frontend-test.git`

`cd yumemi-frontend-test`

`npm ci`

`npm run dev`

### 環境変数の設定

プロジェクトのルートディレクトリに`.env`を作成する

```
RESAS_API_KEY="RESAS APIのトークン"
RESAS_API_ENDPOINT="https://opendata.resas-portal.go.jp"
```

### VSCodeで推奨される拡張機能

- markuplint
- eslint
- prettier
- csscomb

## 開発ガイドライン

### コミットメッセージ

Squash Mergeする（＝PRがマージされた後は使われないコミットメッセージ）ので、最低限何したかがわかれば良いです。

### Pull Request

AngularJSのコミットルール（ https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type ）に準拠したタイトルをつけてください。Squash Mergeされるのでタイトルはとても重要です。

どんな機能を実装したのか？改修したのか？と、もしあればスクショも添付してください。

## ディレクトリ構造

- app(main sourcecodes)
  - \_components(画面に表示されるコンポーネント類)
  - \_query(API fetcher)
  - \_utils(ユーティリティ関数、その他のロジック等)
  - api(BFF)
- docs(開発メモ等)
- public(画像などのリソース)

## キャッシュ戦略

このリポジトリに直接関係あるものではないですが、API Routesのレスポンスが遅すぎる（200~1000ms）ので、表示高速化のためにデプロイ先サーバーのリバースプロキシ（Nginx）でレスポンスのキャッシュを行なっています。このキャッシュは1時間有効なので、データが更新された場合に最大1時間古いデータを表示してしまう懸念がありますが、そもそも人口推移のデータは頻繁に変わるものではないので許容としました。
このリバースプロキシのキャッシュによって、平均20ms(avaiceの環境で計測)でレスポンスが返ってくるようになり、アプリケーションがサクサク使えるようになりました。

## 頑張ったこと

- 初期レンダリングに必要なデータはすべてサーバー側でfetchすることによって、初期レンダリングを完全にサーバー側で行うようにした。この結果、読み込み中の表示崩れが起こらなくなった
- mainブランチをProtected Branchに指定して、MergeするにはPull Requestを必須にした。Pull RequestはlintとtestのworkflowをPASSしないといけない設定にしたので、コードの品質を担保することができた
- RESAS APIの呼び出しをBFFが行うことによって、APIキーが外部に漏れる心配がなくなった
- キャッシュを適切に使用することで、高速な表示・動作が可能になった
- LightHouseの評価がスマホ、PCともに💯

## スクリーンショット

PC

<img width="1038" alt="image" src="https://github.com/avaice/yumemi-frontend-test/assets/80768507/0232f0ac-2c26-4886-aff6-7a4741e47708">

SP

<img width="727" alt="image" src="https://github.com/avaice/yumemi-frontend-test/assets/80768507/f796d11c-2cfa-4ae1-814f-e07cdc8deb55">

TABLET

<img width="840" alt="image" src="https://github.com/avaice/yumemi-frontend-test/assets/80768507/33787963-9b18-4bce-8b9a-2d7e52d21dd1">

