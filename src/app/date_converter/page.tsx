import React, { FC } from 'react';
import { DateConverter } from '@/app/date_converter/DateConverter';

export const metadata = {
  title: 'Dev Toolkit - 日時の変換',
};

const DateConverterPage: FC = () => {
  return <DateConverter />;
};

export default DateConverterPage;
