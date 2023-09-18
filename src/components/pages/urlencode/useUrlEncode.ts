import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import conv from 'iconv-urlencode';
import { ENCODING_LIST } from '@/lib/encoding';

type Base64Form = {
  input: string;
  encode: string;
  encoding: string;
};

export const useUrlEncode = () => {
  const methods = useForm<Base64Form>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { watch } = methods;

  const [output, setOutput] = useState('');
  const input = watch('input') ?? '';
  const encoding = watch('encoding') ?? '';

  useEffect(() => {
    setOutput(conv.encode(input.trim(), encoding));
  }, [input, encoding]);

  return {
    methods,
    output,
    encodingList: ENCODING_LIST,
  };
};
