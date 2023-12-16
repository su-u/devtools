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
      const d = date.set('hour', 0).set('minute', 0).set('second', 0);
      setValue(name, d);
      console.log(name, d.toDate());
    },
    [setValue],
  );
  return {
    methods,
    onChangeInputDate,
  };
};
