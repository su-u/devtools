import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type NumberCommaForm = {
  input: string;
  separator: string;
};

export const SEPARATOR_LIST = [
  {
    label: ',',
    value: ',',
  },
  {
    label: '_',
    value: '_',
  },
];

export const DEFAULT_VALUES: NumberCommaForm = {
  input: '',
  separator: SEPARATOR_LIST[0].value,
};

export const useNumberComma = () => {
  const methods = useCustomForm<NumberCommaForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  useFormPersistence('number_comma', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
    setValue('separator', defaultValues?.separator);
  });

  const input = watch('input', DEFAULT_VALUES.input);
  const separator = watch('separator', DEFAULT_VALUES.separator);
  const output = comma(input, separator);

  return {
    methods,
    output,
  };
};

const comma = (num: string, separator: string = ',') => {
  const [integer, decimal] = num.split('.');
  let ret = integer.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separator}`);
  if (decimal) {
    ret += '.' + decimal;
  }
  return ret;
};
