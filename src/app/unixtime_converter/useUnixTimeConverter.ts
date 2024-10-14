import { Dayjs } from 'dayjs';
import { useMemo, useEffect, useCallback, useState, ChangeEvent } from 'react';
import TIME_ZONES from 'timezones-list';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type DateConverterForm = {
  inputUnixTime: string;
  timezone: string | undefined;
  customFormat: string;
};

export const useUnixTimeConverter = () => {
  const methods = useCustomForm<DateConverterForm>({
    defaultValues: {
      inputUnixTime: undefined,
      timezone: undefined,
      customFormat: '',
    },
  });
  const { watch, control, setValue, getValues } = methods;
  useFormPersistence('unixtime_converter', methods, (values) => {
    setValue('inputUnixTime', values?.inputUnixTime);
    setValue('timezone', values?.timezone);
    setValue('customFormat', values?.customFormat);
  });

  const timezones = useMemo(
    () => TIME_ZONES.map(({ label, tzCode }) => ({ label: label, value: tzCode })),
    [],
  );
  const timezone = watch('timezone') ?? 'UTC';
  const [output, setOutput] = useState<any>(() => convert(getValues('inputUnixTime'), timezone));

  const onChangeInputUnixTime = useCallback(
    (value: DateConverterForm['inputUnixTime']) => {
      const d = dayjs.unix(Number(value));
      const { timezone, customFormat } = getValues();
      if (!d.isValid()) return;

      setValue('inputUnixTime', value);

      setOutput({
        ...convert(d, timezone),
        customFormat: customConvert(d, timezone, customFormat),
      });
    },
    [setValue, getValues],
  );

  const onChangeTimezone = useCallback(
    (event: string) => {
      console.log(event);
      setValue('timezone', event.toString());
      const { inputUnixTime } = getValues();
      onChangeInputUnixTime(inputUnixTime);
    },
    [setValue, getValues],
  );

  const onChangeCustomFormat = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue('customFormat', value);
      const { inputDate, timezone } = getValues();
      setOutput({
        ...convert(inputDate, timezone),
        customFormat: customConvert(inputDate, timezone, value),
      });
    },
    [getValues, setValue],
  );

  return {
    control,
    output,
    timezones,
    onChangeInputUnixTime,
    onChangeTimezone,
    onChangeCustomFormat,
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
