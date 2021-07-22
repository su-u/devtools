import React from 'react';
import { Container, Content, Header, Sidebar } from 'rsuite';
import { NavBar } from '@/components/NavBar';
import styles from '@/styles/Layout/App.module.scss';
import { SideNavBar } from '@/components/SideNavBar';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Container className={styles.container}>
      <Header>
        <NavBar/>
      </Header>
      <Container>
        <Sidebar className={styles.sidebar}><SideNavBar/></Sidebar>
        <Content>{children}</Content>
      </Container>
    </Container>
  );
};
