import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';
import { useState } from 'react';
import { useEffect } from 'react';
import plugin from 'dayjs/plugin/duration';

type DateDiffForm = {
  inputDate1: Dayjs | undefined;
  inputDate2: Dayjs | undefined;
};

const DEFAULT_VALUES: DateDiffForm = {
  inputDate1: undefined,
  inputDate2: undefined,
};
export const useDateDiff = () => {
  const methods = useCustomForm<DateDiffForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, control, setValue, getValues } = methods;

  const onChangeInputDate = useCallback(
    (name: keyof DateDiffForm) => (date: Dayjs) => {
      const d = date.set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
      setValue(name, d);
    },
    [setValue],
  );


  const date1 = watch('inputDate1');
  const date2 = watch('inputDate2');
  const outputs = convert(date1, date2);

  return {
    methods,
    outputs,
    onChangeInputDate,
  };
};

const convert = (date1: Dayjs | undefined, date2: Dayjs | undefined) => {
  if (!date1 || !date2) {
    return {
      year: '0',
      month: '0',
      dayFloat: '0',
      day: '0',
      minute: '0',
      week: '0',
      elapsedTime: '',
    }
  }
  console.log(date1.toISOString(), date2.toISOString());
  const f = new Intl.NumberFormat('ja-JP');
  const year = f.format(date2.diff(date1, 'year'));
  const month = f.format(date2.diff(date1, 'month'));
  const dayFloat = f.format(date2.diff(date1, 'day', true));
  const day = f.format(date2.diff(date1, 'day'));
  const hour = f.format(date2.diff(date1, 'hour'));
  const minute = f.format(date2.diff(date1, 'minute', true));
  const second = f.format(date2.diff(date1, 'second', true));
  const week = f.format(date2.diff(date1, 'week'));

  // const elapsedTime = dayjs(dayjs.duration(date2.diff(date1)).asMilliseconds()).tz('UTC').format('HH:mm:ss')
  const diff = dayjs.duration(date2.diff(date1, 'second'), 'second');
  const elapsedTime = convertElapsedTime(diff);

  return {
    day,
    dayFloat,
    month,
    minute,
    week,
    elapsedTime,
  }
};

const convertElapsedTime = (diff: plugin.Duration) => {
  const y = Math.floor(diff.asYears());
  const m = Math.floor(diff.asMonths());
  const d = Math.floor(diff.asDays());
  const h = Math.floor(diff.asHours());
  const n = Math.floor(diff.asMinutes());
  const s = Math.floor(diff.asSeconds());

  return `${y}年${m}月${d}日${h}時${n}分${s}秒`;
}