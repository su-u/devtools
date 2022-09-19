import React from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  right: React.ReactNode;
};

export const PanelHeader: React.VFC<Props> = ({ title, right }) => {
  return (
    <Header>
      <div>{title}</div>
      <div>{right}</div>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
