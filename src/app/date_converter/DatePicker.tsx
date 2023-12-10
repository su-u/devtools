import React, { FC } from 'react';
import { DatePicker as RSuiteDatePicker } from 'rsuite';
import type { RangeType } from 'rsuite/DateRangePicker';
import type { DatePickerProps } from 'rsuite/esm/DatePicker/DatePicker';
import { dayjs } from '@/lib/dayjs';

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

export const DatePicker: FC<Props> = (props) => {
  return (
    <RSuiteDatePicker
      ranges={predefinedRanges}
      appearance="default"
      format="yyyy-MM-dd HH:mm:ss"
      oneTap
      size="sm"
      cleanable={false}
      style={{ width: 250 }}
      {...props}
    />
  );
};
