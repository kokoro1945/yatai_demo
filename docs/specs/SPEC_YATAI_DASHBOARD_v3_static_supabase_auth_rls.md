# 屋台部ダッシュボード 仕様書 v3（GitHub Pages静的 + Supabase Auth + RLS）

> この仕様書は **CodeX にそのまま渡して実装・修正依頼**できるように、全体像と細部（DB/権限/UI/フロー）まで整理したものです。  
> 前提：**GitHub Pages（静的ホスティング）で公開**、データは **Supabase（DB + Storage + Realtime）** を利用。  
> 目的：屋台部内（外部公開なし）で、当日の巡回・本部運用を安全に回す。

---

## 0. ゴール（何ができるアプリか）

### 本部（ADMIN：固定端末）
- 屋台全体状況を **マップ（ブロック配置）** で一目確認（色分け）
- 屋台詳細の閲覧（固定情報 + 当日状態 + メニュー + ログ + 写真）
- **編集**（当日状態、停止/解除、警告等、本部チェック項目）
- 無線で入った注意事項の **記録**（ログ）
- 検食、物品返却など **本部専用チェック** の更新

### 巡回リーダー（LEAD）
- 担当エリアの屋台をマップで確認（色分け）
- 屋台詳細閲覧
- 写真追加、メモ（ログ）追加
- 巡回用チェック更新（※本部専用項目は除く）
- **停止/解除が可能（ただし担当エリアのみ）**
  - 停止：停止理由と解除条件が必須
  - 解除：解除理由が必須
  - 停止/解除は必ずログに残る（誰が/いつ/理由/条件）

### 巡回（PATROL）
- 担当エリアの屋台をマップで確認（色分け）
- 屋台詳細閲覧
- 写真追加、メモ（ログ）追加
- 巡回用チェック更新（検食・返却などは不可）
- 停止/解除は不可

---

## 1. アーキテクチャ（静的運用の前提）

- フロント：React + TypeScript（Vite推奨） + TailwindCSS
- 公開：GitHub Pages（静的）
- データ：Supabase
  - Database（PostgreSQL）
  - Auth（ログイン）
  - Storage（写真）
  - Realtime（状態の即時反映）
  - RLS（権限制御）

> 重要：静的サイトでも Supabase Auth + RLS により、安全に「閲覧/更新」を実現する。  
> **フロントから直接 Supabase を叩く構成**（/api は使わない）。

---

## 2. ロール設計（固定）

- `ADMIN`：本部（固定端末でログイン運用）
- `LEAD`：巡回リーダー（担当エリアのみ停止/解除可）
- `PATROL`：巡回（停止/解除不可）

### 担当エリア
- LEAD/PATROL は `profiles.area` で担当エリア（例：A, B, C…）を持つ  
- 将来、複数担当が必要になったら中間テーブル `profile_areas` を追加して拡張する（v3では単一担当）。

---

## 3. データモデル（Supabase）

### 3.1 既存テーブル（前段で作成済み）
- `booths`：屋台マスタ
- `booth_status`：当日最新状態（1屋台1行）
- `menu_items`：複数商品
- `people` / `booth_members`：人物・所属（将来入力/参照用）
- `booth_status_logs`：状態ログ（v3で「操作ログ」用途を強化）

### 3.2 v3で追加/拡張するテーブル・カラム

#### profiles（Authユーザーのロール/担当）
- `id` uuid（`auth.users.id` と一致）
- `role` text（ADMIN / LEAD / PATROL）
- `area` text（例：A）
- `created_at`

#### booths に area を持たせる（必須）
- `booths.area` text（例：A/B/C…）
  - ※ すでに存在するならOK。存在しない場合は追加。

#### booth_status に停止/解除の理由系を追加（必須）
- `stop_reason` text（停止理由：必須）
- `resume_condition` text（解除条件：必須）
- `resume_reason` text（解除理由：必須）
- `stopped_at` timestamptz
- `stopped_by` uuid（authユーザー）
- `resumed_at` timestamptz
- `resumed_by` uuid

#### booth_status_logs（操作ログ強化）
- `action` text（STOP/RESUME/UPDATE 等）
- `reason` text（停止理由 or 解除理由）
- `condition` text（解除条件：STOP時のみ）
- `actor_user_id` uuid
- `actor_role` text
- `created_at` timestamptz（既存あれば利用）

---

## 4. 業務ルール（停止/解除の必須要件）

### 4.1 停止（LEAD/ADMIN）
- `sales_allowed = false`
- 必須入力：
  - `stop_reason`（停止理由）
  - `resume_condition`（解除条件）
- DB記録：
  - `stopped_at`, `stopped_by`
- ログ：
  - **必ず STOP ログが残る**（誰が/いつ/理由/解除条件）

### 4.2 解除（LEAD/ADMIN）
- `sales_allowed = true`
- 必須入力：
  - `resume_reason`（解除理由）
- DB記録：
  - `resumed_at`, `resumed_by`
- ログ：
  - **必ず RESUME ログが残る**（誰が/いつ/解除理由）

### 4.3 LEADの制限
- LEADは **自分の担当エリアの屋台のみ** 停止/解除可能

---

## 5. UI仕様（画面）

### 5.1 共通（ログイン）
- ログイン画面（Email/Password）
- ログイン後 `profiles` を取得し、role/area を判定
- roleに応じて機能を出し分け（UI制御）
- **最終的な権限制御はRLS（DB側）**で担保

### 5.2 マップ画面（メイン）
- 既存の「文字の羅列」ではなく、**ブロック配置**（レイアウト定義）で表示
- クリックで屋台詳細パネルを表示

#### レイアウト定義（必須）
`config/layout.ts`
```ts
export const LAYOUT = {
  A: { direction: "row", ids: ["A01","A02","A03","A04"] },
  B: { direction: "col", ids: ["B01","B02","B03"] },
  // ...
} as const;
```

#### ブロック表示
- 1行目：`yatai_id`
- 2行目：`booth_name`（省略可）
- hover：団体名等

#### 色分け（優先順位固定）
1. 販売停止：`sales_allowed = false` → 赤
2. 警告2以上：`warn_count >= 2` → オレンジ
3. 警告1：`warn_count = 1` → 黄
4. 確認未完了：`gas_check = false` or `kenshoku = false` → 灰
5. 正常：上記以外 → 緑

### 5.3 屋台詳細パネル
表示項目：
- 基本情報（booths）
- メニュー一覧（menu_items）
- 当日状態（booth_status）
- 写真一覧（Storage + メタ情報）
- ログ一覧（booth_status_logs）

操作（ロール別）：
- ADMIN：全操作
- LEAD：巡回チェック + 停止/解除（担当エリアのみ、必須入力あり）
- PATROL：写真追加/メモ追加/巡回チェックのみ

### 5.4 停止/解除モーダル（必須）
- 停止モーダル：
  - 停止理由（必須）
  - 解除条件（必須）
  - 確認ダイアログ
- 解除モーダル：
  - 解除理由（必須）
  - 確認ダイアログ
- 入力未満の場合は送信不可
- 成功/失敗のトースト表示

---

## 6. 写真（Supabase Storage）

### 6.1 バケット
- bucket: `booth-photos`（例）
- パス例：`{yatai_id}/{yyyyMMdd_HHmmss}_{userId}.jpg`

### 6.2 写真メタ情報（推奨：photosテーブル）
静的でも一覧・検索しやすいよう、DBにメタを持つ。

`photos`（新規推奨）
- `photo_id` bigserial PK
- `yatai_id` text FK -> booths
- `path` text（Storage内パス）
- `caption` text（任意）
- `actor_user_id` uuid
- `created_at` timestamptz default now()

権限：
- ADMIN/LEAD/PATROL：INSERT可
- SELECTは同エリアまたは全体（運用に合わせる）

---

## 7. Realtime（リアルタイム共有）

- マップの色分けは `booth_status` の変更を購読して即反映
- 屋台詳細の状態も購読して即反映
- ログ/写真も購読できるが、最初は status のみでOK

---

## 8. セキュリティ（Auth + RLS）

### 8.1 Supabase Auth
- ログインは Email/Password（運用：本部固定端末はADMINアカウントで常時ログイン）
- ユーザー作成後、`profiles` に role/area を登録する（手動 or 管理画面）

### 8.2 RLSの方針
- すべての主要テーブルで RLS を有効化
- 「誰が何をできるか」は DB側（RLS）で保証

#### 権限制御の例（方針）
- booths：全員SELECT可（※外部公開なし前提）
- booth_status：
  - SELECT：全員可（または担当エリアのみ）
  - UPDATE：
    - ADMIN：全屋台可
    - LEAD：担当エリアのみ可（停止/解除も含むが必須入力チェック）
    - PATROL：原則不可（巡回チェックだけ許可するなら列更新制限を別設計）
- booth_status_logs：
  - INSERT：停止/解除は必ず記録（DBトリガー推奨）
  - SELECT：全員可（または担当エリアのみ）

> **停止/解除ログ必須**を完全保証するため、`booth_status` の更新を監視して logs を自動生成するDBトリガーを採用する（推奨）。

---

## 9. 実装タスク（優先順位）

### Phase 1（最小で動く）
1. Supabase：`profiles` 作成、`booths.area` と `booth_status` 追加列を反映
2. Auth：ADMIN/LEAD/PATROL のユーザー作成 → profilesにrole/area登録
3. RLS：最低限の SELECT/UPDATE 制御を入れる
4. フロント：ログイン画面 + profiles取得
5. フロント：マップ表示（LAYOUT）+ 色分け + 詳細パネル

### Phase 2（停止/解除を堅牢に）
6. 停止/解除モーダル実装（必須入力）
7. DBトリガーで STOP/RESUME ログ自動生成
8. 詳細パネルにログ表示

### Phase 3（写真）
9. Storage バケット + アップロードUI
10. photosテーブル（任意）+ 写真一覧表示

---

## 10. CodeXへの依頼文（コピペ用）

### 依頼
- 現在の屋台ダッシュボードを、**GitHub Pages（静的）**で運用できるように維持したまま、データを **Supabase（Auth + RLS + Realtime + Storage）** に統合してください。
- ロールは **ADMIN/LEAD/PATROL の3段階**とし、role/areaは `profiles` テーブルで管理してください。
- 画面の屋台一覧は文字列ではなく、`config/layout.ts` の **ブロック配置（マップ）UI** に置換してください。
- 色分けは仕様の優先順位（停止→警告2→警告1→未確認→正常）で実装してください。
- LEADは **担当エリアのみ** 停止/解除可能にしてください（RLSで制限）。
- 停止時は `stop_reason` と `resume_condition` を必須、解除時は `resume_reason` を必須にし、未入力なら更新不可にしてください。
- 停止/解除は **誰がいつ行ったかのログが必須**です。DBトリガーで `booth_status_logs` に STOP/RESUME を自動挿入する方式で実装してください（推奨）。
- Realtime購読で `booth_status` の変更をマップに即反映させてください。
- 写真は Supabase Storage にアップロードし、一覧表示できるようにしてください（photosテーブルは推奨）。

### 完了条件
- ログイン後、ロールに応じたUIと操作ができる（ADMIN/LEAD/PATROL）
- マップがブロック配置で表示され、色分けがリアルタイム更新される
- LEADは担当エリアのみ停止/解除でき、必須入力がないと実行できない
- 停止/解除のログが必ず残る（誰/いつ/理由/条件）
- GitHub Pagesでビルド・公開できる（静的）

---

## 11. 置換が必要な変数（あなたが埋める）
- Supabase URL：`https://xxxx.supabase.co`
- Supabase anon key：`xxxxx`
- Storage bucket名：`booth-photos`（任意で変更可）
