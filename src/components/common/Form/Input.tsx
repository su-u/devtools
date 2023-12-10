import styled from '@emotion/styled';
import React from 'react';
import { Input as RInput } from 'rsuite';
import type { InputProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';

type Props = InputProps & {
  noResize?: string;
};

export const Input  = React.forwardRef<RsRefForwardingComponent<'input', Props>, Props>(({
  noResize = 'vertical',
  ...field
}, ref) => {
  return <StyleInput ref={ref} resize={noResize} {...field} />;
});
Input.displayName = 'Input';

const StyleInput = styled(RInput)<{ resize: string }>`
  resize: ${({ resize }) => resize} !important;
`;
