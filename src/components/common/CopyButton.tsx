import React, { FC } from 'react';
import { IconButton } from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import { useCopy } from '@/hooks/useCopy';

type Props = {
  copyText: string;
};

export const CopyButton: FC<Props> = ({ copyText }) => {
  const { copy } = useCopy();

  return (
    <IconButton
      icon={<CopyIcon />}
      placement="right"
      size="xs"
      onClick={copy(copyText)}
    ></IconButton>
  );
};
