import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { Hash } from '@/app/hash/Hash';

const heading = 'ハッシュ';
const description =
  '入力文字列から各種アルゴリズムのハッシュ値を生成できる無料ツールです。ブラウザ内で処理します。';

export const metadata = createPageMetadata({
  path: '/hash',
  title: 'ハッシュ値生成',
  description,
  keywords: ['ハッシュ生成', 'hash', 'SHA', 'MD5'],
});

const HashPage: FC = () => {
  return <Hash title={heading} description={description} />;
};

export default HashPage;
