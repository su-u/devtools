import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

export type DummyForm = {
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
  const methods = useCustomForm<DummyForm>({});
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onClickAdd = useCallback(() => {
    append({ dataType: '' });
  }, [append]);

  const onClickDelete = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  const output = JSON.stringify(methods.watch(), null, `  `);

  return {
    methods,
    fields,
    output,
    onClickAdd,
    onClickDelete,
  };
};
