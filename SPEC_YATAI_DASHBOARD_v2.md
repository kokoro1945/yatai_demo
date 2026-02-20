# 屋台管理ダッシュボード Webアプリ 仕様書（v2：ブロック配置UI対応）

> 本書は CodeX にそのまま渡して実装・修正を依頼できるように、**具体的な差分指示**を追記した版です。  
> 既存の実装（文字の羅列リスト）を、**配置図（ブロック）UI**に置き換えます。

---

## 1. プロジェクト概要

大学祭屋台管理をデジタル化するためのWebアプリケーションを開発する。

本アプリは以下を目的とする：

- 屋台情報の一元管理
- 当日ステータスのリアルタイム共有
- 巡回者と本部間の情報共有
- データ蓄積による次年度引き継ぎ効率化

---

## 2. 技術構成

### フロントエンド
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS（推奨）

### バックエンド
- Next.js Route Handler (/api)
- Repositoryパターン採用

### データベース
- 現在：Google Sheets（API経由）
- 将来：Supabase(PostgreSQL)へ差し替え予定

### 重要設計方針
- フロントエンドから直接Google Sheets APIを叩かない
- データアクセスは必ずRepository経由
- Supabaseへ差し替え可能な構造にする

---

## 3. ディレクトリ構成（v2で追加あり）

```
yatai-dashboard/
  app/
    page.tsx                     # 屋台一覧（ブロック配置UI）
    yatai/[id]/page.tsx          # 屋台詳細（任意：残してOK）
    api/
      yatai/route.ts             # GET一覧
      yatai/[id]/route.ts        # GET詳細
      status/[id]/route.ts       # PATCH更新
  components/
    BoothMap.tsx                 # ★追加：ブロック配置UI
    BoothTile.tsx                # ★追加：屋台ブロックコンポーネント
    StatusLegend.tsx             # ★追加：色凡例
  lib/
    repository/
      yataiRepo.ts
      sheetsYataiRepo.ts
      supabaseYataiRepo.ts       # 将来用
    sheets/
      sheetsClient.ts
  config/
    layout.ts                    # ★追加：配置レイアウト定義（A/B/C/D…）
  types/
    yatai.ts
  .env.local
```

---

## 4. データ設計

### yatai シート（マスタ）

| column        | type   | description |
|--------------|--------|------------|
| yatai_id     | string | A01など一意キー |
| area         | string | A/B/Cなど |
| org_name     | string | 団体名 |
| booth_name   | string | 屋台名 |
| menu_json    | string | JSON文字列 |
| leader_name  | string | 責任者名 |
| leader_phone | string | 連絡先 |

### status シート（当日状態）

| column        | type         | description |
|--------------|--------------|------------|
| yatai_id     | string       | |
| warn_count   | number       | |
| kenshoku     | number (0/1) | |
| gas_check    | number (0/1) | |
| sales_allowed| number (0/1) | |
| memo_today   | string       | |
| updated_at   | string (ISO) | |
| updated_by   | string       | |

---

## 5. 型定義

```ts
export interface Yatai {
  yatai_id: string;
  area: string;
  org_name: string;
  booth_name: string;
  menu_json: string;
  leader_name: string;
  leader_phone: string;
}

export interface YataiStatus {
  yatai_id: string;
  warn_count: number;
  kenshoku: 0 | 1;
  gas_check: 0 | 1;
  sales_allowed: 0 | 1;
  memo_today: string;
  updated_at: string;
  updated_by: string;
}

export interface YataiWithStatus extends Yatai {
  status: YataiStatus;
}
```

---

## 6. API仕様（変更なし）

### GET /api/yatai
屋台一覧取得（YataiWithStatus[]）

### GET /api/yatai/:id
単一屋台取得（YataiWithStatus）

### PATCH /api/status/:id
本部用ステータス更新

Header:
```
Authorization: Bearer ADMIN_EDIT_TOKEN
```

Body（例）:
```json
{
  "warn_count": 2,
  "kenshoku": 1,
  "gas_check": 1,
  "sales_allowed": 1,
  "memo_today": "注意済"
}
```

---

## 7. UI仕様（v2：ブロック配置UIに置換）

### 7.1 一覧画面（/）の表示要件

#### 目的
「文字の羅列」ではなく、**屋台の配置を図形的（ブロック）に並べる**ことで、当日の巡回・本部業務が直感的に行えるようにする。

#### UI構造
- 上部：タイトル・概要・統計（登録屋台数、最終更新など）
- 中部：フィルタ（検索、エリア、状態）
- **メイン：ブロック配置（BoothMap）**
- 右/下：選択屋台の詳細（既存の詳細パネルを流用可）
- どの色が何を示すかの凡例（StatusLegend）

#### ブロック（屋台タイル）表示内容
- 1段目：屋台ID（例：A1 / A01 など）
- 2段目：屋台名（省略表示可）
- hover / long-press：団体名などを tooltip 表示しても良い

#### クリック動作
- ブロックをクリック → その屋台を選択し、詳細パネルを更新
- 選択中ブロックは太枠・影などで強調

---

### 7.2 配置レイアウト（v2追加：config/layout.ts）

手書きイメージ（例：Aは横、B/Cは縦、Dは横）に合わせて、**配置はコードで宣言的に定義する**。

#### レイアウト定義の例（必須）
`config/layout.ts` を新規作成し、最低限以下の形で持つ：

```ts
export const LAYOUT = {
  A: { direction: "row", ids: ["A1", "A2", "A3", "A4"] },
  B: { direction: "col", ids: ["B1", "B2", "B3", "B4"] },
  C: { direction: "col", ids: ["C1", "C2", "C3", "C4", "C5"] },
  D: { direction: "row", ids: ["D1", "D2", "D3", "D4", "D5"] },
} as const;
```

- direction は `"row"` または `"col"`
- ids は表示したい屋台IDの並び（欠番は入れない or 入れて「未登録」表示でもOK）

---

### 7.3 色分け仕様（優先順位を固定）

#### 色分けルール（優先順位あり）
1. **販売停止**：sales_allowed = 0 → 赤
2. **警告2以上**：warn_count >= 2 → オレンジ
3. **警告1**：warn_count = 1 → 黄
4. **確認未完了**：gas_check = 0 または kenshoku = 0 → 灰
5. **正常**：上記以外 → 緑

> ※複数条件に該当する場合は、**上の番号が優先**される。

#### 判定関数（必須）
`components/BoothTile.tsx` または `components/BoothMap.tsx` 内で、下記に準じる関数を実装する：

```ts
function resolveDisplayStatus(status: YataiStatus | undefined) {
  if (!status) return "UNKNOWN"; // 未登録
  if (status.sales_allowed === 0) return "STOP";
  if (status.warn_count >= 2) return "DANGER";
  if (status.warn_count === 1) return "WARNING";
  if (status.gas_check === 0 || status.kenshoku === 0) return "UNCHECKED";
  return "OK";
}
```

---

### 7.4 コンポーネント要件（v2追加）

#### BoothMap（必須）
- props: `booths: YataiWithStatus[]`, `selectedId?: string`, `onSelect(id: string): void`
- LAYOUT に従って area セクションごとにブロック配置する
- ids にあるが booths に存在しない場合は「未登録」ブロック表示（グレー）でクリック不可推奨

#### BoothTile（必須）
- 1ブロックの見た目
- 状態に応じた背景色・枠色
- 選択中は強調

#### StatusLegend（推奨）
- 色の意味（停止/危険/警告/未確認/正常）を小さく表示

---

## 8. Repository設計（補強：any禁止）

`any` を使わず、型を適用する。

```ts
import type { YataiStatus, YataiWithStatus } from "@/types/yatai";

export interface YataiRepository {
  getAll(): Promise<YataiWithStatus[]>;
  getById(id: string): Promise<YataiWithStatus | null>;
  updateStatus(id: string, status: Partial<YataiStatus>): Promise<void>;
}
```

---

## 9. 環境変数

```
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
ADMIN_EDIT_TOKEN=
```

---

## 10. 将来拡張

- Supabase移行（Repository差し替え）
- ログ履歴テーブル追加（更新履歴を時系列で保持）
- 認証導入（Supabase Auth）
- WebSocket / Realtime によるリアルタイム更新
- 画像配置図（会場図）への置換（CSS Grid/座標方式）

---

## 11. 実装優先順位（v2）

1. `config/layout.ts` 作成（配置定義）
2. `components/BoothMap.tsx` / `BoothTile.tsx` / `StatusLegend.tsx` 作成
3. 一覧画面（app/page.tsx）の「文字の羅列リスト」を BoothMap に置換
4. 色分け判定（優先順位含む）を実装し、凡例と一致させる
5. クリックで詳細パネル更新（既存ロジック流用）
6. フィルタ（検索/エリア/状態）を BoothMap 表示にも反映

---

## 12. CodeXへの依頼文（コピペ用）

以下を CodeX に投げて作業を依頼する：

### 依頼文
- 一覧画面（/）の屋台表示を、文字リストではなく**ブロック配置UI**に変更してください。
- `config/layout.ts` を新規作成し、仕様書の LAYOUT 例に沿って、エリアごとの並びを定義してください。
- `components/BoothMap.tsx` / `components/BoothTile.tsx` / `components/StatusLegend.tsx` を新規作成してください。
- ブロックの色は仕様書の **優先順位付きルール**で決定してください（STOP > DANGER > WARNING > UNCHECKED > OK）。
- ブロッククリックで選択屋台を切り替え、詳細パネルに反映してください（既存の詳細表示があるなら流用）。
- ids に存在するがデータがない屋台は「未登録」表示（グレー）にしてください。
- `YataiRepository` の型を `any` から `YataiWithStatus[]` 等に置換し、型安全にしてください。
- 変更後も build が通り、GitHub Pages などの静的ホスティングで表示崩れしないようにしてください。

### 完了条件
- A/B/C/D がそれぞれ row/col で配置され、ブロックをクリックすると詳細が変わる
- 色分けが凡例と一致し、条件競合時も優先順位通りになる
- TypeScript の型エラーがない
