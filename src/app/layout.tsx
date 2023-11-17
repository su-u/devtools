import { Analytics } from '@vercel/analytics/react';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/rs-custom.globals.scss';
import '@/styles/globals.scss';
import { Provider } from '@/app/Provider';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // テーマのチラつきを抑えるために指定
  const className = 'rs-theme-dark';

  return (
    <html lang="ja">
      <GoogleAnalytics />
      <body className={className}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
