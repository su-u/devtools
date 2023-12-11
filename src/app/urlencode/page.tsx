import React, { FC } from 'react';
import { UrlEncode } from '@/app/urlencode/UrlEncode';

export const metadata = {
  title: 'Dev Toolkit - URLエンコード',
};

const UrlEncodePage: FC = () => {
  return <UrlEncode />;
};

export default UrlEncodePage;
