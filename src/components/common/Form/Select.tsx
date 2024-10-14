import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';
import { forwardRef } from 'react';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';

export const Select = forwardRef<BaseSelectRef, SelectProps>((props, ref) => {
  return <AntSelect ref={ref} {...props} />;
});
