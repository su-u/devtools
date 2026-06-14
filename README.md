# Dev Toolkit

Web utility tools for developers

開発者のための、Webユーティリティツール

https://tools.su-u.dev/

すべての処理はブラウザ上（クライアントサイド）で完結し、サーバーへはデータを送信しません。

## 技術スタック

- [Next.js 14](https://nextjs.org/)（App Router）/ React 18 / TypeScript
- UI: [Ant Design (antd)](https://ant.design/) + [Emotion](https://emotion.sh/)
- フォーム: [react-hook-form](https://react-hook-form.com/)
- エディタ: [CodeMirror](https://codemirror.net/)（差分は [Monaco Editor](https://microsoft.github.io/monaco-editor/)）
- テスト: [Jest](https://jestjs.io/)
- デプロイ: [Vercel](https://vercel.com/)

Node.js のバージョンは `.tool-versions`（`22.22.1`）に固定しています。パッケージマネージャーは npm を使用します。

## 開発の始め方

```bash
npm install

npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く

## コマンド

```bash
npm run dev          # 開発サーバー
npm run build        # 本番ビルド
npm start            # 本番サーバー
npm test             # テスト実行
npm run lint         # Lint
npm run format       # Prettier
```
