import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { CharacterCount } from '@/app/character_count/CharacterCount';

const heading = '文字数カウント';
const description =
  '文字数、空白を除いた文字数、全角・半角、行数をリアルタイムで数える無料ツールです。';

export const metadata = createPageMetadata({
  path: '/character_count',
  title: '文字数カウント',
  description,
  keywords: ['文字数カウント', '文字数', '行数', '全角', '半角'],
});

const CharacterCountPage: FC = () => {
  return <CharacterCount title={heading} description={description} />;
};

export default CharacterCountPage;
