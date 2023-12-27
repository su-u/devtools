import React, { FC } from 'react';
import { DummyGenerator } from '@/app/dummy_generator/DummyGenerator';

export const metadata = {
  title: 'Dev Toolkit - ダミーデータの生成',
};

const DummyGeneratorPage: FC = () => {
  return <DummyGenerator />;
};

export default DummyGeneratorPage;
