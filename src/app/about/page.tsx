import type { Metadata } from 'next';
import Link from 'next/link';
import { AppLayout } from '@/Layout/App';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'このサイトについて',
  description: 'Dev Toolkitの運営方針、提供しているWebツール、データの取り扱いについて説明します。',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <AppLayout>
      <article className="content-page">
        <h1>このサイトについて</h1>
        <p>
          {SITE_NAME}
          は、開発や日々の作業で繰り返し使う変換・確認作業を、ブラウザですばやく行うための無料Webツール集です。
        </p>

        <h2>提供している機能</h2>
        <p>
          文字数カウント、JSON整形、Base64やURLのエンコード、日時・基数変換、UUIDやダミーデータの生成などを提供しています。各ツールは登録不要で利用できます。
        </p>

        <h2>データの取り扱い</h2>
        <p>
          ツールに入力した文字列やデータは、原則として利用中のブラウザ内で処理され、当サイトのサーバーには送信されません。アクセス解析などの取り扱いについては、
          <Link href="/privacy">プライバシーポリシー</Link>をご確認ください。
        </p>

        <h2>運営・お問い合わせ</h2>
        <p>
          当サイトは
          <a href="https://github.com/su-u" target="_blank" rel="noopener noreferrer">
            su-u
          </a>
          が運営しています。不具合の報告やご意見は
          <a
            href="https://github.com/su-u/devtools/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Issues
          </a>
          からお寄せください。
        </p>
      </article>
    </AppLayout>
  );
}
