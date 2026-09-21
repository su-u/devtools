import type { Metadata } from 'next';

export const SITE_NAME = 'Dev Toolkit';
export const SITE_URL = 'https://tools.su-u.dev';
export const SITE_DESCRIPTION =
  '文字数カウント、JSON整形、Base64変換などを無料で使える開発者向けWebツール集。入力内容はブラウザ内で処理され、サーバーには送信されません。';

type PageMetadataInput = {
  path: `/${string}`;
  title: string;
  description: string;
  keywords: readonly string[];
};

export function createPageMetadata({
  path,
  title,
  description,
  keywords,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      type: 'website',
      locale: 'ja_JP',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
