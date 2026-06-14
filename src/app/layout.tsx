import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Head from 'next/head';
import React from 'react';
import '@/styles/globals.scss';
import '@/styles/custom.globals.scss';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Dev Toolkit',
  description: 'Web utility tools for developers',
  authors: {
    name: 'su-u',
  },
};

// 動的CSS(antd cssinjs / emotion)が読み込まれる前の初回描画で、
// レイアウトの骨格（サイドバー＋コンテンツの横並び等）が崩れないように
// 初期値を SSR HTML へインライン埋め込みする critical CSS。
const CRITICAL_CSS = `
.ant-layout{display:flex;flex-direction:row;height:100vh;background-color:#36393f;color:#fff}
.ant-layout-content{flex:auto;min-width:0;overflow:auto;padding:0 16px 20px}
.ant-layout-sider{background-color:#181818}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Head>
        <meta
          name="google-site-verification"
          content="XbfQBUU8iwwFG0-q5UtR_Rde1UfvDzdspEHt2tPs-Uw"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <GoogleAnalytics />
      </Head>
      <body>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        <AntdRegistry>{children}</AntdRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
