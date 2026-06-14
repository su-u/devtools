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
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 24px;
`;
