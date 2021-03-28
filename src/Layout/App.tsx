import React from 'react';
import { Container, Content, Header } from 'rsuite';
import { NavBar } from '@/components/NavBar';
import 'rsuite/dist/styles/rsuite-default.min.css';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header>
        <NavBar />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};
