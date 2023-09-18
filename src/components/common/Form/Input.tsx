import React from 'react';
import styled from '@emotion/styled';
import { Input as RInput, InputProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';

type Props = InputProps & {
  noResize?: string;
};

export const Input: RsRefForwardingComponent<'input', Props> = ({
  noResize = 'vertical',
  ...field
}) => {
  return <StyleInput resize={noResize} {...field} />;
};

const StyleInput = styled(RInput)<{ resize: string }>`
  resize: ${({ resize }) => resize} !important;
`;
