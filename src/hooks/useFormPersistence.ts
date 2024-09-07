import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';

// フォームの情報をlocalStorageに保存して永続化する
export const useFormPersistence = <T>(
  name: string,
  methods: UseFormReturn<T>,
  setCallback: (defaultValues: T) => void,
) => {
  const {
    watch,
    formState: { isDirty },
  } = methods;
  const formData = watch();

  useEffect(() => {
    const defaultValues = JSON.parse(localStorage.getItem(name));
    if (!isDirty) {
      setCallback(defaultValues);
    }
  }, [isDirty]);

  useEffect(() => {
    if (isDirty) {
      localStorage.setItem(name, JSON.stringify(formData));
      console.log('set', isDirty, formData);
    }
  }, [formData, isDirty]);
};
