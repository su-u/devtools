import React, { FC } from 'react';
import { JsonFormatter } from '@/app/json_formatter/JsonFormatter';

export const metadata = {
  title: 'Dev Toolkit - JSONフォーマット',
};

const JsonFormatterPage: FC = () => {
  return <JsonFormatter />;
};

export default JsonFormatterPage;
