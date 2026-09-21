import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import '@/styles/globals.scss';
import '@/styles/custom.globals.scss';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import { JsonLd } from '@/components/common/JsonLd';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 無料の開発者向けWebツール集`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'su-u', url: 'https://github.com/su-u' }],
  creator: 'su-u',
  category: 'technology',
  alternates: { canonical: '/' },
  verification: {
    google: 'XbfQBUU8iwwFG0-q5UtR_Rde1UfvDzdspEHt2tPs-Uw',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - 無料の開発者向けWebツール集`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: `${SITE_NAME} - 無料の開発者向けWebツール集`,
    description: SITE_DESCRIPTION,
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#181818',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'ja-JP',
  };

  return (
    <html lang="ja">
      <body>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        <JsonLd data={websiteJsonLd} />
        <AntdRegistry>{children}</AntdRegistry>
        <React.Suspense fallback={null}>
          <GoogleAnalytics />
        </React.Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
