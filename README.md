# ゆめみフロントエンドコーディング試験

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
