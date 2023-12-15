import React, { FC } from 'react';
import { DateDiff } from '@/app/date_diff/DateDiff';

export const metadata = {
  title: 'Dev Toolkit - 日数計算',
};

const DateDiffPage: FC = () => {
  return <DateDiff />;
};

export default DateDiffPage;
