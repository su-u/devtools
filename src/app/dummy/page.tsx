import React, { FC } from 'react';
import { Dummy } from '@/app/dummy/Dummy';

export const metadata = {
  title: 'Dev Toolkit - ダミーデータの生成',
};

const DummyPage: FC = () => {
  return <Dummy />;
};

export default DummyPage;
