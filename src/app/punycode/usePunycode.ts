import { toASCII, encode } from 'punycode/';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type PunycodeForm = {
  input: string;
};

export const usePunycode = () => {
  const methods = useCustomForm<PunycodeForm>({
    defaultValues: {
      input: '',
    },
  });
  const { watch } = methods;

  const converted_ascii = toASCII(watch('input', ''));
  const converted_punycode = encode(watch('input', ''));

  return {
    methods,
    converted_ascii,
    converted_punycode,
  };
};
