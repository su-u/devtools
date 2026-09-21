import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { Dummy } from '@/app/dummy/Dummy';

const heading = 'ダミーデータの生成';
const description =
  '名前、住所、数値などのテスト用ダミーデータをまとめて生成できる開発者向け無料ツールです。';

export const metadata = createPageMetadata({
  path: '/dummy',
  title: 'ダミーデータ生成',
  description,
  keywords: ['ダミーデータ', 'テストデータ', 'データ生成'],
});

const DummyPage: FC = () => {
  return <Dummy title={heading} description={description} />;
};

export default DummyPage;
