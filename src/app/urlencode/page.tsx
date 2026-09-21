import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { UrlEncode } from '@/app/urlencode/UrlEncode';

const heading = 'URLエンコード';
const description =
  '文字列をURLエンコードまたはデコードできる無料ツールです。UTF-8など複数の文字コードに対応します。';

export const metadata = createPageMetadata({
  path: '/urlencode',
  title: 'URLエンコード・デコード',
  description,
  keywords: ['URLエンコード', 'URLデコード', 'パーセントエンコーディング'],
});

const UrlEncodePage: FC = () => {
  return <UrlEncode title={heading} description={description} />;
};

export default UrlEncodePage;
