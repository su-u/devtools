import { MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React, { FC } from 'react';

export const DeleteButton: FC<ButtonProps> = (props) => {
  return (
    <Button icon={<MinusOutlined />} size="small" {...props}>
      削除
    </Button>
  );
};
