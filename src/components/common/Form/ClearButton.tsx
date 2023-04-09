import React, { useCallback, MouseEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconButton } from 'rsuite';
import TrashOIcon from '@rsuite/icons/legacy/TrashO';

type Props = {
  name: string;
  title?: string;
  onClick?: MouseEventHandler;
};

export const ClearButton: React.FC<Props> = ({ name, title = 'クリア', onClick = null }) => {
  const { resetField } = useFormContext();

  const onClickInputClear = useCallback(() => {
    resetField(name);
  }, [resetField]);

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
