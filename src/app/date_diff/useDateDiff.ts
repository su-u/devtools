import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';

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

  const onChangeInputDateTime = useCallback(
    (name: keyof DateDiffForm) => (date: Dayjs) => {
      const d = date.set('millisecond', 0);
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
    onChangeInputDateTime,
  };
};

const convert = (date1: Dayjs | undefined, date2: Dayjs | undefined) => {
  if (!date1 || !date2) {
    return {
      year: '0',
      month: '0',
      dayInt: '0',
      day: '0',
      hour: '0',
      minute: '0',
      second: '0',
      week: '0',
      elapsedDays: '',
      elapsedTime: '',
    };
  }

  const f = new Intl.NumberFormat('ja-JP');
  const year = f.format(date2.diff(date1, 'year', true));
  const month = f.format(date2.diff(date1, 'month', true));
  const day = f.format(date2.diff(date1, 'day', true));
  const dayInt = f.format(date2.diff(date1, 'day'));
  const hour = f.format(date2.diff(date1, 'hour', true));
  const minute = f.format(date2.diff(date1, 'minute', true));
  const second = f.format(date2.diff(date1, 'second', true));
  const week = f.format(date2.diff(date1, 'week', true));

  const du = dayjs.duration(date2.diff(date1));
  const d = Math.floor(du.asDays());
  const h = Math.floor(du.asHours());
  const m = Math.floor(du.asMinutes() % 60);
  const s = Math.floor(du.asSeconds() % 60);
  const elapsedDays = `${d}日${h % 24}時間${m}分${s}秒`;
  const elapsedTime = `${h}時間${m}分${s}秒`;

  return {
    year,
    month,
    dayInt,
    day,
    hour,
    minute,
    second,
    week,
    elapsedDays,
    elapsedTime,
  };
};
