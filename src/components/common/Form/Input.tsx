import styled from '@emotion/styled';
import { Input as AntInput } from 'antd';
import type { InputProps } from 'antd';
import React, { forwardRef } from 'react';

type Props = InputProps & {
  noResize?: string;
};

export const Input = forwardRef<any, Props>(({ noResize = 'vertical', ...field }, ref) => {
  return <StyleInput resize={noResize} ref={ref} {...field} />;
});

const StyleInput = styled(AntInput)<{ resize: string }>`
  resize: ${({ resize }) => resize} !important;
`;
