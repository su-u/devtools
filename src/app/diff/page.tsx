import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { Diff } from '@/app/diff/Diff';

const heading = 'テキスト差分';
const description =
  '2つのテキストを並べて差分を比較できる無料ツールです。変更箇所をブラウザ上で確認できます。';

export const metadata = createPageMetadata({
  path: '/diff',
  title: 'テキスト差分比較',
  description,
  keywords: ['テキスト差分', 'diff', '差分比較'],
});

const DiffPage: FC = () => {
  return <Diff title={heading} description={description} />;
};

export default DiffPage;
