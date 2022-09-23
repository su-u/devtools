import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

type characterCountForm = {
  original: string;
  modified: string;
};

export const useDiff = () => {
  const methods = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { watch } = methods;

  const original = watch('original') ?? '';
  const modified = watch('modified') ?? '';

  return {
    methods,
    original,
    modified,
  };
};
