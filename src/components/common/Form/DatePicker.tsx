import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import type { RangeType } from 'rsuite/DateRangePicker';
import { dayjs } from '@/lib/dayjs';
import { forwardRef } from 'react';
import { ReactNode } from 'react';
import { LegacyRef } from 'react';

type Props = DatePickerProps;

const predefinedRanges = [
  {
    label: '現在',
    value: dayjs().toDate(),
    placement: 'left',
  },
  {
    label: '昨日',
    value: dayjs().add(-1, 'day').toDate(),
    placement: 'left',
  },
  {
    label: '今月1日',
    value: dayjs().startOf('month').toDate(),
    placement: 'left',
  },
  {
    label: '今月月末',
    value: dayjs().endOf('month').toDate(),
    placement: 'left',
  },
  {
    label: '去年',
    value: dayjs().add(-1, 'year').toDate(),
    placement: 'left',
  },
  {
    label: '来年',
    value: dayjs().add(1, 'year').toDate(),
    placement: 'left',
  },
] as RangeType<Date>[];

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
