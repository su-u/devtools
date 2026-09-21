import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { ColorConverter } from '@/app/color_converter/ColorConverter';

const heading = 'カラーコード変換';
const description =
  'HEX、RGB、HSLのカラーコードを相互変換できる無料ツールです。色のプレビューも確認できます。';

export const metadata = createPageMetadata({
  path: '/color_converter',
  title: 'カラーコード変換',
  description,
  keywords: ['カラーコード変換', 'HEX', 'RGB', 'HSL'],
});

const ColorConverterPage: FC = () => {
  return <ColorConverter title={heading} description={description} />;
};

export default ColorConverterPage;
