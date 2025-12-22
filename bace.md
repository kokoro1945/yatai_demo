# 屋台配置図 管理デモアプリ 仕様書（簡易版）

本書は `docs/プロジェクト仕様書.md` の内容に合わせた簡易版です。
詳細はそちらを参照してください。

---

## 1. プロジェクト概要

### プロジェクト名
屋台配置図 管理デモアプリ（試作）

### 目的
30店舗の屋台を配置図（SVG）としてブラウザに表示し、
各屋台をクリックすることで右側の詳細パネルから情報を編集できる
Webアプリの試作版を作成する。

本アプリは **GitHub Pages で公開する静的Webアプリ** とし、
バックエンドは使用しない（ローカル変数管理）。

---

## 2. 技術要件

- HTML / CSS / JavaScript（バニラJS）
- フレームワーク不使用
- 単一ページ構成
- GitHub Pages で動作すること
- ローカル環境・ブラウザのみで完結すること

---

## 3. 画面構成

- 横並び（display: flex）
- 左：屋台配置図（SVG）
- 右：屋台情報編集パネル

---

## 4. 屋台配置図（SVG）

### 屋台数
- 合計30店舗

### 表現方法
- `<svg>` 内に `<rect>` を用いて屋台を表現
- 各屋台は class="booth" を持つ
- 各屋台の id は以下の形式
  - B01 ～ B30

### 配置ルール
- 5列 × 6行のグリッド配置
- サイズ：width=80, height=60

```
Row1 (y=20):   B01 B02 B03 B04 B05
Row2 (y=100):  B06 B07 B08 B09 B10
Row3 (y=180):  B11 B12 B13 B14 B15
Row4 (y=260):  B16 B17 B18 B19 B20
Row5 (y=340):  B21 B22 B23 B24 B25
Row6 (y=420):  B26 B27 B28 B29 B30
```

---

## 5. 屋台の状態と色分け

### 状態定義
- normal：通常営業
- stop：出店停止

### 色ルール
| 状態 | 色 |
| ---- | ---- |
| normal | #6fc46f（緑） |
| stop | #e25a5a（赤） |

初期状態はすべて normal とする。

---

## 6. 右側編集パネル仕様

### 表示項目
- 屋台ID（h2などで表示）
- 状態（select）
  - 通常（normal）
  - 停止（stop）
- チェックリスト（checkbox × 3）
  - 火気確認
  - 衛生チェック
  - 価格掲示
- 価格（number input）
- 責任者名（text input）
- 保存ボタン

---

## 7. データ仕様（script.js）

### データ構造
```js
const booths = {
  B01: {
    status: "normal",
    checklist: [false, false, false],
    price: "",
    person: ""
  },
  ...
};
```

### 永続化
- 不要
- ページリロード時は初期化されてよい

---

## 8. 処理仕様

### 初期化処理
- B01～B30 のデータを生成
- 全屋台を normal 状態として色を反映

### 屋台クリック時
- クリックされた `<rect>` の id を取得
- 対応する屋台データを右パネルに反映
- 保存ボタンの対象屋台を切り替える

### 保存処理
- 右パネルの入力内容をデータに反映
- 屋台の色を更新
- 保存完了を alert で通知

### 色更新関数
```js
function updateBoothColor(id) {
  const elem = document.getElementById(id);
  const status = booths[id].status;

  if (status === "normal") {
    elem.setAttribute("fill", "#6fc46f");
  } else {
    elem.setAttribute("fill", "#e25a5a");
  }
}
```

---

## 9. style.css 要件

### 全体
- body：padding 20px、sans-serif
- SVG：枠線あり

### 屋台（.booth）
```css
fill: #cfcfcf;
stroke: #555;
stroke-width: 2px;
cursor: pointer;
```

- hover 時に明るくする

### パネル
- 幅：約260px
- 背景：#fafafa
- border：#aaa
- border-radius：8px
- padding：10px

---

## 10. 動作確認方法

1. GitHub Pages 上で公開されたURLにアクセス
2. 屋台をクリックできること
3. 情報を編集して保存できること
4. 状態変更により色が変わること

---

## 11. 拡張前提（参考）

- 今後 Supabase 等のバックエンドを接続できるよう、
  データ更新処理は関数に集約しておくこと
- SVG の id とデータの key は必ず一致させること
