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
      timezone: dayjs.tz.guess(),
      customFormat: '',
    },
  });
  const { watch, control, setValue, getValues } = methods;
  useFormPersistence('date_converter', methods, (defaultValues) => {
    setValue('inputDate', defaultValues?.inputDate);
    setValue('timezone', defaultValues?.timezone);
    setValue('customFormat', defaultValues?.customFormat);
  });

  const timezones = useMemo(
    () => TIME_ZONES.map(({ label, tzCode }) => ({ label: label, value: tzCode })),
    [],
  );
  const timezone = watch('timezone') ?? 'UTC';

  useEffect(() => {
    const initDate = dayjs();
    setValue('inputDate', initDate);
  }, [setValue]);
  const [output, setOutput] = useState<any>(() => convert(watch('inputDate'), timezone));

  const onChangeInputDate = useCallback(
    (date: Dayjs) => {
      const { timezone, customFormat } = getValues();
      if (!date.isValid()) return;

      setValue('inputDate', date);
      setOutput({
        ...convert(date, timezone),
        customFormat: customConvert(date, timezone, customFormat),
      });
    },
    [setValue, getValues],
  );

  const onChangeTimezone = useCallback(
    (event: string) => {
      setValue('timezone', event.toString());
      const { inputDate } = getValues();
      onChangeInputDate(inputDate);
    },
    [setValue, getValues, onChangeInputDate],
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
