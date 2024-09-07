import React, { FC } from 'react';
import { JsonView } from './JsonView';

export const metadata = {
  title: 'Dev Toolkit - JSONビューアー',
};

const JsonViewPage: FC = () => {
  return <JsonView />;
};

export default JsonViewPage;
