import React from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  right?: React.ReactNode;
};

export const PanelHeader: React.VFC<Props> = ({ title, right = null }) => {
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
