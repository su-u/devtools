import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { DateTimeConverter } from '@/app/datetime_converter/DateTimeConverter';

const heading = '日時->日時変換';
const description =
  '日時をISO 8601やUnix timeなどの形式へ変換し、指定したタイムゾーンで確認できる無料ツールです。';

export const metadata = createPageMetadata({
  path: '/datetime_converter',
  title: '日時・タイムゾーン変換',
  description,
  keywords: ['日時変換', 'タイムゾーン', 'ISO 8601', 'Unix time'],
});

const DateTimeConverterPage: FC = () => {
  return <DateTimeConverter title={heading} description={description} />;
};

export default DateTimeConverterPage;
