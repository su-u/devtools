import React, { useState } from 'react';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { generateUUIDs } from '@/components/pages/uuid/uuidLib';

type UuidForm = {
  version: number;
  generateCount: number;
  isUppercase: boolean;
  isHyphen: boolean;
};

const DEFAULT_VALUES = {
  version: 4,
  isUppercase: false,
  isHyphen: true,
  generateCount: 1,
}

const selectData: ItemDataType<number>[] = [
  {
    label: 'Version 1',
    value: 1,
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
  const [output, setOutput] = useState('');
  const methods = useCustomForm<UuidForm>({
    defaultValues: {
      version: DEFAULT_VALUES.version,
      isUppercase: DEFAULT_VALUES.isUppercase,
      isHyphen: DEFAULT_VALUES.isHyphen,
      generateCount: DEFAULT_VALUES.generateCount,
    }
  });
  const { control, watch } = methods;

  const { version, isUppercase, isHyphen, generateCount } = watch();

  const onClickGenerateUUID = React.useCallback(() => {
    const uuids = generateUUIDs(version, generateCount, { isUppercase, isHyphen }).join('\n');
    setOutput(uuids);
  }, [version, isUppercase, isHyphen, generateCount]);

  return {
    methods,
    control,
    selectData,
    onClickGenerateUUID,
    output,
    DEFAULT_VALUES,
  };
};
