import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

type DummyForm = {
  count: number;
  format: 'csv' | 'tsv' | 'json';
  items: any;
};

export interface RecordType {
  key: number;
  content: any;
  action: string;
}

export const useDummy = () => {
  const methods = useCustomForm<DummyForm>();
  const { control } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: 'items',
  });

  const onClickAdd = useCallback(() => {
    append({ dataType: '' });
  }, [append]);

  console.log(methods.watch());

  return {
    methods,
    fields,
    onClickAdd,
  };
};
