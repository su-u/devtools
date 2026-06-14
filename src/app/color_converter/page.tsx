import React, { FC } from 'react';
import { ColorConverter } from '@/app/color_converter/ColorConverter';

export const metadata = {
  title: 'Dev Toolkit - カラーコード変換',
};

const ColorConverterPage: FC = () => {
  return <ColorConverter />;
};

export default ColorConverterPage;
