import React, { FC } from 'react';
import { RadixConverter } from '@/app/radix_converter/RadixConverter';

export const metadata = {
  title: 'Dev Toolkit - 基数変換',
};

const RadixConverterPage: FC = () => {
  return <RadixConverter />;
};

export default RadixConverterPage;
