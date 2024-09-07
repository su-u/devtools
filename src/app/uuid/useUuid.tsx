import type { SelectValue } from 'antd/es/select';
import React, { useState, useCallback } from 'react';
import { useToaster, Message } from 'rsuite';
import { generateUUIDs } from '@/app/uuid/uuidLib';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type UuidForm = {
  version: number;
  generateCount: number;
  isUppercase: boolean;
  isHyphen: boolean;
  UUIDName: string;
  UUIDNamespace: string;
};

export const DEFAULT_VALUES: UuidForm = {
  version: 4,
  isUppercase: false,
  isHyphen: true,
  generateCount: 1,
  UUIDName: '',
  UUIDNamespace: '',
};

const selectData: SelectValue = [
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
  const toaster = useToaster();
  const [output, setOutput] = useState('');
  const methods = useCustomForm<UuidForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { control, watch, setValue } = methods;
  useFormPersistence('uuid', methods, (defaultValues) => {
    setValue('version', defaultValues?.version);
    setValue('isUppercase', defaultValues?.isUppercase);
    setValue('isHyphen', defaultValues?.isHyphen);
    setValue('generateCount', defaultValues?.generateCount);
    setValue('UUIDName', defaultValues?.UUIDName);
    setValue('UUIDNamespace', defaultValues?.UUIDNamespace);
  });

  const { version, isUppercase, isHyphen, generateCount, UUIDName, UUIDNamespace } = watch();

  const onClickGenerateUUID = React.useCallback(() => {
    try {
      const uuids = generateUUIDs(version, generateCount, {
        isUppercase,
        isHyphen,
        name: UUIDName,
        namespace: UUIDNamespace,
      }).join('\n');
      setOutput(uuids);
    } catch (e: unknown) {
      if (e instanceof Error) {
        toaster.push(
          <Message showIcon type="error">
            {e.message}
          </Message>,
          {
            placement: 'topEnd',
          },
        );
        return;
      }
      console.error(e);
    }
  }, [version, isUppercase, isHyphen, generateCount, UUIDName, UUIDNamespace, toaster]);

  const onClickClear = useCallback(() => {
    setOutput('');
  }, [setOutput]);

  return {
    methods,
    control,
    selectData,
    onClickGenerateUUID,
    output,
    version,
    onClickClear,
  };
};
