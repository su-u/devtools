import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';
import { FC } from 'react';

export const Select: FC<SelectProps> = (props) => {
  return <AntSelect {...props} />;
};
