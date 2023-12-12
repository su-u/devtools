import { InputNumber as AntInputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import React, { FC } from 'react';

export const InputNumber: FC<InputNumberProps> = (props) => {
  return <AntInputNumber {...props} />;
};
