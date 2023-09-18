import { ItemDataType } from 'rsuite/esm/@types/common';
import { useCustomForm } from '@/components/common/Form/useCustomForm';

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
  const methods = useCustomForm<UuidForm>();
  const { control } = methods;

  return {
    methods,
    control,
    selectData,
  };
};
