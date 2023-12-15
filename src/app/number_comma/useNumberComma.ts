import { useCustomForm } from '@/components/common/Form/useCustomForm';

type NumberCommaForm = {
  input: string;
  separator: string;
};

const SEPARATOR_LIST = [
  {
    label: ',',
    value: ',',
  },
  {
    label: '_',
    value: '_',
  },
];

const DEFAULT_VALUES: NumberCommaForm = {
  input: '',
  separator: SEPARATOR_LIST[0].value,
};

export const useNumberComma = () => {
  const methods = useCustomForm<NumberCommaForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { control, watch } = methods;

  const input = watch('input', DEFAULT_VALUES.input);
  const separator = watch('separator', DEFAULT_VALUES.separator);
  const output = comma(input, separator);

  return {
    methods,
    output,
    SEPARATOR_LIST,
    DEFAULT_VALUES,
  };
};

export const comma = (num: string, separator: string = ',') => {
  const [integer, decimal] = num.split('.');
  let ret = integer.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separator}`);
  if (decimal) {
    ret += '.' + decimal;
  }
  return ret;
};
