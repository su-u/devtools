import React, { FC } from 'react';
import { CharacterCount } from '@/app/character_count/CharacterCount';

export const metadata = {
  title: 'Dev Toolkit - 文字数カウント',
};

const CharacterCountPage: FC = () => {
  return <CharacterCount />;
};

export default CharacterCountPage;
