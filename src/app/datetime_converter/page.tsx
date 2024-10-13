import React, { FC } from 'react';
import { DateTimeConverter } from '@/app/datetime_converter/DateConverter';

export const metadata = {
  title: 'Dev Toolkit - 日時の変換',
};

const DateConverterPage: FC = () => {
  return <DateTimeConverter />;
};

export default DateConverterPage;
