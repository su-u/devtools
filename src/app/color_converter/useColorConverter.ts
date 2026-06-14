import { convertColor, ColorResult } from '@/app/color_converter/colorConverterLib';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type ColorForm = {
  input: string;
};

export const DEFAULT_VALUES: ColorForm = {
  input: '#3498DB',
};

const EMPTY_RESULT: ColorResult = { hex: '', rgb: '', hsl: '', preview: 'transparent' };

export const useColorConverter = () => {
  const methods = useCustomForm<ColorForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  useFormPersistence('color_converter', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
  });

  const input = watch('input', DEFAULT_VALUES.input);

  let result = EMPTY_RESULT;
  let error = '';
  if (input.trim() !== '') {
    try {
      result = convertColor(input);
    } catch (e) {
      error = e instanceof Error ? e.message : '変換に失敗しました。';
    }
  }

  // ネイティブカラーピッカー用の #RRGGBB（アルファ・短縮を含まない6桁）
  const pickerValue = /^#[0-9A-F]{6}/.test(result.hex) ? result.hex.slice(0, 7) : '#000000';
  const onPickColor = (hex: string) => setValue('input', hex.toUpperCase());

  return {
    methods,
    result,
    error,
    pickerValue,
    onPickColor,
  };
};
