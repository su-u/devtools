import React, { FC } from 'react';
import { Punycode } from '@/app/punycode/Punycode';

export const metadata = {
  title: 'Dev Toolkit - punycode変換（日本語ドメイン変換）',
};

const PunycodePage: FC = () => {
  return <Punycode />;
};

export default PunycodePage;
