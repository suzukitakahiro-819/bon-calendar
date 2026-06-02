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
4. 作成した API キーの **アプリケーションの制限** で **HTTP リファラー** を設定し、以下を追加します。
   - `https://<username>.github.io/*`（本番サイト）
   - `http://localhost:5173/*`（ローカル開発）
   - `/bon-calendar/` だけに限定すると referer 不一致でブロックされることがあるため、`.github.io/*` 全体を許可するのが確実です。

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

## イベントの色分け

Google Calendar API からはイベント色（`colorId`）が取得できないため、**予定タイトルに含まれる文字列**で色を決めています。

設定ファイル: [`src/config/eventColorDictionary.json`](src/config/eventColorDictionary.json)

### 判定の仕組み

1. 予定タイトルに、下表の **反応する単語** のいずれかが含まれているかを調べる
2. **上の行ほど優先**（先にマッチした種別の色が使われる）
3. どれにも当てはまらない予定は、FullCalendar のデフォルト色（青）のまま

例: `伝通院盆踊り(仮)` は「みんなで野良盆」より先に **仮** にマッチするため、薄い灰色になります。

絵文字は **四角（🟥 など）と丸（🔴 など）の両方** に対応しています。

### 反応する単語一覧

| 優先 | 種別 | 目印 | タイトルに含まれたら反応する文字列 |
|:---:|---|:---:|---|
| 1 | 仮 | ⬜ | `⬜` / `⚪` / `仮イベント` / `(仮)` / `（仮）` / `仮）` |
| 2 | 大イベント・合宿 | 🟥 | `🟥` / `🔴` / `合宿` / `納涼` / `大イベント` |
| 3 | 主催イベント | 🟧 | `🟧` / `🟠` / `五月祭` / `駒場祭` / `主催` |
| 4 | お呼ばれイベント | 🟨 | `🟨` / `🟡` / `お呼ばれ` |
| 5 | みんなで野良盆 | 🟩 | `🟩` / `🟢` / `みんなで野良盆` |
| 6 | 練習会 | 🟦 | `🟦` / `🔵` / `練習会` / `練習` |
| 7 | その他 | 🟪 | `🟪` / `🟣` |

表示色は彩度を抑えたトーンにしています（目に負担が少ないよう調整）。

### ルールの追加・変更

`src/config/eventColorDictionary.json` を編集して `main` に push すると、GitHub Pages に反映されます。

```json
{
  "id": "major",
  "label": "大イベント・合宿",
  "patterns": ["🟥", "🔴", "合宿", "納涼", "大イベント"],
  "background": "#bf6b6b",
  "foreground": "#ffffff"
}
```

- `patterns` … タイトルの**部分一致**（この文字列が含まれていればマッチ）
- `label` … 画面上部の凡例に表示される名前
- より優先したい種別ほど、配列の**上**に書く

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに出力されます。

## 技術スタック

- React + TypeScript
- Vite
- FullCalendar（@fullcalendar/react, daygrid, list, google-calendar, interaction）
