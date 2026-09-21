import type { Metadata } from 'next';
import { AppLayout } from '@/Layout/App';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Dev Toolkitにおけるアクセス情報やCookieなどの取り扱いについて説明します。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <AppLayout>
      <article className="content-page">
        <h1>プライバシーポリシー</h1>
        <p>最終更新日: 2026年9月21日</p>

        <h2>入力データについて</h2>
        <p>
          各ツールに入力した文字列やデータは、原則として利用中のブラウザ内で処理されます。当サイトは、ツールへの入力内容をサーバーへ送信または保存しません。
        </p>

        <h2>アクセス解析について</h2>
        <p>
          当サイトでは、利用状況の把握と改善のため、Google Analytics、Vercel AnalyticsおよびVercel
          Speed
          Insightsを利用しています。これらのサービスは、Cookieや類似技術を使用し、閲覧したページ、利用環境、概略の地域などの情報を収集する場合があります。収集される情報に、当サイトが個人を直接特定するための情報は含めていません。
        </p>

        <h2>広告について</h2>
        <p>
          現在、当サイトでは第三者配信の広告を掲載していません。将来広告を導入する場合、広告配信事業者がCookieなどを使用することがあります。その際は、利用する事業者、取得情報、オプトアウト方法を本ページへ追記します。
        </p>

        <h2>外部サイトへのリンク</h2>
        <p>
          当サイトから移動した外部サイトで提供される情報やサービスについては、各サイトのプライバシーポリシーが適用されます。
        </p>

        <h2>ポリシーの変更</h2>
        <p>
          法令やサービス内容の変更に応じて、本ポリシーを改定する場合があります。重要な変更は、本ページ上で分かりやすくお知らせします。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          本ポリシーに関するお問い合わせは、
          <a
            href="https://github.com/su-u/devtools/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Issues
          </a>
          からご連絡ください。
        </p>
      </article>
    </AppLayout>
  );
}
