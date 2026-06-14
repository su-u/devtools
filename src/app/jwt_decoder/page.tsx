import React, { FC } from 'react';
import { JwtDecoder } from '@/app/jwt_decoder/JwtDecoder';

export const metadata = {
  title: 'Dev Toolkit - JWTデコーダー',
};

const JwtDecoderPage: FC = () => {
  return <JwtDecoder />;
};

export default JwtDecoderPage;
