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

## コミットメッセージ

Squash Mergeする（＝PRがマージされた後は使われないコミットメッセージ）ので、最低限何したかがわかれば良いです。

## Pull Request

AngularJSのコミットルール（ https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type ）に準拠したタイトルをつけてください。Squash Mergeされるのでタイトルはとても重要です。

どんな機能を実装したのか？改修したのか？と、もしあればスクショも添付してください。
