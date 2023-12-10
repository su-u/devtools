import { Dayjs } from 'dayjs';
import { useMemo, useEffect } from 'react';
import TIME_ZONES from 'timezones-list';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';

type dateConverterForm = {
  inputDate: Dayjs;
  inputUnixTime: string;
  timezone: string | null;
  customFormat: string;
};

export const useDateConverter = () => {
  const methods = useCustomForm<dateConverterForm>({
    defaultValues: {
      inputDate: dayjs(),
      timezone: dayjs.tz.guess(),
      customFormat: '',
    },
  });
  const { watch, control, setValue } = methods;
  const timezones = useMemo(
    () => TIME_ZONES.map(({ label, tzCode }) => ({ label: label, value: tzCode })),
    [],
  );

  const inputDate = watch('inputDate');
  const timezone = watch('timezone') ?? 'UTC';
  const customFormat = watch('customFormat');
  const inputUnixTime = watch('inputUnixTime');
  const output = {
    ...convert(inputDate, timezone),
    customFormat: customConvert(inputDate, timezone, customFormat),
  };

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
    timezone,
  };
};

const customConvert = (date: Dayjs, timezone: string, format: string) => {
  const dateTimezone = dayjs(date).tz(timezone);
  return dateTimezone.format(format);
};
