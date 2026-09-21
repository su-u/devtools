import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { Punycode } from '@/app/punycode/Punycode';

const heading = 'punycode変換（日本語ドメイン変換）';
const description =
  '日本語ドメインなどの国際化ドメイン名とPunycodeを相互変換できる無料ツールです。';

export const metadata = createPageMetadata({
  path: '/punycode',
  title: 'Punycode・日本語ドメイン変換',
  description,
  keywords: ['Punycode', '日本語ドメイン', '国際化ドメイン'],
});

const PunycodePage: FC = () => {
  return <Punycode title={heading} description={description} />;
};

export default PunycodePage;
