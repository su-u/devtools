import { useForm } from 'react-hook-form';
import { Dayjs } from 'dayjs';
import { dayjs } from '@/lib/dayjs';

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
      timezone: 'Asia/Tokyo' }
  });
  const { watch, control } = methods;

  const inputDate = watch('inputDate');
  const inputUnixTime = watch('inputUnixTime');
  const output = convert(inputDate);

  return {
    methods,
    control,
    output,
  };
};

const convert = (date: Dayjs) => {
  const ISO8601 = date.format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  const year = date.format('YYYY');
  const month = date.format('MM');
  const d = date.format('DD');
  const week =  date.format('dd');
  const unixTime = date.unix().toString();
  const fullDate = date.format('YYYY/MM/DD HH:mm:ss')

  return {
    ISO8601,
    year,
    month,
    d,
    week,
    unixTime,
    fullDate,
  }
}