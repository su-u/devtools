import { useForm } from 'react-hook-form';

type characterCountForm = {
  inputDate: Date;
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
  });
  const { watch, control } = methods;

  const inputDate = watch('inputDate') ?? new Date();
  const inputUnixTime = watch('inputUnixTime');
  const output = convert(inputDate);

  return {
    methods,
    control,
    output,
  };
};

const convert = (date: Date) => {
  const ISO8601 = date.toISOString();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const d = date.getDate().toString();


  return {
    ISO8601,
    year,
    month,
    d
  }
}