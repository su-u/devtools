import React, { FC } from 'react';
import { IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import { IconButtonProps } from 'rsuite/esm/IconButton/IconButton';

export const AddButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton icon={<PlusIcon />} placement="right" size="xs" {...props}>
      追加
    </IconButton>
  );
};
