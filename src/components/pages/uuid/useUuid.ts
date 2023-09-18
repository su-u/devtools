import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { createHash as cryptoCreateHash } from 'crypto';
import { HASH_ALGORITHMS } from '@/lib/hashAlgorithms';
import { ItemDataType } from 'rsuite/esm/@types/common';

type UuidForm = {
  version: number;
  isUppercase: boolean;
  isHyphen: boolean;
  generateCount: number;
};

const selectData: ItemDataType<number>[] = [
  {
    label: 'Version 1',
    value: 1,
  },
  {
    label: 'Version 2',
    value: 2,
  },
  {
    label: 'Version 3',
    value: 3,
  },
  {
    label: 'Version 4',
    value: 4,
  },
  {
    label: 'Version 5',
    value: 5,
  },
];

export const useUuid = () => {
  const methods = useForm<UuidForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { watch, control } = methods;

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
    control,
    selectData,
  };
};
