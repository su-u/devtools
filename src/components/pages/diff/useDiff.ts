import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

type characterCountForm = {
  original: string;
  modified: string;
};

export const useDiff = () => {
  const { watch, setValue, reset } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const original = watch('original') ?? '';
  const modified = watch('modified') ?? '';

  const onChange = useCallback(
    (name: keyof characterCountForm) => (value: string) => {
      setValue(name, value);
    },
    [setValue],
  );

  const onClickInputClear = useCallback(
    (name: keyof characterCountForm) => () => {
      reset({
        [name]: '',
      });
    },
    [reset],
  );

  return {
    onChange,
    original,
    modified,
    onClickInputClear,
  };
};
