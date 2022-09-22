import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import conv from 'iconv-urlencode';
import { ENCODING_LIST } from '@/lib/encoding';

type Base64Form = {
  decode: string;
  encode: string;
  encoding: string;
};

export const useUrlEncode = () => {
  const { control, watch } = useForm<Base64Form>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const [output, setOutput] = useState('');
  const decode = watch('decode') ?? '';
  const encoding = watch('encoding') ?? '';

  useEffect(() => {
    setOutput(conv.encode(decode.trim(), encoding));
  }, [decode, encoding]);

  return {
    control,
    output,
    encodingList: ENCODING_LIST,
  };
};
