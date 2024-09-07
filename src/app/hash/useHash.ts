import { createHash as cryptoCreateHash } from 'crypto';
import { useCallback } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { HASH_ALGORITHMS } from '@/lib/hashAlgorithms';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type Base64Form = {
  input: string;
  isUppercase: boolean;
};

const DEFAULT_VALUES: Base64Form = {
  input: '',
  isUppercase: false,
};

export const useHash = () => {
  const methods = useCustomForm<Base64Form>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, setValue } = methods;
  useFormPersistence('hash', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
    setValue('isUppercase', defaultValues?.isUppercase);
  });

  const input = watch('input', DEFAULT_VALUES.input);
  const isUppercase = watch('isUppercase', DEFAULT_VALUES.isUppercase);

  const createHash = useCallback(
    (algorithm: string, input: string) => {
      if (input.trim() === '') return '';

      const hash = cryptoCreateHash(algorithm).update(input).digest('hex');

      if (isUppercase) {
        return hash.toUpperCase();
      }
      return hash;
    },
    [isUppercase],
  );

  return {
    methods,
    input,
    algorithmList: HASH_ALGORITHMS,
    createHash,
  };
};
