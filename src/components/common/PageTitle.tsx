import React from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
};

export const PageTitle: React.VFC<Props> = ({ title }) => {
  return <H2>{title}</H2>;
};

const H2 = styled.h2`
  text-align: center;
  margin: 10px;
`