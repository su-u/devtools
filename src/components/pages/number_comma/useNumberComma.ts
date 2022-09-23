import { useForm } from 'react-hook-form';

type characterCountForm = {
  input: string;
  separator: string;
};

export const comma = (num: string, separator: string = ',') => {
  const [integer, decimal] = num.split('.');
  let ret = integer.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separator}`);
  if (decimal) {
    ret += '.' + decimal;
  }
  return ret;
};

export const useNumberComma = () => {
  const { control, watch } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const input = watch('input') ?? '';
  const separator = watch('separator') ?? ',';
  const output = comma(input, separator);

  const selectData = [
    {
      label: ',',
      value: ',',
    },
    {
      label: '_',
      value: '_',
    },
  ];

  return {
    control,
    output,
    selectData,
  };
};
