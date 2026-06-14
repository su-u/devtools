import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { forwardRef } from 'react';

type Props = DatePickerProps;

export const DatePicker = forwardRef<any, Props>((props, ref) => {
  return (
    <AntDatePicker
      // @ts-ignore
      showTime={{ format: 'HH:mm:ss' }}
      format="YYYY-MM-DD HH:mm:ss"
      changeOnBlur
      allowClear={false}
      ref={ref}
      {...props}
    />
  );
});
DatePicker.displayName = 'DatePicker';
