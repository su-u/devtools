import { useForm } from 'react-hook-form';
import { ItemDataType } from 'rsuite/esm/@types/common';

type UuidForm = {
  version: number;
  isUppercase: boolean;
  isHyphen: boolean;
  generateCount: number;
};

const selectData: ItemDataType<number>[] = [
  {
    label: 'Version 1',
    value: 1,
  },
  {
    label: 'Version 2',
    value: 2,
  },
  {
    label: 'Version 3',
    value: 3,
  },
  {
    label: 'Version 4',
    value: 4,
  },
  {
    label: 'Version 5',
    value: 5,
  },
];

export const useUuid = () => {
  const methods = useForm<UuidForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { control } = methods;


  return {
    methods,
    control,
    selectData,
  };
};
