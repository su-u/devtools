import { useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form/dist/types';

export const useCustomForm = <T>(options: UseFormProps<T> = {}) => {
  return useForm<T>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
    ...options,
  });
};
