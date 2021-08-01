import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Base64Form = {
  input: string;
}

export const useBase64 = () => {
  const { control, watch } = useForm<Base64Form>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const [output, setOutput] = useState('');
  const input = watch('input') ?? '';

  useEffect(() => {
    if (typeof window === 'undefined' || input.trim() === '') {
      setOutput('');
      return;
    }

    const r = new window.FileReader();
    const blob = new Blob([input]);
    r.onload = function () {
      // console.info(r.result.substr(r.result.indexOf(',')+1));
      setOutput((r.result as string).replace(/data:.*\/.*;base64,/, ''));
    };
    r.readAsDataURL(blob);
  }, [input]);

  return {
    control,
    output,
  };
};