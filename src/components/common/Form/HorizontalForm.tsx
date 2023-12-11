import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Form } from 'rsuite';

type Props = {
  children: React.ReactNode;
};

export const HorizontalForm: FC<Props> = ({ children }) => {
  return <StyledForm layout="horizontal">{children}</StyledForm>;
};

const StyledForm = styled(Form)`
  > div:not(:last-child) {
    margin-bottom: 12px !important;
  }
`;
