import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { JsonView } from './JsonView';

const heading = 'JSONビューアー';
const description =
  'JSONデータを見やすいツリー形式で表示できる無料ビューアーです。入力内容はブラウザ内で処理されます。';

export const metadata = createPageMetadata({
  path: '/json_view',
  title: 'JSONビューアー',
  description,
  keywords: ['JSONビューアー', 'JSON viewer', 'JSONツリー'],
});

const JsonViewPage: FC = () => {
  return <JsonView title={heading} description={description} />;
};

export default JsonViewPage;
