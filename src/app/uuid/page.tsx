import React, { FC } from 'react';
import { Uuid } from '@/app/uuid/Uuid';

export const metadata = {
  title: 'Dev Toolkit - UUIDの生成',
};

const UuidPage: FC = () => {
  return <Uuid />;
};

export default UuidPage;
