import { convertRadix, RadixResult } from '@/app/radix_converter/radixConverterLib';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type RadixForm = {
  input: string;
  base: number;
};

export const BASE_OPTIONS = [
  { label: '2進数', value: 2 },
  { label: '8進数', value: 8 },
  { label: '10進数', value: 10 },
  { label: '16進数', value: 16 },
];

export const DEFAULT_VALUES: RadixForm = {
  input: '',
  base: 10,
};

const EMPTY_RESULT: RadixResult = { bin: '', oct: '', dec: '', hex: '' };

export const useRadixConverter = () => {
  const methods = useCustomForm<RadixForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  useFormPersistence('radix_converter', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
    setValue('base', defaultValues?.base);
  });

  const input = watch('input', DEFAULT_VALUES.input);
  const base = watch('base', DEFAULT_VALUES.base);

  let result = EMPTY_RESULT;
  let error = '';
  if (input.trim() !== '') {
    try {
      result = convertRadix(input, Number(base));
    } catch (e) {
      error = e instanceof Error ? e.message : '変換に失敗しました。';
    }
  }

  return {
    methods,
    result,
    error,
    baseOptions: BASE_OPTIONS,
  };
};
