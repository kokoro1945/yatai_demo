# 屋台管理ダッシュボード 仕様書（現状版）

## 1. 概要
本アプリは、大学祭屋台の配置を「12×37のグリッドMAP」で表示し、屋台ステータスを色分け表示するダッシュボードです。現在は **MAPの見やすさを最優先** し、詳細パネルは一時的に非表示です。

- 本キャン / Eキャンはタブで切替
- 屋台はグリッド上の指定セルに配置
- 状態（販売停止/警告/未確認/正常）に応じて色分け
- スクロールは **MAPコンテナ内だけ**

---

## 2. 画面構成

### 2.1 ヘッダー
- タイトル
- サブ説明文
- 3つのサマリーカード
  - 対象エリア
  - 登録屋台数
  - 最終更新

### 2.2 屋台一覧（MAP）
- 凡例（状態色）
- 本キャン / Eキャン切替タブ
- フィルタ
  - 検索
  - エリア
  - 状態
- グリッドMAP（12×37）
  - 各セルに屋台タイルを配置
  - タイルは黒枠の正方形（角丸なし）

---

## 3. グリッド仕様

- 行: `a`〜`l`（12行）
- 列: `1`〜`37`（37列）
- 各セルは `a3` のような表記で指定
- 配置は `assets/js/data/layout.js` で宣言的に管理

### 3.1 本キャン配置
- A: `a3~a12` に A1〜A10
- B: `a2~j2` に B1〜B10
- C: `a1~j1` に C1〜C10
- D: `j3~j12` に D1〜D10
- E: `j13~j25` に E1〜E13
- F: `j26~j37` に F1〜F12

### 3.2 Eキャン配置
- G: `l1~l6` に G1〜G6
- H: `k1~k5` に H1〜H5
- I: `l7~l15` に I1〜I9
- J: `k15~g15` に J1〜J5
- K: `l16~a16` に K1〜K12
- L: `a17~a31` に L1〜L15

---

## 4. ステータス色分けルール
優先順位は以下の通り：

1. **販売停止**：`sales_allowed = 0` → 赤
2. **警告2以上**：`warn_count >= 2` → オレンジ
3. **警告1**：`warn_count = 1` → 黄
4. **確認未完了**：`gas_check = 0` または `kenshoku = 0` → 灰
5. **正常**：上記以外 → 緑

---

## 5. データ構造

### 5.1 屋台マスタ（`assets/js/data/yataiData.js`）
- `yatai_id`
- `area`
- `booth_name`
- `org_name`（現在は空）
- `menu_json`（現在は空）
- `leader_name` / `leader_phone`（現在は空）

### 5.2 ステータス
- `localStorage` に保存
- キー: `yatai_dashboard_status`

---

## 6. ファイル構成

```
/Users/koumurakokoro/yatai_demo
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     ├─ app.js
│     └─ data/
│        ├─ layout.js
│        └─ yataiData.js
├─ 出店者一覧.pdf
├─ 屋台配置図.pdf
└─ SPEC_YATAI_DASHBOARD_CURRENT.md
```

---

## 7. 各ファイルの役割

### `index.html`
- 画面骨組み
- 主要パネルとMAPコンテナ
- `assets/css/style.css` と `assets/js/app.js` を読み込み

### `assets/css/style.css`
- テーマ色、レイアウト
- MAPのスクロール制御とグリッド表示
- タイルの形状（黒枠の四角）

### `assets/js/data/layout.js`
- 12×37グリッド定義
- 本キャン / Eキャンの配置ルール

### `assets/js/data/yataiData.js`
- 昨年度の出店者一覧データ
- 屋台名の表示用

### `assets/js/app.js`
- MAP描画、フィルタ処理
- キャンパス切替
- ステータス色分け

---

## 8. 今後の拡張（候補）
- 詳細パネルの復活（別画面またはモーダル）
- CSV/Google Sheets 連携
- ステータス更新UIの再導入
- エリアごとの強調線/区画枠


データベースパスワード
Ya1945nnnnnkon