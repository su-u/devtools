import styled from '@emotion/styled';
import React, { FC } from 'react';

type Props = {
  title: string;
  right?: React.ReactNode;
};

export const PanelHeader: FC<Props> = ({ title, right = null }) => {
  return (
    <Header>
      <Title>{title}</Title>
      <div>{right}</div>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 14px;
  line-height: 24px;
`;
