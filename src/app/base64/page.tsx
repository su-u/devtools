import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { Base64 } from '@/app/base64/Base64';

const heading = 'base64エンコード';
const description =
  '文字列をBase64形式へエンコード・デコードできる無料ツールです。入力内容はブラウザ内だけで処理されます。';

export const metadata = createPageMetadata({
  path: '/base64',
  title: 'Base64エンコード・デコード',
  description,
  keywords: ['Base64', 'エンコード', 'デコード', '変換'],
});

const Base64Page: FC = () => {
  return <Base64 title={heading} description={description} />;
};

export default Base64Page;
