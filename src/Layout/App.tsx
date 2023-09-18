import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { Container, Content } from 'rsuite';
import { SideNavBar } from '@/components/SideNavBar';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({ title = '', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyledContainer>
        <SideNavBar />
        <StyledContent>{children}</StyledContent>
      </StyledContainer>
    </>
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
