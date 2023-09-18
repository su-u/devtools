import { useEffect, useState } from 'react';
import conv from 'iconv-urlencode';
import { ENCODING_LIST } from '@/lib/encoding';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type UrlEncodeForm = {
  input: string;
  encode: string;
  encoding: string;
};

export const useUrlEncode = () => {
  const methods = useCustomForm<UrlEncodeForm>();
  const { watch } = methods;

  const [output, setOutput] = useState('');
  const input = watch('input', '');
  const encoding = watch('encoding', '');

  useEffect(() => {
    setOutput(conv.encode(input.trim(), encoding));
  }, [input, encoding]);

  return {
    methods,
    output,
    encodingList: ENCODING_LIST,
  };
};
