import { toASCII, encode } from 'punycode/';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type PunycodeForm = {
  input: string;
};

export const usePunycode = () => {
  const methods = useCustomForm<PunycodeForm>({
    defaultValues: {
      input: '',
    },
  });
  const { watch, setValue } = methods;
  useFormPersistence('punycode', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
  });

  const converted_ascii = toASCII(watch('input', ''));
  const converted_punycode = encode(watch('input', ''));

  return {
    methods,
    converted_ascii,
    converted_punycode,
  };
};
