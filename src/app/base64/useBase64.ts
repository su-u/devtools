import { useEffect, useState } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type Base64Form = {
  input: string;
};

export const useBase64 = () => {
  const methods = useCustomForm<Base64Form>({
    defaultValues: {
      input: '',
    },
  });
  const { watch } = methods;
  const [output, setOutput] = useState('');
  const input = watch('input', '');

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
    methods,
    output,
  };
};