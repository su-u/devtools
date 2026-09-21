import React, { FC } from 'react';
import { createPageMetadata } from '@/lib/seo';
import { JsonFormatter } from '@/app/json_formatter/JsonFormatter';

const heading = 'JSONフォーマット';
const description =
  'JSONを読みやすく整形したり、空白を除いて圧縮したりできる無料ツールです。構文エラーも確認できます。';

export const metadata = createPageMetadata({
  path: '/json_formatter',
  title: 'JSON整形・圧縮',
  description,
  keywords: ['JSON整形', 'JSONフォーマット', 'JSON圧縮'],
});

const JsonFormatterPage: FC = () => {
  return <JsonFormatter title={heading} description={description} />;
};

export default JsonFormatterPage;
