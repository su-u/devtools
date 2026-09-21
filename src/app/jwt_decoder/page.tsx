import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { JwtDecoder } from '@/app/jwt_decoder/JwtDecoder';

const heading = 'JWTデコーダー';
const description =
  'JWTのヘッダーとペイロードをブラウザ上でデコードして確認できる無料ツールです。署名検証は行いません。';

export const metadata = createPageMetadata({
  path: '/jwt_decoder',
  title: 'JWTデコーダー',
  description,
  keywords: ['JWTデコード', 'JWT', 'トークン解析'],
});

const JwtDecoderPage: FC = () => {
  return <JwtDecoder title={heading} description={description} />;
};

export default JwtDecoderPage;
