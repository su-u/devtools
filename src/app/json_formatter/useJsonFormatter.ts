import { useState } from 'react';
import { format } from '@/app/json_formatter/jsonFormatterLib';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type JsonFormatForm = {
  input: string;
  output: string;
  indentSpace: number;
};

const DEFAULT_VALUES: JsonFormatForm = {
  input: '',
  output: '',
  indentSpace: 4,
};

export const useJsonFormatter = () => {
  const methods = useCustomForm<JsonFormatForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { watch } = methods;

  const input = watch('input', DEFAULT_VALUES.input);
  const output = format(input, watch('indentSpace'));

  return {
    DEFAULT_VALUES,
    methods,
    output,
  };
};
