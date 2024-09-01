# account-book

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Todo

- [x] Vercel データベース作成＆紐づけ
- [x] カテゴリマスタ登録(seed)
- [x] ローカルで1件DBへ登録
- [x] Google ログイン機能（ローカル）
- [x] ログイン後に機能が利用ができる
- [x] グループ機能：デフォルトグループに紐づくデータが表示される
- [x] APIの保護
- [x] ログアウトボタン追加
- [x] postgreSQL への接続
- [x] CI/CD運用
- [x] 利用日付入力（過去の記録も入力可能になる）data_of_use
- [ ] front: 入力項目チェック
- [ ] Google ログイン機能（Vercel）
- [ ] 特定のID以外が利用した場合、共通エラーページに遷移する
- [ ] カテゴリ作成
- [ ] カテゴリ編集
- [ ] カテゴリ削除
- [ ] コネクションプール
- [ ] 明細降順表示
- [ ] 明細編集
- [ ] カテゴリ表示関数の Map 化
- [ ] 論理削除
- [ ] グラフ表示
- [ ] 合計金額表示
- [ ] issue: get しなくても一覧が更新される

## Migrating & Seeding

```bash
npx prisma migrate dev --name local
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
