import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { NumberComma } from '@/app/number_comma/NumberComma';

const heading = '数値区切り';
const description =
  '数値を3桁ごとのカンマ区切りへ変換できる無料ツールです。区切りを外した数値にも戻せます。';

export const metadata = createPageMetadata({
  path: '/number_comma',
  title: '数値のカンマ区切り変換',
  description,
  keywords: ['カンマ区切り', '数値変換', '3桁区切り'],
});

const NumberCommaPage: FC = () => {
  return <NumberComma title={heading} description={description} />;
};

export default NumberCommaPage;
