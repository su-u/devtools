import { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

// フォームの情報をlocalStorageに保存して永続化する
export const useFormPersistence = <T>(
  featureName: string,
  methods: UseFormReturn<T>,
  setCallback: (localValues: T) => void,
) => {
  const name = `devtools.formData.${featureName}`;
  const {
    watch,
    formState: { isDirty, defaultValues },
  } = methods;
  const formData = watch();
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(name);
      const localValues = raw ? JSON.parse(raw) : null;
      if (!isDirty && isDefault) {
        // 保存データを defaultValues にマージして復元する。
        // JSON.stringify は undefined のフィールドを削除するため、過去に壊れた保存データには
        // 一部キーが欠けていることがある。素朴に setCallback(localValues) すると欠損キーが
        // undefined で上書きされ defaultValues が失われる（例: UUID の generateCount が
        // undefined になり「生成数が不正です」になる）。欠損キーは初期値で補完する。
        if (localValues && typeof localValues === 'object') {
          const defined = Object.fromEntries(
            Object.entries(localValues).filter(([, v]) => v !== undefined && v !== null),
          );
          setCallback({ ...defaultValues, ...defined } as T);
        }
        // console.log('get', { name, defaultValues });
        setIsDefault(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDirty, isDefault]);

  useEffect(() => {
    // console.log('set1', { name, isDirty, isDefault, formData });
    if (isDirty || (!isDirty && !isDefault)) {
      localStorage.setItem(name, JSON.stringify(formData));
      // console.log('set2', { name, isDirty, isDefault, formData });
    }
  }, [formData, isDirty, isDefault]);
};
