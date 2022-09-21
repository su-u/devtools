import React from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
};

export const PageTitle: React.VFC<Props> = ({ title }) => {
  return <H2>{title}</H2>;
};

const H2 = styled.h2`
  margin: 10px 5px;
  line-height: 24px;
  font-size: 20px;
`;
