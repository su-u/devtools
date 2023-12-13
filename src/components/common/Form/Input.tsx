import styled from '@emotion/styled';
import { Input as AntInput } from 'antd';
import type { InputProps } from 'antd';
import React, { FC } from 'react';

type Props = InputProps & {
  noResize?: string;
};

export const Input: FC<Props> = ({ noResize = 'vertical', ...field }) => {
  return <StyleInput resize={noResize} {...field} />;
};

const StyleInput = styled(AntInput)<{ resize: string }>`
  resize: ${({ resize }) => resize} !important;
`;
