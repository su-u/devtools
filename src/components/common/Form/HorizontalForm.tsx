import styled from '@emotion/styled';
import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const HorizontalForm: FC<Props> = ({ children }) => {
  return <StyledForm>{children}</StyledForm>;
};

const StyledForm = styled.div`
  width: 100%;
  > div:not(:last-child) {
    margin-bottom: 12px;
  }
`;
