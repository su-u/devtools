import { Dayjs } from 'dayjs';
import { useMemo, useEffect, useCallback, useState, ChangeEvent } from 'react';
import TIME_ZONES from 'timezones-list';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { dayjs } from '@/lib/dayjs';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type dateConverterForm = {
  inputDate: Dayjs | undefined;
  timezone: string | undefined;
  customFormat: string;
};

export const useDateTimeConverter = () => {
  const methods = useCustomForm<dateConverterForm>({
    defaultValues: {
      inputDate: undefined,
      timezone: undefined,
      customFormat: '',
    },
  });
  const { watch, control, setValue, getValues } = methods;
  useFormPersistence('datetime_converter', methods, (values) => {
    setValue('inputDate', dayjs(values?.inputDate));
    setValue('timezone', values?.timezone);
    setValue('customFormat', values?.customFormat);
  });

  const timezones = useMemo(
    () => TIME_ZONES.map(({ label, tzCode }) => ({ label: label, value: tzCode })),
    [],
  );
  const timezone = watch('timezone') ?? 'UTC';
  const [output, setOutput] = useState<any>({});

  const onChangeInputDate = useCallback(
    (date: Dayjs) => {
      setValue('inputDate', date);
    },
    [setValue],
  );

  const onChangeTimezone = useCallback(
    (event: string) => {
      setValue('timezone', event.toString());
    },
    [setValue, onChangeInputDate],
  );

  const onChangeCustomFormat = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue('customFormat', value);
    },
    [setValue],
  );

  useEffect(() => {
    const { inputDate, timezone, customFormat } = getValues();
    setOutput({
      ...convert(inputDate, timezone),
      customFormat: customConvert(inputDate, timezone, customFormat),
    });
  }, [watch('inputDate'), watch('timezone'), watch('customFormat')]);

  return {
    methods,
    control,
    output,
    timezones,
    onChangeInputDate,
    onChangeTimezone,
    onChangeCustomFormat,
  };
};

const convert = (date: Dayjs, timezone: string) => {
  console.log(date, timezone);
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
