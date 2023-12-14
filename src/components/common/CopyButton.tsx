import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';
import { useCopy } from '@/hooks/useCopy';

type Props = {
  copyText: string;
};

export const CopyButton: FC<Props> = ({ copyText }) => {
  const { copy } = useCopy();

  return <Button icon={<CopyOutlined />} onClick={copy(copyText)} />;
};
