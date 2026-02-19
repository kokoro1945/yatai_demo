# 屋台管理ダッシュボード Webアプリ 仕様書

## 1. プロジェクト概要

大学祭屋台管理をデジタル化するためのWebアプリケーションを開発する。

本アプリは以下を目的とする：

-   屋台情報の一元管理
-   当日ステータスのリアルタイム共有
-   巡回者と本部間の情報共有
-   データ蓄積による次年度引き継ぎ効率化

------------------------------------------------------------------------

## 2. 技術構成

### フロントエンド

-   Next.js (App Router)
-   React
-   TypeScript
-   TailwindCSS（推奨）

### バックエンド

-   Next.js Route Handler (/api)
-   Repositoryパターン採用

### データベース

-   現在：Google Sheets（API経由）
-   将来：Supabase(PostgreSQL)へ差し替え予定

### 重要設計方針

-   フロントエンドから直接Google Sheets APIを叩かない
-   データアクセスは必ずRepository経由
-   Supabaseへ差し替え可能な構造にする

------------------------------------------------------------------------

## 3. ディレクトリ構成

    yatai-dashboard/
      app/
        page.tsx
        yatai/[id]/page.tsx
        api/
          yatai/route.ts
          yatai/[id]/route.ts
          status/[id]/route.ts
      lib/
        repository/
          yataiRepo.ts
          sheetsYataiRepo.ts
          supabaseYataiRepo.ts
        sheets/
          sheetsClient.ts
      types/
        yatai.ts
      .env.local

------------------------------------------------------------------------

## 4. データ設計

### yatai シート（マスタ）

  column         type     description
  -------------- -------- -----------------
  yatai_id       string   A01など一意キー
  area           string   A/B/Cなど
  org_name       string   団体名
  booth_name     string   屋台名
  menu_json      string   JSON文字列
  leader_name    string   責任者名
  leader_phone   string   連絡先

------------------------------------------------------------------------

### status シート（当日状態）

  column          type           description
  --------------- -------------- -------------
  yatai_id        string         
  warn_count      number         
  kenshoku        number (0/1)   
  gas_check       number (0/1)   
  sales_allowed   number (0/1)   
  memo_today      string         
  updated_at      string (ISO)   
  updated_by      string         

------------------------------------------------------------------------

## 5. 型定義

``` ts
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
  kenshoku: number;
  gas_check: number;
  sales_allowed: number;
  memo_today: string;
  updated_at: string;
  updated_by: string;
}

export interface YataiWithStatus extends Yatai {
  status: YataiStatus;
}
```

------------------------------------------------------------------------

## 6. API仕様

### GET /api/yatai

屋台一覧取得

### GET /api/yatai/:id

単一屋台取得

### PATCH /api/status/:id

本部用ステータス更新

Header: Authorization: Bearer ADMIN_EDIT_TOKEN

------------------------------------------------------------------------

## 7. UI仕様

### 屋台一覧画面 (/)

-   グリッド表示
-   ステータスに応じて色分け

色分けルール：

-   赤：sales_allowed = 0
-   オレンジ：warn_count \>= 2
-   黄：warn_count = 1
-   緑：正常
-   灰：gas_check = 0 or kenshoku = 0

------------------------------------------------------------------------

### 屋台詳細画面 (/yatai/\[id\])

表示項目： - 団体名 - 屋台名 - メニュー - 責任者 - 状態

本部のみ編集フォーム表示（トークン入力）

------------------------------------------------------------------------

## 8. Repository設計

``` ts
export interface YataiRepository {
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  updateStatus(id: string, status: any): Promise<void>;
}
```

------------------------------------------------------------------------

## 9. 環境変数

GOOGLE_SHEETS_ID= GOOGLE_SERVICE_ACCOUNT_EMAIL= GOOGLE_PRIVATE_KEY=
ADMIN_EDIT_TOKEN=

------------------------------------------------------------------------

## 10. 将来拡張

-   Supabase移行
-   ログ履歴テーブル追加
-   認証導入（Supabase Auth）
-   WebSocketによるリアルタイム更新
-   マップUI化（画像配置図対応）

------------------------------------------------------------------------

## 11. 実装優先順位

1.  Sheets接続
2.  GET一覧API
3.  一覧UI
4.  詳細UI
5.  PATCH更新API
6.  色分け実装
