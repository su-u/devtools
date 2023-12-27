import { CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import type { ButtonProps } from 'antd/es/button/button';
import React, { FC } from 'react';
import { useCopy } from '@/hooks/useCopy';

type Props = {
  copyText: string;
  size?: ButtonProps['size'];
};

export const CopyButton: FC<Props> = ({ copyText, size }) => {
  const { copy, contextHolder } = useCopy();

  return (
    <Tooltip title="コピー">
      {contextHolder}
      <Button icon={<CopyOutlined />} size={size} onClick={copy(copyText)} />
    </Tooltip>
  );
};
