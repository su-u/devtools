import React from 'react';
import Head from 'next/head';
import { Container, Content } from 'rsuite';
import { SideNavBar } from '@/components/SideNavBar';
import styled from '@emotion/styled';

type Props = {
  title?: string;
};

export const AppLayout: React.FC<Props> = ({ title = '', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyledContainer>
        <Container>
          <SideNavBar />
          <StyledContent>{children}</StyledContent>
        </Container>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  background-color: #36393f;
  color: white;
  height: 100vh;
`;

const StyledContent = styled(Content)`
  padding-bottom: 20px;
`;
