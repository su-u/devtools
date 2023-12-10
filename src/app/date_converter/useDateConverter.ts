import { Dayjs } from 'dayjs';
import { useMemo, useEffect, useCallback, useState } from 'react';
import TIME_ZONES from 'timezones-list';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';

type dateConverterForm = {
  inputDate: Dayjs | undefined;
  inputUnixTime: string;
  timezone: string | undefined;
  customFormat: string;
};

export const useDateConverter = () => {
  const methods = useCustomForm<dateConverterForm>({
    defaultValues: {
      inputDate: undefined,
      inputUnixTime: '',
      timezone: dayjs.tz.guess(),
      customFormat: '',
    },
  });
  const { watch, control, setValue } = methods;
  const timezones = useMemo(
    () => TIME_ZONES.map(({ label, tzCode }) => ({ label: label, value: tzCode })),
    [],
  );
  const timezone = watch('timezone') ?? 'UTC';
  const customFormat = watch('customFormat');
  useEffect(() => {
    const initDate = dayjs();
    setValue('inputDate', initDate);
    setValue('inputUnixTime', initDate.unix().toString());
  }, [setValue]);
  const [output, setOutput] = useState<any>(() => convert(watch('inputDate'), timezone));
  const onChangeInputDate = useCallback(
    (value: Date) => {
      const d = dayjs(value);
      if (!d.isValid()) return;

      setValue('inputDate', d);
      setValue('inputUnixTime', d.unix().toString());
      setOutput({
        ...convert(d, timezone),
        customFormat: customConvert(d, timezone, customFormat),
      });
    },
    [setValue, timezone, customFormat],
  );
  const onChangeInputUnixTime = useCallback(
    (value: string) => {
      const d = dayjs.unix(Number(value));
      if (!d.isValid()) return;

      setValue('inputDate', d);
      setValue('inputUnixTime', value);

      setOutput({
        ...convert(d, timezone),
        customFormat: customConvert(d, timezone, customFormat),
      });
    },
    [setValue, timezone, customFormat],
  );

  return {
    methods,
    control,
    output,
    timezones,
    onChangeInputDate,
    onChangeInputUnixTime,
  };
};

const convert = (date: Dayjs, timezone: string) => {
  const dateTimezone = dayjs(date).tz(timezone);
  const ISO8601 = dateTimezone.format('YYYY-MM-DDTHH:mm:ssZ[Z]');
  const fullDate = dateTimezone.format('YYYY/MM/DD HH:mm:ss');
  const enDate = dateTimezone.format('LL');
  const enDatetime = dateTimezone.format('LLLL');
  const year = dateTimezone.format('YYYY');
  const month = dateTimezone.format('MM');
  const d = dateTimezone.format('DD');
  const week = dateTimezone.format('dd');
  const unixTime = dateTimezone.unix().toString();

  return {
    ISO8601,
    enDate,
    enDatetime,
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
