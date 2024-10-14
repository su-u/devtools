import React, { FC } from 'react';
import { DateTimeConverter } from '@/app/datetime_converter/DateTimeConverter';

export const metadata = {
  title: 'Dev Toolkit - 日時の変換',
};

const DateTimeConverterPage: FC = () => {
  return <DateTimeConverter />;
};

export default DateTimeConverterPage;
