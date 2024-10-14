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
      inputUnixTime: '',
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
  const [output, setOutput] =  useState<ReturnType<typeof convert>>();

  const onChangeInputUnixTime = useCallback(
    (value: DateConverterForm['inputUnixTime']) => {
      const d = dayjs.unix(Number(value));
      if (!d.isValid()) return;

      setValue('inputUnixTime', value);
    },
    [setValue],
  );

  const onChangeTimezone = useCallback(
    (event: string) => {
      setValue('timezone', event.toString());
    },
    [setValue],
  );

  const onChangeCustomFormat = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue('customFormat', value);
    },
    [setValue],
  );

  useEffect(() => {
    const { inputUnixTime, timezone, customFormat } = getValues();

    setOutput({
      ...convert(inputUnixTime, timezone, customFormat),
    });
  }, [watch('inputUnixTime'), watch('timezone'), watch('customFormat')]);

  return {
    control,
    output,
    timezones,
    onChangeInputUnixTime,
    onChangeTimezone,
    onChangeCustomFormat,
  };
};

const convert = (unixtime: string, timezone: string, format: string) => {
  const dateTimezone = dayjs(unixtime).tz(timezone);
  const ISO8601 = dateTimezone.format('YYYY-MM-DDTHH:mm:ssZ[Z]');
  const fullDate = dateTimezone.format('YYYY/MM/DD HH:mm:ss');
  const enDate = dateTimezone.format('LL');
  const enDatetime = dateTimezone.format('LLLL');
  const year = dateTimezone.format('YYYY');
  const month = dateTimezone.format('MM');
  const d = dateTimezone.format('DD');
  const week = dateTimezone.format('dd');
  const unixTime = unixtime;
  const customFormat = dateTimezone.format(format);

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
    customFormat,
    timezone,
  };
};
