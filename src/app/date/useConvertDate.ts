import { Dayjs } from 'dayjs';
import { useMemo, useEffect } from 'react';
import TIME_ZONES from 'timezones-list';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';

type characterCountForm = {
  inputDate: Dayjs;
  inputUnixTime: string;
  timezone: string;
};

export const useConvertDate = () => {
  const methods = useCustomForm<characterCountForm>({
    defaultValues: {
      inputDate: dayjs(),
      timezone: dayjs.tz.guess(),
    },
  });
  const { watch, control, setValue } = methods;
  const timezones = useMemo(
    () => TIME_ZONES.map(({ label, tzCode }) => ({ label: label, value: tzCode })),
    [],
  );

  const inputDate = watch('inputDate');
  const timezone = watch('timezone');
  const inputUnixTime = watch('inputUnixTime');
  const output = convert(inputDate, timezone);

  useEffect(() => setValue('inputDate', dayjs()), [setValue]);

  return {
    methods,
    inputDate,
    control,
    output,
    timezones,
  };
};

const convert = (date: Dayjs, timezone: string) => {
  const dateTimezone = dayjs(date).tz(timezone);
  const ISO8601 = dateTimezone.format('YYYY-MM-DDTHH:mm:ssZ[Z]');
  const year = dateTimezone.format('YYYY');
  const month = dateTimezone.format('MM');
  const d = dateTimezone.format('DD');
  const week = dateTimezone.format('dd');
  const unixTime = dateTimezone.unix().toString();
  const fullDate = dateTimezone.format('YYYY/MM/DD HH:mm:ss');

  return {
    ISO8601,
    year,
    month,
    d,
    week,
    unixTime,
    fullDate,
  };
};
