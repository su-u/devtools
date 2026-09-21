import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { RadixConverter } from '@/app/radix_converter/RadixConverter';

const heading = '基数変換';
const description =
  '2進数・8進数・10進数・16進数を相互変換できる無料ツールです。開発時の値確認に利用できます。';

export const metadata = createPageMetadata({
  path: '/radix_converter',
  title: '基数変換',
  description,
  keywords: ['基数変換', '2進数', '8進数', '10進数', '16進数'],
});

const RadixConverterPage: FC = () => {
  return <RadixConverter title={heading} description={description} />;
};

export default RadixConverterPage;
