import React, { FC } from 'react';
import { HomePage } from '@/app/home/Home';

export const metadata = {
  title: 'Dev Toolkit',
};
const indexPage: FC = () => {
  return <HomePage />;
};

export default indexPage;
