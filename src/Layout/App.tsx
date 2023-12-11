'use client';
import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Content } from 'rsuite';
import { Provider } from '@/app/Provider';
import { SideNavBar } from '@/components/SideNavBar';

type Props = {
  children?: React.ReactNode;
};

export const AppLayout: FC<Props> = ({ children }) => {
  return (
    <Provider>
      <StyledContainer>
        <SideNavBar />
        <StyledContent>{children}</StyledContent>
      </StyledContainer>
    </Provider>
  );
};

const StyledContainer = styled(Container)`
  background-color: #36393f;
  color: white;
  height: 100vh;

  // 本来rsuite.cssで反映されるスタイルだが、チラつき防止のため指定する
  flex-direction: row;
`;

const StyledContent = styled(Content)`
  padding-bottom: 20px;
`;
