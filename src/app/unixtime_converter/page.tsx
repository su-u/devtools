import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { UnixTimeConverter } from '@/app/unixtime_converter/UnixTimeConverter';

const heading = 'UnixTime->日時変換';
const description =
  'Unix timeと日時を相互変換し、複数の日時形式やタイムゾーンで確認できる無料ツールです。';

export const metadata = createPageMetadata({
  path: '/unixtime_converter',
  title: 'Unix time・日時変換',
  description,
  keywords: ['Unix time変換', 'Unix timestamp', '日時変換'],
});

const UnixTimeConverterPage: FC = () => {
  return <UnixTimeConverter title={heading} description={description} />;
};

export default UnixTimeConverterPage;
