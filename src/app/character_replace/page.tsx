import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { CharacterReplace } from '@/app/character_replace/CharacterReplace';

const heading = '文字列置換';
const description =
  '複数の検索文字列をまとめて置換できる無料ツールです。入力内容はブラウザ内だけで処理されます。';

export const metadata = createPageMetadata({
  path: '/character_replace',
  title: '文字列置換',
  description,
  keywords: ['文字列置換', '一括置換', 'テキスト置換'],
});

const CharacterReplacePage: FC = () => {
  return <CharacterReplace title={heading} description={description} />;
};

export default CharacterReplacePage;
