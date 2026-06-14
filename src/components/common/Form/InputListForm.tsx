import styled from '@emotion/styled';
import React, { FC } from 'react';

type Props = {
  layout?: string;
  children?: React.ReactNode;
};

export const InputListForm: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  > div:not(:last-child) {
    margin-bottom: 12px;
  }
`;
