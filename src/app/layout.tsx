import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Head from 'next/head';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/globals.scss';
import '@/styles/rs-custom.globals.scss';
import { Provider } from '@/app/Provider';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Dev Toolkit',
  description: 'Web utility tools for developers',
  authors: {
    name: 'su-u',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // テーマのチラつきを抑えるために指定
  const className = 'rs-theme-dark';

  return (
    <html lang="ja">
      <Head>
        <meta
          name="google-site-verification"
          content="XbfQBUU8iwwFG0-q5UtR_Rde1UfvDzdspEHt2tPs-Uw"
        />
        <GoogleAnalytics />
      </Head>
      <body className={className}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
