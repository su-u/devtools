import React from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type DiffForm = {
  original: string;
  modified: string;
};

export const useDiff = () => {
  const methods = useCustomForm<DiffForm>({
    defaultValues: {
      original: '',
      modified: '',
    },
  });
  const { watch, resetField, setValue } = methods;

  const original = watch('original', '');
  const modified = watch('modified', '');

  const onClickOriginalReset = React.useCallback(() => {
    resetField('original');
    // console.log('original', watch('original'));
    // setValue('original', '');
  }, [resetField]);

  return {
    methods,
    original,
    modified,
    onClickOriginalReset,
  };
};
