import conv from 'iconv-urlencode';
import { useEffect, useState } from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { ENCODING_LIST } from '@/lib/encoding';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type UrlEncodeForm = {
  input: string;
  encode: string;
  encoding: string;
};

export const useUrlEncode = () => {
  const methods = useCustomForm<UrlEncodeForm>({
    defaultValues: {
      input: '',
      encode: '',
      encoding: ENCODING_LIST[0].options[0].value,
    },
  });
  const { watch, setValue } = methods;
  useFormPersistence('urlencode', methods, (defaultValues) => {
    setValue('input', defaultValues?.input);
    setValue('encode', defaultValues?.encode);
    setValue('encoding', defaultValues?.encoding);
  });

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
