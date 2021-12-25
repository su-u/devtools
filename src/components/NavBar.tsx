import React from 'react';
import { Nav, Icon, Navbar as RNavBar } from 'rsuite';
import styles from '../styles/components/Nav.module.scss';

const NavList = [
  {
    key: 'home',
    title: 'Home',
    icon: 'home',
  },
  {
    key: 'text',
    title: 'Text',
  },
  {
    key: 'solutions',
    title: 'Solutions',
  },
  {
    key: 'products',
    title: 'Products',
  },
  {
    key: 'about',
    title: 'About',
  },
] as const;

type NavKeys = typeof NavList[number]['key'];

export const NavBar: React.VFC = () => {
  const [activeKey, setActiveKey] = React.useState<NavKeys>('home');

  const onSelect = React.useCallback(
    (activeKey: NavKeys) => {
      setActiveKey(activeKey);
    },
    [activeKey],
  );

  return (
    <RNavBar className={styles.navbar}>
      <Nav activeKey={activeKey} onSelect={onSelect}>
        <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="text">Text</Nav.Item>
        <Nav.Item eventKey="solutions">Solutions</Nav.Item>
        <Nav.Item eventKey="products">Products</Nav.Item>
        <Nav.Item eventKey="about">About</Nav.Item>
      </Nav>
    </RNavBar>
  );
};
