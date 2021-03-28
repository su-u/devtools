import React from 'react';
import { Container, Content, Header } from 'rsuite';
import { NavBar } from '@/components/NavBar';
import styles from '@/styles/Layout/App.module.scss';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Container className={styles.container}>
      <Header>
        <NavBar />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};
