import React, { FC } from 'react';
import { CharacterReplace } from '@/app/character_replace/CharacterReplace';

export const metadata = {
  title: 'Dev Toolkit - 文字列置換',
};

const CharacterReplacePage: FC = () => {
  return <CharacterReplace />;
};

export default CharacterReplacePage;
