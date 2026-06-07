import { useEffect, useState } from 'react';
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

  // アルゴリズムごとのハッシュ値。crypto（ブラウザでは重い polyfill）は
  // 初期バンドルから外し、入力があったときに動的 import して計算する。
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (input.trim() === '') {
      setHashes({});
      return;
    }
    let canceled = false;
    void import('crypto').then(({ createHash }) => {
      if (canceled) return;
      const next: Record<string, string> = {};
      for (const { value } of HASH_ALGORITHMS) {
        const hash = createHash(value).update(input).digest('hex');
        next[value] = isUppercase ? hash.toUpperCase() : hash;
      }
      setHashes(next);
    });
    return () => {
      canceled = true;
    };
  }, [input, isUppercase]);

  return {
    methods,
    input,
    algorithmList: HASH_ALGORITHMS,
    hashes,
  };
};
