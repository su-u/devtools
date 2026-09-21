import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { DateDiff } from '@/app/date_diff/DateDiff';

const heading = '日数計算';
const description =
  '2つの日付や日時の差を日数・時間などで計算できる無料ツールです。期間の確認に利用できます。';

export const metadata = createPageMetadata({
  path: '/date_diff',
  title: '日数計算',
  description,
  keywords: ['日数計算', '日付差分', '期間計算'],
});

const DateDiffPage: FC = () => {
  return <DateDiff title={heading} description={description} />;
};

export default DateDiffPage;
