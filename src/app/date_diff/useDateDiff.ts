import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type DateDiffForm = {
  inputDate1: Dayjs | undefined;
  inputDate2: Dayjs | undefined;
  isFormatFloat: boolean;
};

const DEFAULT_VALUES: DateDiffForm = {
  inputDate1: undefined,
  inputDate2: undefined,
  isFormatFloat: false,
};
export const useDateDiff = () => {
  const methods = useCustomForm<DateDiffForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, control, setValue, getValues } = methods;
  useFormPersistence('date_diff', methods, (defaultValues) => {
    setValue('inputDate1', defaultValues?.inputDate1);
    setValue('inputDate2', defaultValues?.inputDate2);
    setValue('isFormatFloat', defaultValues?.isFormatFloat);
  });

  const date1 = watch('inputDate1');
  const date2 = watch('inputDate2');
  const isFormatInt = watch('isFormatFloat');

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

  const outputs = convert(date1, date2, isFormatInt);

  return {
    methods,
    outputs,
    onChangeInputDate,
    onChangeInputDateTime,
  };
};

const convert = (date1: Dayjs | undefined, date2: Dayjs | undefined, isFormatFloat: boolean) => {
  if (!date1 || !date2) {
    return {
      year: '0',
      month: '0',
      day: '0',
      hour: '0',
      minute: '0',
      second: '0',
      week: '0',
      elapsedDays: '',
      elapsedTime: '',
    };
  }

  const f = isFormatFloat
    ? new Intl.NumberFormat('ja-JP', { minimumFractionDigits: 5 })
    : new Intl.NumberFormat('ja-JP');
  const year = f.format(date2.diff(date1, 'year', isFormatFloat));
  const month = f.format(date2.diff(date1, 'month', isFormatFloat));
  const day = f.format(date2.diff(date1, 'day', isFormatFloat));
  const hour = f.format(date2.diff(date1, 'hour', isFormatFloat));
  const minute = f.format(date2.diff(date1, 'minute', isFormatFloat));
  const second = f.format(date2.diff(date1, 'second', isFormatFloat));
  const week = f.format(date2.diff(date1, 'week', isFormatFloat));

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
    day,
    hour,
    minute,
    second,
    week,
    elapsedDays,
    elapsedTime,
  };
};
