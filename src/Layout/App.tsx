import React from 'react';
import Head from 'next/head';
import { Container, Content, Header, Sidebar } from 'rsuite';
import { NavBar } from '@/components/NavBar';
import styles from '@/styles/Layout/App.module.scss';
import { SideNavBar } from '@/components/SideNavBar';

type Props = {
  title?: string;
}

export const AppLayout: React.FC<Props> = ({ title = '', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container className={styles.container}>
        {/*<Header>*/}
        {/*  <NavBar/>*/}
        {/*</Header>*/}
        <Container>
          <Sidebar className={styles.sidebar}><SideNavBar/></Sidebar>
          <Content>{children}</Content>
        </Container>
      </Container>
    </>
  );
};
