import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import React, { useCallback, MouseEventHandler, FC } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  title?: string;
  onClick?: MouseEventHandler;
};

export const ClearButton: FC<Props> = ({ name, title = 'クリア', onClick = null }) => {
  const { resetField, watch, setValue } = useFormContext();

  const onClickInputClear = useCallback(() => {
    resetField(name);
  }, [resetField, name]);

  return (
    <Tooltip title="削除">
      <Button icon={<DeleteOutlined />} danger size="small" onClick={onClick ?? onClickInputClear}>
        {title}
      </Button>
    </Tooltip>
  );
};
