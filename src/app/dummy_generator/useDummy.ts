import { useCallback , useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

export type DummyForm = {
  count: number;
  format: 'csv' | 'tsv' | 'json';
  items: any[];
};

export const COUNT_LIMIT = {
  min: 1,
  max: 1000,
};

export const DEFAULT_VALUES: DummyForm = {
  count: 1,
  format: 'csv',
  items: [],
};

export interface RecordType {
  key: number;
  content: any;
  action: string;
}

export const useDummy = () => {
  const methods = useCustomForm<DummyForm>({
    shouldUnregister: true,
  });
  const { control, getValues } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const [output, setOutput] = useState<string>('');

  const onClickAdd = useCallback(() => {
    append({ dataType: '' });
  }, [append]);

  const onClickClear = useCallback(() => {
    remove();
  }, [remove]);

  const onClickDelete = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  const onClickGenerate = useCallback(() => {
    const values = getValues();
    setOutput(JSON.stringify(values, null, `  `));
  }, [getValues]);

  return {
    methods,
    fields,
    output,
    onClickAdd,
    onClickClear,
    onClickDelete,
    onClickGenerate,
  };
};
