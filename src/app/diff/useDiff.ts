import React from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type DiffForm = {
  original: string;
  modified: string;
};

const DEFAULT_VALUES: DiffForm = {
  original: '',
  modified: '',
};

export const useDiff = () => {
  const methods = useCustomForm<DiffForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch, resetField, setValue } = methods;
  useFormPersistence('diff', methods, (defaultValues) => {
    setValue('original', defaultValues?.original);
    setValue('modified', defaultValues?.modified);
  });

  const original = watch('original', DEFAULT_VALUES.original);
  const modified = watch('modified', DEFAULT_VALUES.modified);

  const onClickOriginalReset = React.useCallback(() => {
    resetField('original');
  }, [resetField]);

  return {
    methods,
    original,
    modified,
    onClickOriginalReset,
  };
};
