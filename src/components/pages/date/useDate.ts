import { useForm } from 'react-hook-form';

type characterCountForm = {
  inputDate: string;
  inputUnixTime: string;
  timezone: string;
};

export const useDate = () => {
  const methods = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { watch, control } = methods;

  const inputDate = watch('inputDate') ?? '';
  const inputUnixTime = watch('inputUnixTime') ?? '';
  const output = inputDate;

  return {
    methods,
    control,
    output,
  };
};
