# 近畿大学大学祭実行委員会システム部 開発ルール

## はじめに
このドキュメントは、近畿大学大学祭実行委員会システム部の開発ルールをまとめたものです。
毎年メンバーが入れ替わる中で、一貫した品質を保ちながら開発を進めるために作成されました。

---

## 開発の流れ

1. プロジェクト仕様書を作成
   - docs/プロジェクト仕様書.mdにプロジェクトの詳細を記載
   - 何を作るか、どう動くか、どんなデータベースを使うかを明確にする
   - 2〜3 人でレビューして内容を確定
2. リポジトリを作成
   - GitHub で新しいリポジトリを作成（命名規則に従う）
   - mainブランチとdevelopブランチを作成
   - docs/フォルダに各種ドキュメントを配置
3. Issue を作成
   - 仕様書を見ながら、大きな単位で Issue を作成
   - 例：「ログイン機能を実装」「イベント一覧画面を実装」
4. ブランチを切って開発
   - Issue 画面の右側「Development」欄から「Create a branch」でブランチ作成
   - コーディング規約に従って実装
   - 定期的にコミット・プッシュ
5. プルリクエストを作成
   - 実装が完了したら PR を作成
   - Discord で通知（レビュー依頼ではなく通知目的）
   - GitHub 上でレビューを実施
   - レビュー承認後にマージ
6. 繰り返し
   - 全ての機能が完成するまで 3〜5 を繰り返す
   - 定期的にプロジェクト仕様書を更新

---

## GitHub ルール

### 用語解説
このドキュメントで使用する用語を初学者向けに解説します。

**GitHub（ギットハブ）**
- 説明： コードを保存・共有・管理するための Web サービス
- 例え： コードの Google ドライブのようなもの
- 用途： チームでコードを共同開発するときに使う

**Git（ギット）**
- 説明： コードの変更履歴を記録・管理するツール
- 例え： ゲームのセーブデータのようなもの（いつでも過去に戻れる）
- 用途： 「誰が」「いつ」「何を」変更したかを記録

**リポジトリ（Repository / repo）**
- 説明： プロジェクトのコードやファイルを保存する場所
- 例え： プロジェクト専用のフォルダ
- 用途： プロジェクト全体のコードを 1 つの場所で管理

**ブランチ（Branch）**
- 説明： コードの開発を並行して進めるための「枝分かれ」
- 例え： 本の下書きを複数作るようなもの（最後に 1 つにまとめる）
- 用途： 複数人が同時に異なる機能を開発できる

**コミット（Commit）**
- 説明： コードの変更を記録（保存）すること
- 例え： ゲームのセーブポイントを作ること
- 用途： 作業の区切りで変更を保存し、後で戻れるようにする

**プッシュ（Push）**
- 説明： ローカル（自分の PC）の変更を GitHub にアップロードすること
- 例え： 自分の PC からクラウドにファイルをアップロード
- 用途： 自分の作業をチームメンバーと共有する

**プル（Pull）**
- 説明： GitHub から最新のコードを自分の PC にダウンロードすること
- 例え： クラウドから最新ファイルをダウンロード
- 用途： 他の人の変更を自分の PC に取り込む

**Issue（イシュー）**
- 説明： やるべきタスクやバグを記録する「課題管理チケット」
- 例え： TODO リストの 1 項目
- 用途： 「何を作るか」「何を修正するか」を明確にする

**プルリクエスト（Pull Request / PR）**
- 説明： 自分の変更を本番コードに取り込んでもらうための「申請」
- 例え： 「このコード、本番に入れていいですか？」という確認依頼
- 用途： レビューを受けてから本番コードに反映する

**マージ（Merge）**
- 説明： 別々のブランチを 1 つに統合すること
- 例え： 複数の下書きを 1 つの完成版にまとめる
- 用途： 開発したコードを本番コードに反映する

**コンフリクト（Conflict）**
- 説明： 同じファイルの同じ箇所を複数人が変更したときに起こる衝突
- 例え： 2 人が同じ文章を別々に編集して、どちらを採用するか決められない状態
- 用途： 手動で「どちらの変更を残すか」を決める必要がある

**レビュー（Review / Code Review）**
- 説明： 他の人のコードを確認して、問題がないかチェックすること
- 例え： 作文を友達に読んでもらって、誤字や改善点を指摘してもらう
- 用途： コードの品質を保ち、バグを減らす

**クローン（Clone）**
- 説明： GitHub のリポジトリを自分の PC にコピーすること
- 例え： クラウドのフォルダを自分の PC にダウンロード
- 用途： 初めてプロジェクトに参加するときに行う

**フォーク（Fork）**
- 説明： 他人のリポジトリを自分のアカウントにコピーすること
- 例え： 他人のプロジェクトを自分の場所に複製
- 用途： オープンソースプロジェクトに貢献するときなど（このプロジェクトでは基本的に使わない）

**ローカル（Local）**
- 説明： 自分の PC 上のこと
- 対義語： リモート（Remote / GitHub サーバー上）

**リモート（Remote）**
- 説明： GitHub サーバー上のこと
- 対義語： ローカル（自分の PC）

**main ブランチ**
- 説明： 本番環境で動いているコードが入るブランチ
- 別名： master（古い名称）
- 用途： 実際にユーザーが使うコードを管理

**develop ブランチ**
- 説明： 開発中のコードが入るブランチ
- 用途： 開発者が動作確認するためのコードを管理

---

## リポジトリ命名規則

### 形式
- プロジェクト名-年度

### ルール
- 小文字のみ
- 単語が続く場合はハイフン（-）で区切る
- 年度を末尾に付ける
- 分かりやすい名前（略語は避ける）

### 例
- festival-app-2024
- festival-admin-panel-2025
- event-management-api-2024
- qr-code-scanner-2025

---

## ブランチ戦略

### ブランチ構成
```
main（本番環境）
└── develop（開発環境）
    ├── feature/○○（機能追加・Issueベース）
    ├── fix/○○（バグ修正・Issueベース）
    └── docs/○○（ドキュメント更新）
```

### 各ブランチの役割

**main ブランチ**
- 本番環境にデプロイされるコード
- 直接 push は禁止
- developからのマージのみ許可

**develop ブランチ**
- 開発環境のコード
- 直接 push は禁止
- 各機能ブランチからのマージを受け付ける
- 動作確認後にmainへマージ

**feature/○○ ブランチ**
- 機能開発時に使用
- 必ず Issue を作成してから切る
- developから切る
- 例：feature/ログイン機能、feature/イベント一覧表示

**fix/○○ ブランチ**
- バグ修正時に使用
- 必ず Issue を作成してから切る
- developから切る
- 例：fix/ログインボタンが押せない、fix/画像が表示されない

**docs/○○ ブランチ**
- ドキュメント更新時に使用
- developから切る
- 例：docs/プロジェクト仕様書更新、docs/README更新

---

## ブランチ命名規則

### 基本ルール
- 形式： 種類/内容
- 言語： 日本語 OK
- 内容： 具体的に書く（誰が見ても分かるように）

### 良い例
- feature/イベント管理画面
- feature/QRコード読み取り機能
- fix/画像が表示されないバグ
- docs/API仕様書追加

### 悪い例
- feature/new-feature（何の機能か不明）
- fix/bug（何のバグか不明）
- feature/test（テストではない）

---

## Issue 管理

### Issue とは？
やるべきタスクやバグを記録するための「課題管理チケット」
GitHub 上で管理される
チーム全員が「今何をやっているか」を把握できる

### Issue ルール
- 作業を始める前に必ず Issue を作成
- 初期開発でも追加開発でも必須
- 全員が Issue を作成できる
- 大きな単位で Issue を作る（例：「ログイン機能を実装」）

### Issue テンプレート
```
## やりたいこと

（何を実装・修正したいか）

## 詳細

（具体的な内容や背景）
```

### Issue ラベル
| ラベル | 用途 |
| ---- | ---- |
| bug | バグ修正 |
| enhancement | 機能追加 |
| documentation | ドキュメント |
| good first issue | 初学者向け |
| help wanted | 助けが欲しい |
| wontfix | 対応しない |

### Issue 作成からクローズまでの流れ

1. Issue を作成
   - テンプレートに沿って記入
   - 適切なラベルを付ける
   - 担当者をアサイン（自分または他のメンバー）
2. ブランチを切る（GitHub 上で）
   - Issue 画面の右側にある「Development」欄を確認
   - 「Create a branch」ボタンをクリック
   - ブランチ名は自動でIssue番号-タイトル形式で提案される
   - Branch source（どこから切るか）をdevelopに設定
   - 「Create branch」をクリック
   - このやり方で Issue とブランチが自動的に関連付けられる
3. ローカルでブランチをチェックアウト
   - git fetch origin
   - git checkout 作成されたブランチ名
4. 作業・コミット
   - コミットメッセージに Issue 番号を含める（任意）
   - 例：[add] ログイン画面を追加 #12
5. PR を出す
   - 関連 Issue を PR に記載
   - Discord に通知（後述）
6. マージ後に Issue をクローズ
   - PR がマージされると自動でクローズ
   - 自動でクローズされない場合は手動でクローズ

---

## コミットメッセージ

### コミットとは？
コードの変更を記録（保存）すること
「誰が」「いつ」「何を」変更したかが分かる
後で過去のコードに戻ることができる

### 形式
- [種類] 変更内容

### 種類一覧
| 種類 | 用途 | 例 |
| --- | --- | --- |
| add | 新規追加 | [add] ログイン画面を追加 |
| fix | 修正 | [fix] ログインボタンのバグを修正 |
| update | 更新 | [update] APIエンドポイントを変更 |
| remove | 削除 | [remove] 不要なファイルを削除 |
| docs | ドキュメント | [docs] READMEを更新 |

### 良い例
- [add] イベント一覧画面を追加
- [fix] 画像が表示されないバグを修正
- [update] Supabaseの認証処理を改善
- [docs] プロジェクト仕様書にAPI設計を追加

### 悪い例
- update（何を更新したか不明）
- バグ修正（種類が書かれていない）
- [add] いろいろ追加（具体性がない）

### 補足
- Issue 番号を含めることもできる（任意）
- 例：[add] ログイン画面を追加 #12

---

## プルリクエスト（PR）

### プルリクエストとは？
自分の変更を本番コードに取り込んでもらうための「申請」
他のメンバーにレビューしてもらう
承認されたらマージ（統合）される

### PR テンプレート
```
## 変更内容

（何を変更したか）

## 関連 Issue

#123
```

### PR 作成ルール
- タイトルは分かりやすく
  - 例：「ログイン機能を実装」「画像表示バグを修正」
- 変更内容を簡潔に書く
  - 何をしたのか
  - なぜその変更が必要だったのか（任意）
- 関連 Issue を必ず記載
  - #123のように番号で記載
  - 複数ある場合は#123, #456
- スクリーンショットを添付（推奨）
  - UI 変更がある場合は画面キャプチャを貼る
- PR を作成したら Discord に通知
  - 専用チャンネル（例：#code-review）に投稿
  - 通知目的（レビューは GitHub 上で実施）
  - 投稿内容：
    - PRを作成しました
    - 【タイトル】ログイン機能を実装
    - 【URL】https://github.com/.../pull/123

### マージ条件
- 最低 1 人の承認が必要
- コンフリクトが解消されていること
- レビュアーがマージする（自分でマージしない）

---

## コードレビュー

### コードレビューとは？
他の人のコードを確認して、問題がないかチェックすること
コードの品質を保ち、バグを減らすために行う
お互いに学び合う機会でもある

### レビュールール
- コードレビューは必須
- GitHub 上で実施
- 主に以下を確認：
  - 動作確認（実際に動くか）
  - コードの可読性
  - コメントが適切か
  - 命名規則に沿っているか

### レビュー開始時の連絡
レビューを開始したら Discord に通知：
- レビュー開始します
- 【PR】ログイン機能を実装
- 【URL】https://github.com/.../pull/123

### レビューコメントの書き方（GitHub 上）
- 建設的に（「〜した方が良い」など）
- 理由を添える
- GitHub 上のコメント機能を使用
- 例：
  - この関数は少し長いので、分割した方が読みやすくなると思います。
    例えば、バリデーション部分を別関数にするなど。

### レビュー完了時の連絡
承認したら Discord に通知：
- レビュー完了しました
- 【PR】ログイン機能を実装
- 【URL】https://github.com/.../pull/123
- LGTMです

### LGTM（エルジーティーエム）とは？
"Looks Good To Me"の略
「問題なさそうです」という意味
レビューで承認するときに使う

---

## プッシュのタイミング

### プッシュとは？
自分の PC（ローカル）の変更を GitHub（リモート）にアップロードすること
チームメンバーと変更を共有する

### 推奨タイミング
- 作業終了時（その日の作業が終わったら）
- 一つの機能が完成したとき
- 大きな変更をしたとき（バックアップ目的）

### ルール
- 自分のブランチには自由に push OK
- develop、mainへの直接 push は禁止
- push する前に：
  - エラーが出ないか確認
  - npm startで動作確認

---

## ドキュメント更新ルール

### プロジェクト仕様書の更新

**更新が必要なタイミング**
- 機能仕様が変更されたとき
- 新しい API・テーブルが追加されたとき
- データベース設計が変更されたとき
- 画面設計が変更されたとき

**更新手順**
1. Issue を作成
```
## やりたいこと

プロジェクト仕様書の API 設計を更新

## 詳細

新しいエンドポイント`GET /api/notifications`を追加したため、
仕様書に反映する
```
2. GitHub 上でブランチを切る
   - Issue 画面の「Development」欄から「Create a branch」
   - ブランチ名：docs/API設計更新
   - Branch source：develop
3. ローカルでチェックアウト
   - git fetch origin
   - git checkout 作成されたブランチ名
4. プロジェクト仕様書を編集
   - docs/プロジェクト仕様書.mdを編集
   - 変更箇所を明確に
5. コミット・プッシュ
   - git add docs/プロジェクト仕様書.md
   - git commit -m "[docs] API設計に通知取得エンドポイントを追加"
   - git push origin 作成されたブランチ名
6. PR を出す
```
## 変更内容

API 設計に通知取得エンドポイント（GET /api/notifications）を追加

## 関連 Issue

#67
```
7. Discord に通知
8. レビュー・マージ

### その他のドキュメント更新
- README.md
- 開発ルール.md
- AI 用プロンプト

も同様にdocs/ブランチで更新

---

## 環境変数ルール

### 環境変数とは？
API キーやデータベースの URL など、秘密にすべき情報を管理するための仕組み
コードに直接書かず、別ファイル（.env）で管理する
絶対に GitHub にアップロードしてはいけない

### .env（実際の値）
このファイルには実際の API キーなど秘密情報が入る

- 絶対にコミットしない
- .gitignoreに必ず含める
- 各開発者がローカルで作成
- チームメンバー間で共有する場合は Slack や Discord の DM で

例：
```
# .env
EXPO_PUBLIC_SUPABASE_URL=https://abcdefg.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
EXPO_PUBLIC_GAS_API_KEY=your-secret-api-key-here
EXPO_PUBLIC_GAS_ENDPOINT=https://script.google.com/macros/s/ABC123.../exec
```

### .env.example（サンプル）
このファイルは GitHub にコミットする

- 値は空かダミー値にする
- コミット必須
- 新しい環境変数追加時は必ず更新
- 他の開発者が.envを作るときの参考になる

例：
```
# .env.example
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
EXPO_PUBLIC_GAS_API_KEY=your_gas_api_key_here
EXPO_PUBLIC_GAS_ENDPOINT=your_gas_endpoint_here
```

### .gitignore
必ず.envを含める

```
# .gitignore
.env
node_modules/
.expo/
```

### 環境変数の使い方

設定ファイルで読み込む
```js
// src/shared/constants/config.js
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const GAS_API_KEY = process.env.EXPO_PUBLIC_GAS_API_KEY;
export const GAS_ENDPOINT = process.env.EXPO_PUBLIC_GAS_ENDPOINT;
```

コードで使用
```js
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/shared/constants/config";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### 新メンバーが参加したとき

1. リポジトリをクローン
   - git clone https://github.com/organization/festival-app-2024.git
   - cd festival-app-2024
2. .env.exampleをコピーして.envを作成
   - cp .env.example .env
3. .envに実際の値を入力
   - チームリーダーやメンバーから実際の値を教えてもらう
   - Slack や Discord の DM で共有
4. 動作確認
   - npm install
   - npm start

### 重要な注意事項
- 絶対に.envをコミットしない
- API キーが漏れると悪用される危険がある
- もしコミットしてしまったら、すぐに API キーを再発行
- 新しい環境変数を追加したら.env.exampleも更新
- 環境変数の値をコードに直接書かない

```js
// ❌ 悪い例
const API_KEY = "abc123secret";

// ✅ 良い例
const API_KEY = process.env.EXPO_PUBLIC_GAS_API_KEY;
```

---

## 禁止事項

### 絶対にやってはいけないこと
- mainへ直接 push
- developへ直接 push
- Issue を作らずに作業開始
- レビューなしでマージ
- 他人のブランチに勝手に push
- コンフリクトを放置してマージ
- 動作確認せずに PR
- .envをコミット

### 推奨しないこと
- 一つのブランチで複数の機能を実装
- コミットメッセージを適当に書く
- 巨大な PR（500 行以上の変更）

---

## AI ルール

### 最初に必ず読むこと
**プロジェクト仕様書（最優先）**
- docs/プロジェクト仕様書.md
- コードを書く前に必ず確認してください。

### プロジェクト概要
- 機能要件
- 画面設計
- データベース設計
- API 設計

### 基本情報
- 使用言語： JavaScript（TypeScript ではない）
- フロントエンド： React Native (Expo)
- バックエンド： Supabase
- その他： Google Apps Script

### ファイル構造
```
project-root/
├── docs/
│   ├── プロジェクト仕様書.md
│   ├── 開発ルール.md
│   ├── GitHubルール.md
│   └── AI用プロンプト/
│
├── src/
│   ├── features/              # 機能ごとにまとめる
│   │   └── 機能名/           # 例：auth, event, user など
│   │       ├── components/  # UI部品
│   │       ├── screens/     # 画面
│   │       ├── services/    # API通信
│   │       ├── hooks/       # カスタムフック
│   │       └── constants.js
│   │
│   ├── shared/              # 共通で使うもの
│   │   ├── components/     # 汎用コンポーネント
│   │   ├── hooks/          # 汎用フック
│   │   ├── utils/          # ヘルパー関数
│   │   ├── constants/      # 全体の定数
│   │   └── contexts/       # Context API
│   │
│   ├── navigation/         # ナビゲーション
│   ├── services/           # 共通サービス
│   │   ├── supabase/
│   │   │   └── client.js
│   │   └── gas/
│   │       └── gasApi.js
│   └── assets/             # 静的ファイル
│
├── .env.example
├── .gitignore
├── app.json
└── package.json
```

### コーディング規約

**ファイル命名**

| 種類 | 形式 | 拡張子 | 例 |
| ---- | ---- | ---- | ---- |
| コンポーネント | PascalCase | .jsx | EventCard.jsx |
| サービス | camelCase | .js | eventService.js |
| フック | useCamelCase | .js | useEvents.js |
| ユーティリティ | camelCase | .js | validation.js |

**コメント規則**
- 全ての関数に JSDoc 形式の日本語コメントを書く
- 変数にもコメントを書く

**命名規則**
- Supabase API に合わせる：
  - データ取得：selectEvents, selectEventById
  - データ挿入：insertEvent
  - データ更新：updateUser
  - データ削除：deleteEvent
- 変数：
  - 通常の変数：camelCase（例：userName, eventList）
  - 定数：UPPER_SNAKE_CASE（例：MAX_RETRY_COUNT）
  - ブール：is, has, can, should で始める（例：isLoading, hasError）

### 開発の基本原則

**コード品質**
- DRY 原則：重複を避ける
- 意味のある変数名・関数名を使う
- 小さな問題も放置せず、発見次第修正
- コメントは「なぜ」を説明、「何を」はコードで表現
- ボーイスカウトルール：コードを見つけた時よりも良い状態で残す

**エラーハンドリング**
- エラーは必ず解決する（抑制しない）
- 早期にエラーを検出し、明確なエラーメッセージを提供
- 外部 API やネットワーク通信は必ず失敗する可能性を考慮
- try-catch でエラーを握りつぶさない

**セキュリティ**
- API キー、パスワードは環境変数で管理（ハードコード禁止）
- すべての外部入力を検証
- 必要最小限の権限で動作
- 不要な依存関係を避ける

**パフォーマンス**
- 推測ではなく計測に基づいて最適化
- 必要になるまでリソースの読み込みを遅延
- N+1 問題やオーバーフェッチを避ける

**保守性**
- 機能追加と同時に既存コードの改善を検討
- 使用されていないコードは積極的に削除
- 技術的負債は明示的にコメントに記録

**Git 運用**
- コミットメッセージ
  - コンベンショナルコミット形式を使用
  - 形式：[種類] 変更内容
  - 種類：add, fix, update, remove, docs
- コミットの原則
  - コミットは原子的で、単一の変更に焦点を当てる
  - 明確で説明的なメッセージを書く
  - main/develop ブランチへの直接コミットは避ける

### 禁止事項
- コメントなしのコード
- 命名規則を無視
- 仕様書を読まずに実装
- エラーハンドリング省略
- varの使用（const/letを使う）
- マジックナンバー（定数化する）
- TypeScript で書く（JavaScript のみ）
- API キーやパスワードのハードコード
- エラーの抑制（@ts-ignore や try-catch で握りつぶす）
- 使用されていないコードの放置

### 依存関係の管理
- 本当に必要な依存関係のみを追加
- package-lock.json を必ずコミット
- 新しい依存関係追加前にライセンス、サイズ、メンテナンス状況を確認
- セキュリティパッチのため定期的に更新

### デバッグ
- 問題を確実に再現できる手順を確立
- 最近の変更から調査を開始
- 適切なツールを活用
- 調査結果と解決策を記録

**必ずプロジェクト仕様書を読んでから実装してください。**

---

## AI 用プロンプトファイルの配置
この AI ルールを以下のファイル名・配置場所でコピーして使用してください：

- Claude Code
  - ファイル名： claude.md
  - 配置場所： docs/AI用プロンプト/claude.md
- Cursor
  - ファイル名： AGENTS.md
  - 配置場所： プロジェクトルート /AGENTS.md
- Gemini
  - ファイル名： Gemini.md
  - 配置場所： docs/AI用プロンプト/Gemini.md
- GitHub Copilot
  - ファイル名： copilot-instructions.md
  - 配置場所： .github/copilot-instructions.md

全て同じ内容をコピペして、ファイル名と配置場所だけ変えれば OK です！

---

## 開発ルール 用語解説

### JavaScript (ジャバスクリプト)
- 説明： プログラミング言語の一つ。Web 開発やアプリ開発で広く使われる
- 用途： このプロジェクトのメインの開発言語

### React Native (リアクトネイティブ)
- 説明： JavaScript でスマホアプリ（iOS/Android）を作るためのフレームワーク
- 例え： 1 つのコードで 2 種類のアプリが作れる魔法のツール

### Expo (エクスポ)
- 説明： React Native の開発を簡単にするツール
- 用途： スマホで QR コードを読み取るだけでアプリを確認できる

### Supabase (スパベース)
- 説明： バックエンド（サーバー側）をコード不要で作れるサービス
- 機能： データベース、認証、ストレージなど

### GAS (Google Apps Script / ジーエーエス / ガス)
- 説明： Google のサービス（スプレッドシート、Gmail など）を操作できるプログラミング言語
- 用途： Google スプレッドシートからデータを取得するなど

### コンポーネント (Component)
- 説明： UI の部品。ボタン、カード、画面などの再利用可能なパーツ
- 例え： レゴブロックのようなもの。小さな部品を組み合わせてアプリを作る
- 具体例： 「イベントカード」というコンポーネントを作れば、イベント一覧で何度も使える

### Hook (フック)
- 説明： React の機能で、コンポーネントに「機能」を追加する仕組み
- 例：
  - useState：データを保存する機能
  - useEffect：画面が表示されたときに何かする機能
  - useAuth：ログイン状態を管理する機能（カスタムフック）
- 例え： 部品（コンポーネント）に「電池」や「モーター」を付けるようなもの

### カスタムフック (Custom Hook)
- 説明： 自分で作った Hook。複雑な処理をまとめて、色々な場所で再利用できるようにする
- 例： useAuthを作れば、どの画面でもログイン状態を簡単に使える
- 利点： 同じコードを何度も書かなくて済む

### ヘルパー関数 (Helper Function)
- 説明： よく使う処理をまとめた関数。「お助け関数」のこと
- 例：
  - 日付を「2024 年 1 月 1 日」に変換する関数
  - メールアドレスが正しいかチェックする関数
- 利点： 同じ処理を色々な場所で使える

### Props (プロップス)
- 説明： 親コンポーネントから子コンポーネントにデータを渡す仕組み
- 例え： 関数の引数のようなもの
- 具体例： イベントカードに「イベント情報」を渡す

### State (ステート)
- 説明： コンポーネント内で管理するデータ（状態）
- 例：
  - ログイン中かどうか
  - 読み込み中かどうか
  - 取得したイベント一覧
- 特徴： State が変わると、画面が自動的に更新される

### Context (コンテキスト)
- 説明： アプリ全体でデータを共有する仕組み
- 用途： ログイン情報やテーマ設定など、複数の画面で使うデータ
- 例え： みんなが見られる「掲示板」のようなもの

### API (エーピーアイ)
- 説明： Application Programming Interface の略。アプリ同士がデータをやり取りする仕組み
- 例： アプリからサーバーに「ユーザー情報をください」とお願いする

### 非同期処理 (Asynchronous / ひどうきしょり)
- 説明： 時間がかかる処理を待たずに次の処理を進めること
- キーワード： async, await
- 例： サーバーからデータを取得する間、画面を固まらせない
- 例え： 料理を作りながら、お湯が沸くのを待つ（同時進行）

### RLS (Row Level Security / アールエルエス)
- 説明： Supabase のセキュリティ機能。データベースの行レベルでアクセス制限
- 例： ユーザーは自分のデータのみ閲覧・更新可能

---

## 開発フロー

1. 仕様書作成
   - プロジェクト仕様書を作成
   - docs/プロジェクト仕様書.mdに記載
   - テンプレートに沿って記入
   - プロジェクト概要、機能要件、画面設計、DB 設計、API 設計などを記載
   - 仕様書のレビュー
   - 2〜3 人で内容を確認
   - 不明点や懸念点があれば議論
   - 全員が納得するまで修正

2. リポジトリ作成
   - GitHub 上でリポジトリを作成
   - リポジトリ命名規則に従う（例：festival-app-2024）
   - README テンプレートを配置
   - .gitignoreを設定
   - 初期セットアップ
     - React Native (Expo)プロジェクトを初期化
     - 必要なパッケージをインストール
     - 環境変数のサンプル（.env.example）を作成
   - ブランチ作成
     - mainブランチ（本番）
     - developブランチ（開発）を作成
   - ドキュメント配置
     - docs/フォルダを作成
     - プロジェクト仕様書を配置
     - 開発ルール、GitHub ルールを配置

3. Issue 作成とブランチ作成
   - Issue を作成
     - 仕様書を見ながら、大きな単位で Issue を作成
     - 例：「ログイン機能を実装」「イベント一覧画面を実装」
     - ラベルと担当者をアサイン
   - GitHub 上でブランチを切る
     - Issue 画面の「Development」欄から「Create a branch」
     - Branch source（どこから切るか）をdevelopに設定

4. 開発
   - 実装
     - 仕様書に沿って実装
     - コメント規則、命名規則に従う
     - 定期的にコミット
   - 動作確認
     - ローカルで動作確認
     - エラーが出ないか確認
   - プッシュ
     - 作業終了時またはキリの良いところで push
   - PR 作成
     - 実装が完了したら PR を作成
     - Discord で通知
   - レビュー・マージ
     - GitHub 上でレビューを受ける
     - 修正が必要なら対応
     - 承認されたらマージ

---

## ディレクトリ構成（機能ごと）

### 全体構成
```
project-root/
├── docs/                                # ドキュメント
│   ├── プロジェクト仕様書.md
│   ├── 開発ルール.md
│   ├── GitHubルール.md
│   └── AI用プロンプト/
│       ├── copilot-instructions.md
│       ├── AGENTS.md
│       ├── claude.md
│       └── Gemini.md
│
├── src/
│   ├── features/                        # 機能ごとにまとめる
│   │   └── 機能名/                     # 例：auth, event, user など
│   │       ├── components/            # UI部品
│   │       ├── screens/               # 画面
│   │       ├── services/              # API通信
│   │       ├── hooks/                 # カスタムフック
│   │       └── constants.js           # 定数
│   │
│   ├── shared/                         # 共通で使うもの
│   │   ├── components/                # 汎用コンポーネント
│   │   ├── hooks/                     # 汎用フック
│   │   ├── utils/                     # ユーティリティ関数（ヘルパー関数）
│   │   ├── constants/                 # 全体の定数
│   │   └── contexts/                  # Context API
│   │
│   ├── navigation/                     # ナビゲーション
│   ├── services/                       # 共通サービス
│   │   ├── supabase/
│   │   │   └── client.js
│   │   └── gas/
│   │       └── gasApi.js
│   └── assets/                         # 静的ファイル
│
├── supabase/                           # Supabase設定
├── gas/                                # Google Apps Script
├── .env.example
├── .env
├── .gitignore
├── app.json
├── package.json
└── README.md
```

### features/（機能フォルダ）の詳細
機能ごとにフォルダを作り、その機能に関連するコードを全てまとめます。

#### features/event/ の構成例
```
features/event/
├── components/          # この機能で使うUI部品
│   └── EventCard.jsx
├── screens/            # この機能の画面
│   └── EventListScreen.jsx
├── services/           # この機能のAPI通信
│   └── eventService.js
├── hooks/              # この機能のカスタムフック
│   └── useEvents.js
└── constants.js        # この機能で使う定数
```

---

## コンポーネント (components/)

### EventCard.jsx の例
```jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

/**
 * イベントカードコンポーネント
 * イベントのタイトル、日付、場所を表示する小さなカード
 *
 * 【使い方】
 * <EventCard
 *   event={{ id: 1, title: "模擬店", date: "2024-11-01", location: "A棟" }}
 *   onPress={() => console.log("カードがタップされた")}
 * />
 *
 * @param {Object} event - 表示するイベント情報
 * @param {number} event.id - イベントID
 * @param {string} event.title - イベントタイトル
 * @param {string} event.date - 開催日
 * @param {string} event.location - 開催場所
 * @param {Function} onPress - カードをタップしたときの処理
 */
function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 16, backgroundColor: "white", borderRadius: 8 }}>
        {/* イベントタイトル */}
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{event.title}</Text>

        {/* 開催日 */}
        <Text style={{ color: "gray", marginTop: 4 }}>📅 {event.date}</Text>

        {/* 開催場所 */}
        <Text style={{ color: "gray", marginTop: 4 }}>📍 {event.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default EventCard;
```

ポイント：
- 再利用できる：このカードを色々な画面で使える
- 小さく作る：1 つのコンポーネントは 1 つの役割だけ
- Props で柔軟に：渡すデータを変えれば、表示内容が変わる

---

## 画面 (screens/)

### EventListScreen.jsx の例
```jsx
import React from "react";
import { View, FlatList, Text } from "react-native";
import EventCard from "../components/EventCard";
import { useEvents } from "../hooks/useEvents";

/**
 * イベント一覧画面
 * アプリを開いたときに表示される、イベントの一覧を見る画面
 *
 * 【画面の役割】
 * 1. Supabaseからイベント一覧を取得
 * 2. EventCardを使って一覧表示
 * 3. カードをタップしたら詳細画面へ遷移（TODO）
 */
function EventListScreen() {
  // カスタムフックを使ってイベント一覧を取得
  // events：取得したイベントのリスト
  // isLoading：読み込み中かどうか
  // error：エラーがあればエラーメッセージ
  const { events, isLoading, error } = useEvents();

  /**
   * カードがタップされたときの処理
   * @param {Object} event - タップされたイベント
   */
  const handleCardPress = (event) => {
    console.log("タップされたイベント:", event.title);
    // TODO: 詳細画面に遷移する処理を追加
  };

  // 読み込み中の表示
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  // エラーの表示
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>エラーが発生しました: {error}</Text>
      </View>
    );
  }

  // イベント一覧の表示
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={events}
        // 各イベントをEventCardで表示
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => handleCardPress(item)} />
        )}
        // 各アイテムを識別するためのキー
        keyExtractor={(item) => item.id.toString()}
        // アイテム間の余白
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        // リストの余白
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

export default EventListScreen;
```

ポイント：
- 画面全体を作る：コンポーネントを組み合わせて 1 つの画面を作る
- データ取得は Hook で：useEvents()を使って簡単にデータ取得
- 状態に応じて表示を変える：読み込み中、エラー、成功でそれぞれ違う画面を表示

---

## services/ （サービス）

### eventService.js の例
```js
import { supabase } from "@/services/supabase/client";

/**
 * イベント一覧をSupabaseから取得する
 *
 * 【やっていること】
 * 1. Supabaseの「events」テーブルにアクセス
 * 2. 全てのデータ（*）を取得
 * 3. 開催日順（古い順）に並べ替え
 * 4. 取得したデータを返す
 *
 * @returns {Promise<Array>} イベント一覧の配列
 *
 * 【戻り値の例】
 * [
 *   { id: 1, title: "模擬店", date: "2024-11-01", location: "A棟" },
 *   { id: 2, title: "ライブ", date: "2024-11-02", location: "体育館" }
 * ]
 */
export const selectEvents = async () => {
  // Supabaseにデータを取得するようにお願い
  const { data, error } = await supabase
    .from("events") // eventsテーブルから
    .select("*") // 全てのカラムを取得
    .order("event_date", { ascending: true }); // 開催日順に並べ替え

  // エラーがあれば投げる（呼び出し側でキャッチする）
  if (error) {
    console.error("イベント取得エラー:", error);
    throw error;
  }

  // 正常に取得できたらデータを返す
  return data;
};

/**
 * 特定のイベントの詳細をSupabaseから取得する
 *
 * @param {number} eventId - 取得したいイベントのID
 * @returns {Promise<Object>} イベントの詳細情報
 *
 * 【使い方】
 * const event = await selectEventById(1);
 * console.log(event.title); // "模擬店"
 */
export const selectEventById = async (eventId) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId) // IDが一致するものだけ
    .single(); // 1件だけ取得

  if (error) {
    console.error("イベント詳細取得エラー:", error);
    throw error;
  }

  return data;
};
```

ポイント：
- Supabase との通信を担当：画面から直接 Supabase を呼ばず、service を経由する
- エラーハンドリング：エラーが起きたらコンソールに表示して、エラーを投げる
- Supabase の命名に合わせる：select, insert, update, deleteを使う

---

## hooks/ （カスタムフック）

### useEvents.js の例
```js
import { useState, useEffect } from "react";
import * as eventService from "../services/eventService";

/**
 * イベント一覧を取得するカスタムフック
 *
 * 【このフックがやってくれること】
 * 1. コンポーネントが表示されたら、自動でイベントを取得
 * 2. 読み込み中の状態を管理
 * 3. エラーが起きたら、エラーメッセージを保存
 * 4. 取得したデータを保存
 *
 * 【使い方】
 * function EventListScreen() {
 *   const { events, isLoading, error } = useEvents();
 *
 *   if (isLoading) return <Text>読み込み中...</Text>;
 *   if (error) return <Text>エラー: {error}</Text>;
 *   return <FlatList data={events} />;
 * }
 *
 * @returns {Object} イベント一覧と状態
 * @returns {Array} events - 取得したイベントの配列
 * @returns {boolean} isLoading - 読み込み中ならtrue
 * @returns {string|null} error - エラーメッセージ（エラーがなければnull）
 */
export const useEvents = () => {
  // 取得したイベント一覧を保存する
  // 最初は空の配列
  const [events, setEvents] = useState([]);

  // 読み込み中かどうかを保存する
  // 最初はtrue（読み込み中）
  const [isLoading, setIsLoading] = useState(true);

  // エラーメッセージを保存する
  // 最初はnull（エラーなし）
  const [error, setError] = useState(null);

  /**
   * コンポーネントが表示されたときに実行される処理
   */
  useEffect(() => {
    /**
     * イベントを取得する関数
     */
    const fetchEvents = async () => {
      try {
        // 読み込み開始
        setIsLoading(true);
        setError(null); // 前のエラーをクリア

        // eventServiceを使ってデータ取得
        const data = await eventService.selectEvents();

        // 取得成功：データを保存
        setEvents(data);
      } catch (err) {
        // 取得失敗：エラーメッセージを保存
        console.error("イベント取得失敗:", err);
        setError(err.message);
      } finally {
        // 成功でも失敗でも、読み込み完了
        setIsLoading(false);
      }
    };

    // 関数を実行
    fetchEvents();
  }, []); // 空の配列 = 最初の1回だけ実行

  // 画面で使えるように、3つの値を返す
  return {
    events, // イベント一覧
    isLoading, // 読み込み中かどうか
    error, // エラーメッセージ
  };
};
```

ポイント：
- 画面で簡単に使える：useEvents()を呼ぶだけで、データ取得から状態管理まで全部やってくれる
- useEffect で自動実行：画面が表示されたら自動でデータを取得
- useState で状態管理：イベント一覧、読み込み状態、エラーを保存
- 再利用できる：どの画面でもuseEvents()を使えば、同じようにデータを取得できる

---

## shared/（共通フォルダ）の詳細

### shared/utils/ （ヘルパー関数）

#### validation.js の例
```js
/**
 * メールアドレスの形式が正しいかチェックする
 *
 * 【やっていること】
 * 1. @が含まれているか
 * 2. @の前後に文字があるか
 * 3. @の後ろに.があるか
 *
 * @param {string} email - チェックしたいメールアドレス
 * @returns {boolean} 正しければtrue、間違っていればfalse
 *
 * 【使い方】
 * isValidEmail("test@example.com")  // true
 * isValidEmail("test")              // false
 * isValidEmail("@example.com")      // false
 */
export const isValidEmail = (email) => {
  // メールアドレスのパターン（正規表現）
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * パスワードの文字数が十分かチェックする
 *
 * @param {string} password - チェックしたいパスワード
 * @param {number} minLength - 最小文字数（デフォルトは6文字）
 * @returns {boolean} 条件を満たしていればtrue
 *
 * 【使い方】
 * isValidPassword("abc123", 6)   // true（6文字以上）
 * isValidPassword("abc", 6)      // false（6文字未満）
 */
export const isValidPassword = (password, minLength = 6) => {
  return password.length >= minLength;
};
```

#### formatDate.js の例
```js
/**
 * 日付を「2024年11月1日」形式に変換する
 *
 * 【やっていること】
 * ISO形式の日付文字列（例：2024-11-01T00:00:00Z）を
 * 読みやすい日本語形式に変換する
 *
 * @param {string} dateString - ISO形式の日付文字列
 * @returns {string} 日本語形式の日付
 *
 * 【使い方】
 * formatDate("2024-11-01T00:00:00Z")  // "2024年11月1日"
 */
export const formatDate = (dateString) => {
  // 文字列をDateオブジェクトに変換
  const date = new Date(dateString);

  // 年、月、日を取得
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるので+1
  const day = date.getDate();

  // 日本語形式で返す
  return `${year}年${month}月${day}日`;
};

/**
 * 日付を「11/1」形式に変換する（短い形式）
 *
 * @param {string} dateString - ISO形式の日付文字列
 * @returns {string} 短い形式の日付
 *
 * 【使い方】
 * formatShortDate("2024-11-01T00:00:00Z")  // "11/1"
 */
export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};
```

ポイント：
- 1 つのファイルに関連する関数をまとめる：バリデーション関連、日付関連など
- どこからでも使える：import { formatDate } from '@/shared/utils/formatDate'
- テストしやすい：入力と出力が明確なので、テストが書きやすい

---

## shared/constants/ （定数）

### colors.js の例
```js
/**
 * アプリ全体で使うカラーテーマ
 *
 * 【使い方】
 * import { COLORS } from '@/shared/constants/colors';
 * <View style={{ backgroundColor: COLORS.PRIMARY }} />
 */
export const COLORS = {
  // メインカラー（青）
  PRIMARY: "#3B82F6",

  // サブカラー（緑）
  SECONDARY: "#10B981",

  // エラー色（赤）
  DANGER: "#EF4444",

  // 警告色（オレンジ）
  WARNING: "#F59E0B",

  // テキスト色（濃いグレー）
  TEXT_PRIMARY: "#1F2937",

  // サブテキスト色（グレー）
  TEXT_SECONDARY: "#6B7280",

  // 背景色（薄いグレー）
  BACKGROUND: "#F9FAFB",

  // 白
  WHITE: "#FFFFFF",
};
```

### config.js の例
```js
/**
 * アプリの設定（環境変数など）
 */

// Supabase設定
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// GAS設定
export const GAS_API_KEY = process.env.EXPO_PUBLIC_GAS_API_KEY;
export const GAS_ENDPOINT = process.env.EXPO_PUBLIC_GAS_ENDPOINT;

// ページネーション設定
export const DEFAULT_PAGE_SIZE = 20; // 1ページに表示する件数
export const MAX_PAGE_SIZE = 100; // 最大取得件数
```

---

## services/supabase/client.js

```js
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/shared/constants/config";

/**
 * Supabaseクライアント
 *
 * 【やっていること】
 * Supabaseに接続するための「入り口」を作る
 * このclientを使って、データの取得・保存などを行う
 *
 * 【使い方】
 * import { supabase } from '@/services/supabase/client';
 * const { data } = await supabase.from('events').select('*');
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

---

## コメント規則

### 基本方針
- 必要十分なコメントを書く
- 「何をしているか」より「なぜそうしているか」を書く
- 自明なコードにはコメント不要
- 複雑なロジックには必ずコメントを書く

### 関数のコメント（JSDoc 形式）
すべての関数にはJSDoc 形式で日本語コメントを書く。

基本形式
```
/**
 * 関数の説明
 * @param {型} パラメータ名 - パラメータの説明
 * @returns {型} 戻り値の説明
 */
```

型の書き方
- @param {string} - 文字列
- @param {number} - 数値
- @param {boolean} - 真偽値
- @param {Array} - 配列
- @param {Object} - オブジェクト
- @param {Function} - 関数
- @param {Promise<型>} - Promise（非同期処理）
- @param {型|null} - nullの可能性がある

例 1：シンプルな関数
```js
/**
 * 2つの数値を足し算する
 * @param {number} a - 1つ目の数値
 * @param {number} b - 2つ目の数値
 * @returns {number} 合計値
 */
function add(a, b) {
  return a + b;
}
```

例 2：非同期関数
```js
/**
 * ユーザー情報を取得する
 * @param {string} userId - ユーザーID
 * @returns {Promise<Object>} ユーザー情報
 */
async function selectUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}
```

### 変数のコメント
関数以外の変数には、何の値かをコメントで書く。

```js
// APIのベースURL
const API_BASE_URL = "https://api.example.com";

// リトライの最大回数
const MAX_RETRY_COUNT = 3;

// ログイン中かどうか
const [isLoading, setIsLoading] = useState(false);

// 取得したイベント一覧
const [events, setEvents] = useState([]);
```

### 複雑なロジックのコメント
```js
/**
 * イベント開催日までの残り日数を計算する
 * @param {string} eventDate - イベント開催日（ISO形式）
 * @returns {number} 残り日数
 */
function calculateDaysUntilEvent(eventDate) {
  const now = new Date();
  const event = new Date(eventDate);

  // ミリ秒を日数に変換（1日 = 24時間 * 60分 * 60秒 * 1000ミリ秒）
  const diffInMs = event.getTime() - now.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
```

---

## 命名規則

### ファイル名の命名規則と説明

**コンポーネントファイル（.jsx）**
- 形式： PascalCase
- 拡張子： .jsx
- 説明： UI を表示する React コンポーネント。画面や UI 部品を作る
- 例：
  - LoginScreen.jsx - ログイン画面
  - EventCard.jsx - イベントカード部品
  - Button.jsx - ボタン部品

**サービスファイル（.js）**
- 形式： camelCase + Service
- 拡張子： .js
- 説明： API 通信を行うファイル。Supabase やその他の API とやり取りする
- 例：
  - authService.js - 認証関連の API 通信
  - eventService.js - イベント関連の API 通信
  - userService.js - ユーザー関連の API 通信

**ユーティリティファイル（.js）**
- 形式： camelCase
- 拡張子： .js
- 説明： ヘルパー関数をまとめたファイル。よく使う処理を再利用可能にする
- 例：
  - validation.js - バリデーション関数（メールチェックなど）
  - formatDate.js - 日付フォーマット関数
  - errorHandler.js - エラー処理関数

**フックファイル（.js）**
- 形式： camelCase（use から始める）
- 拡張子： .js
- 説明： カスタムフック。複雑な処理をまとめて再利用可能にする
- 例：
  - useAuth.js - 認証状態を管理するフック
  - useEvents.js - イベント一覧を取得するフック
  - useFetch.js - データ取得の汎用フック

**定数ファイル（.js）**
- 形式： camelCase
- 拡張子： .js
- 説明： 定数をまとめたファイル。変わらない値を一箇所で管理
- 例：
  - colors.js - カラー定数
  - config.js - アプリ設定
  - constants.js - その他の定数

**ディレクトリ**
- 形式： camelCase（小文字始まり）
- 説明： 関連するファイルをまとめるフォルダ
- 例：
  - components/ - コンポーネントをまとめる
  - services/ - サービスファイルをまとめる
  - hooks/ - カスタムフックをまとめる

### Supabase API に合わせた命名

**データ取得：select**
```js
// ✅ 良い例
export const selectEvents = async () => { ... };
export const selectEventById = async (id) => { ... };
export const selectUserBookmarks = async (userId) => { ... };
```

**データ挿入：insert**
```js
// ✅ 良い例
export const insertEvent = async (eventData) => { ... };
export const insertBookmark = async (bookmark) => { ... };
```

**データ更新：update**
```js
// ✅ 良い例
export const updateUser = async (userId, updates) => { ... };
export const updateEvent = async (eventId, updates) => { ... };
```

**データ削除：delete**
```js
// ✅ 良い例
export const deleteEvent = async (eventId) => { ... };
export const deleteBookmark = async (bookmarkId) => { ... };
```

### コード内の命名

**変数（camelCase）**
```js
const userName = "太郎";
const eventList = [];
const isLoading = false;
```

**定数（UPPER_SNAKE_CASE）**
```js
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;
```

**関数（camelCase、動詞から始める）**
```js
function fetchUserData() {}
function handleSubmit() {}
function validateEmail() {}
```

**React コンポーネント（PascalCase）**
```js
function LoginScreen() {}
function EventCard() {}
```

**カスタムフック（camelCase、use で始める）**
```js
function useAuth() {}
function useEvents() {}
```

**ブール型の変数（is, has, can, should で始める）**
```js
const isLoading = false;
const hasError = true;
const canEdit = true;
const shouldShowModal = false;
```

---

## プロジェクト仕様書（テンプレート）

```
# プロジェクト仕様書

最終更新日: YYYY/MM/DD

---

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [対象ユーザー](#対象ユーザー)
3. [機能要件](#機能要件)
4. [画面設計](#画面設計)
5. [データベース設計](#データベース設計)
6. [API 設計](#api設計)
7. [非機能要件](#非機能要件)
8. [使用技術](#使用技術)
9. [セキュリティ設計](#セキュリティ設計)

---

## プロジェクト概要

### 目的

（このシステムを作る目的・背景）

### スケジュール

- 開発開始：YYYY/MM/DD
- リリース予定：YYYY/MM/DD

---

## 対象ユーザー

### ○○ 部

- **いつ使うか：** （例：大学祭当日、準備期間中など）
- **どういうときに使うか：** （例：イベント情報を確認したいとき、チケットを購入するときなど）

### △△ 部

- **いつ使うか：**
- **どういうときに使うか：**

---

## 機能要件

### 1. ○○ 機能

**概要：**
（この機能で何ができるか）

**詳細仕様：**

- 〜の場合、〜となる
- 〜ボタンを押すと〜する

---

### 2. △△ 機能

（同様に記載）

---

## 画面設計

### 1. ○○ 画面

**画面名:** ScreenName  
**パス/識別子:** `/path`

**表示項目:**

- 項目 1（UI 要素の種類）
- 項目 2（UI 要素の種類）

**動作:**

1. ユーザーが〜を入力
2. 〜ボタンをタップ
3. 〜を実行
4. 成功 → 〜画面へ遷移
5. 失敗 → エラーメッセージを表示

---

### 2. △△ 画面

（同様に記載）

---

## データベース設計

### テーブル一覧

| テーブル名 | 説明         |
| ---------- | ------------ |
| users      | ユーザー情報 |
| events     | イベント情報 |

---

### users テーブル

**説明:** ユーザーアカウント情報を管理

| カラム名   | 型          | 制約             | 説明           |
| ---------- | ----------- | ---------------- | -------------- |
| id         | uuid        | PK               | ユーザー ID    |
| email      | text        | NOT NULL, UNIQUE | メールアドレス |
| name       | text        | NOT NULL         | ユーザー名     |
| created_at | timestamptz | NOT NULL         | 作成日時       |
| updated_at | timestamptz | NOT NULL         | 更新日時       |

**リレーション:**

- （他のテーブルとの関係）

---

### events テーブル

**説明:** イベント情報を管理

| カラム名   | 型          | 制約     | 説明             |
| ---------- | ----------- | -------- | ---------------- |
| id         | integer     | PK       | イベント ID      |
| title      | text        | NOT NULL | イベントタイトル |
| event_date | date        | NOT NULL | 開催日           |
| location   | text        |          | 開催場所         |
| created_at | timestamptz | NOT NULL | 作成日時         |
| updated_at | timestamptz | NOT NULL | 更新日時         |

**リレーション:**

- （他のテーブルとの関係）

---

## API 設計

### 1. Supabase REST API

**アクセス方法:**

ERP や外部システムが Supabase に直接アクセスする場合

**ベース URL:**
https://{PROJECT_ID}.supabase.co/rest/v1

**認証方法:**

以下のHTTPヘッダーを付ける
apikey: {SUPABASE_ANON_KEY}
Authorization: Bearer {SUPABASE_ANON_KEY}
Content-Type: application/json

**必要な情報:**
- `PROJECT_ID`: Supabaseプロジェクト設定から取得
- `SUPABASE_ANON_KEY`: Supabaseプロジェクト設定 > API > Project API keys から取得

---

#### イベント一覧取得

GET /events?select=*

**リクエスト例:**
```bash
curl -X GET 'https://abcdefg.supabase.co/rest/v1/events?select=*' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

レスポンス:

```
[
  {
    "id": 1,
    "title": "模擬店",
    "event_date": "2024-11-01",
    "location": "A棟",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### 特定イベント取得
GET /events?id=eq.{EVENT_ID}&select=*

リクエスト例:

```bash
curl -X GET 'https://abcdefg.supabase.co/rest/v1/events?id=eq.1&select=*' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

レスポンス:

```
[
  {
    "id": 1,
    "title": "模擬店",
    "event_date": "2024-11-01",
    "location": "A棟"
  }
]
```

#### イベント作成
POST /events

リクエスト例:

```bash
curl -X POST 'https://abcdefg.supabase.co/rest/v1/events' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新しいイベント",
    "event_date": "2024-11-01",
    "location": "B棟"
  }'
```

レスポンス:

```json
{
  "id": 2,
  "title": "新しいイベント",
  "event_date": "2024-11-01",
  "location": "B棟",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### 2. GAS API

**アクセス方法:**

GAS（Google Apps Script）がデータを加工して ERP や外部システムに提供する場合

**ベース URL:**
https://script.google.com/macros/s/{DEPLOY_ID}/exec

**認証方法:**

クエリパラメータkeyに API キーを指定

?key={API_KEY}

**必要な情報:**

DEPLOY_ID: GAS をデプロイした後に発行される ID
API_KEY: GAS のスクリプトプロパティで設定した API キー

**GAS のデプロイ方法:**

Google Apps Script エディタで「デプロイ」→「新しいデプロイ」
種類：「ウェブアプリ」
アクセス権限：「全員」
デプロイ後に表示される「ウェブアプリの URL」がDEPLOY_IDを含む URL

#### 鍵の貸し出し状況取得

**説明:**
Google スプレッドシートから鍵の貸し出し状況を取得

GET /exec?key={API_KEY}&action=getKeys&date={YYYY-MM-DD}

パラメータ:

| 名前 | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| key | string | Yes | API キー |
| action | string | Yes | getKeys固定 |
| date | string | Yes | 取得する日付（YYYY-MM-DD 形式） |

リクエスト例:

```bash
curl 'https://script.google.com/macros/s/ABC123.../exec?key=your-api-key&action=getKeys&date=2024-11-01'
```

レスポンス（成功時）:

```json
{
  "data": [
    {
      "date": "2024-11-01",
      "key_id": "K001",
      "room_number": "A101",
      "borrower": "山田太郎",
      "status": "貸出中"
    }
  ]
}
```

レスポンス（エラー時）:

```json
{
  "error": "Invalid API key"
}
```

#### イベント集計データ取得

**説明:**
Supabase と Google スプレッドシートのデータを集計して提供

GET /exec?key={API_KEY}&action=getEventSummary&date={YYYY-MM-DD}

パラメータ:

| 名前 | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| key | string | Yes | API キー |
| action | string | Yes | getEventSummary固定 |
| date | string | Yes | 集計する日付（YYYY-MM-DD 形式） |

リクエスト例:

```bash
curl 'https://script.google.com/macros/s/ABC123.../exec?key=your-api-key&action=getEventSummary&date=2024-11-01'
```

レスポンス（成功時）:

```json
{
  "data": {
    "date": "2024-11-01",
    "total_events": 15,
    "total_participants": 1200,
    "events": [
      {
        "title": "模擬店",
        "participants": 500
      }
    ]
  }
}
```

---

## 非機能要件

### パフォーマンス
- 画面遷移は 3 秒以内
- API 応答時間は 1 秒以内

### 可用性
- イベント期間中は稼働率 99%以上

### スケーラビリティ
- 同時アクセス数：○○ 人程度を想定

### 対応環境
- iOS: 15.0 以上
- Android: Android 10 以上

---

## 使用技術

### フロントエンド
- React Native (Expo SDK XX)
  - 理由：iOS/Android アプリを一つのコードで開発

### バックエンド
- Supabase
- PostgreSQL データベース
- 認証機能
- ストレージ

### その他
- GAS (Google Apps Script)
  - 用途：外部システム（ERP）との連携、Google スプレッドシートとの連携

### 開発ツール
- Git/GitHub
- Visual Studio Code
- Expo Go

---

## セキュリティ設計

### 認証・認可
- 認証方式: Supabase Auth（JWT）
- セッション管理: トークンベース

### データ保護
- 通信: HTTPS 通信のみ
- API キー管理: 環境変数で管理（.env）
- Supabase RLS: Row Level Security (RLS)を設定し、ユーザーは自分のデータのみ閲覧・更新可能

---

## 更新履歴

| 日付 | バージョン | 更新内容 | 更新者 |
| ---- | ---- | ---- | ---- |
| 2024/01/01 | 1.0 | 初版作成 | 名前 |
