import React, { FC } from 'react';
import { IconButton } from 'rsuite';
import MinusIcon from '@rsuite/icons/legacy/Minus';
import { IconButtonProps } from 'rsuite/esm/IconButton/IconButton';

export const DeleteButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton icon={<MinusIcon />} placement="right" size="xs" {...props}>
      削除
    </IconButton>
  );
};
