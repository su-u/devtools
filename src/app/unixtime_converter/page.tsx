import React, { FC } from 'react';
import { UnixTimeConverter } from '@/app/unixtime_converter/UnixTimeConverter';

export const metadata = {
  title: 'Dev Toolkit - 日時の変換',
};

const UnixTimeConverterPage: FC = () => {
  return <UnixTimeConverter />;
};

export default UnixTimeConverterPage;
