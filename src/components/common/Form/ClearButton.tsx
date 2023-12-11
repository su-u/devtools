import TrashOIcon from '@rsuite/icons/legacy/TrashO';
import React, { useCallback, MouseEventHandler, FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconButton } from 'rsuite';

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
    <IconButton
      icon={<TrashOIcon />}
      placement="right"
      size="xs"
      onClick={onClick ?? onClickInputClear}
    >
      {title}
    </IconButton>
  );
};
