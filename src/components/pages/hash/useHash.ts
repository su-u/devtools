import { useForm } from 'react-hook-form';
import { createHash as cryptoCreateHash } from 'crypto';
import { useCallback } from 'react';
import { HASH_ALGORITHMS } from '@/lib/hashAlgorithms';

type Base64Form = {
  input: string;
  isUppercase: boolean;
};

export const useHash = () => {
  const methods = useForm<Base64Form>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { watch } = methods;

  const input = watch('input') ?? '';
  const isUppercase = watch('isUppercase') ?? false;

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
