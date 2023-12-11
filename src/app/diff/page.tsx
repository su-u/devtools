import React, { FC } from 'react';
import { Diff } from '@/app/diff/Diff';

export const metadata = {
  title: 'Dev Toolkit - テキスト差分',
};

const DiffPage: FC = () => {
  return <Diff />;
};

export default DiffPage;
