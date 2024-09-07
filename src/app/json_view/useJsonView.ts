import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type JsonFormatForm = {
  input: string;
};

const DEFAULT_VALUES: JsonFormatForm = {
  input: '',
};

export const useJsonView = () => {
  const methods = useCustomForm<JsonFormatForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  useFormPersistence('json_view', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
  });

  const input = toJson(watch('input', DEFAULT_VALUES.input));

  return {
    DEFAULT_VALUES,
    methods,
    input,
  };
};

const toJson = (input: string): object => {
  try {
    return JSON.parse(input);
  } catch {
    return {};
  }
};
