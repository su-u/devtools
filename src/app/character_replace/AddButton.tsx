import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React, { FC } from 'react';

export const AddButton: FC<ButtonProps> = (props) => {
  return (
    <Button icon={<PlusOutlined />} size="small" {...props}>
      追加
    </Button>
  );
};
