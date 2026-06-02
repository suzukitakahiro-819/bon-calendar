# 盆イベントカレンダー

Google カレンダーの公開イベントを FullCalendar で見やすく表示する静的サイトです。GitHub Pages で公開することを前提としています。

## 機能

- Google カレンダーからイベントを取得して表示
- リスト表示（listMonth）と月表示（dayGridMonth）の切り替え
- 日本語ロケール
- イベント種別ごとの色分け凡例
- スマートフォン対応のレスポンシブデザイン

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/<your-username>/BonCalendar.git
cd BonCalendar
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成します。

```bash
cp .env.example .env
```

`.env` に以下の値を設定してください。

```
VITE_GOOGLE_CALENDAR_API_KEY=your_api_key_here
VITE_GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173/bon-calendar/ を開いて確認できます。

## Google Calendar API Key の取得

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセスし、プロジェクトを作成（または既存のプロジェクトを選択）します。
2. **API とサービス** → **ライブラリ** から **Google Calendar API** を有効にします。
3. **API とサービス** → **認証情報** → **認証情報を作成** → **API キー** を選択して API キーを作成します。
4. 作成した API キーの **アプリケーションの制限** で **HTTP リファラー** を設定し、本番サイトの URL（例: `https://<username>.github.io/bon-calendar/*`）を追加することを推奨します。
5. ローカル開発用に `http://localhost:5173/*` も追加しておくと便利です。

### カレンダー ID の確認

1. [Google カレンダー](https://calendar.google.com/) を開きます。
2. 対象カレンダーの **設定と共有** を開きます。
3. **カレンダーの統合** セクションの **カレンダー ID** をコピーします。
4. カレンダーが **一般公開** になっていることを確認してください（「一般公開して誰でも利用できるようにする」）。

## GitHub Pages 設定

### 1. GitHub Secrets の設定

リポジトリの **Settings** → **Secrets and variables** → **Actions** で、以下の Secrets を追加します。

| Secret 名 | 説明 |
|---|---|
| `VITE_GOOGLE_CALENDAR_API_KEY` | Google Calendar API キー |
| `VITE_GOOGLE_CALENDAR_ID` | 公開カレンダーの ID |

### 2. GitHub Pages の有効化

1. リポジトリの **Settings** → **Pages** を開きます。
2. **Build and deployment** の **Source** を **GitHub Actions** に設定します。

### 3. デプロイ

`main` ブランチに push すると、`.github/workflows/deploy.yml` により自動的にビルド・デプロイされます。

デプロイ後、以下の URL でアクセスできます。

```
https://<your-username>.github.io/bon-calendar/
```

## 色分け凡例

Google カレンダー上でイベントに設定した色と対応しています。

| 色 | 種別 |
|---|---|
| 🟢 緑 | 右近屋系大イベント・合宿 |
| 🟦 青 | 主催イベント |
| 🟡 黄 | お呼ばれイベント |
| 🟠 橙 | 野良盆 |
| 🟥 赤 | 野良盆［確定］ |
| 🟣 紫 | 練習会 |

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに出力されます。

## 技術スタック

- React + TypeScript
- Vite
- FullCalendar（@fullcalendar/react, daygrid, list, google-calendar, interaction）
# bon-calendar
