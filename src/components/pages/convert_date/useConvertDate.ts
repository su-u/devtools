import { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import TIME_ZONES, { TimeZone } from 'timezones-list';
import { useForm } from 'react-hook-form';
import { dayjs } from '@/lib/dayjs';
import { useEffect } from 'react';

type characterCountForm = {
  inputDate: Dayjs;
  inputUnixTime: string;
  timezone: string;
};

export const useConvertDate = () => {
  const methods = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
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

  useEffect(() => setValue('inputDate', dayjs()), []);

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
