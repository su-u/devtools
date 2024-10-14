import { InputNumber as AntInputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import React, { forwardRef } from 'react';

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  return <AntInputNumber {...props} />;
});
