import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { Uuid } from '@/app/uuid/Uuid';

const heading = 'UUIDの生成';
const description =
  'UUIDをブラウザ上でまとめて生成できる無料ツールです。必要な件数を指定してコピーできます。';

export const metadata = createPageMetadata({
  path: '/uuid',
  title: 'UUID生成',
  description,
  keywords: ['UUID生成', 'UUID', 'GUID', '一括生成'],
});

const UuidPage: FC = () => {
  return <Uuid title={heading} description={description} />;
};

export default UuidPage;
