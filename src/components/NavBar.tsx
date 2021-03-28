import React from 'react';
import { Nav, Icon, Navbar as RNavBar } from 'rsuite';
import styles from '../styles/components/Nav.module.scss';

export const NavBar: React.VFC = () => {
  const [activeKey, setActiveKey] = React.useState('Home');

  const onSelect = React.useCallback(
    (activeKey: string) => {
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
        <Nav.Item eventKey="news">News</Nav.Item>
        <Nav.Item eventKey="solutions">Solutions</Nav.Item>
        <Nav.Item eventKey="products">Products</Nav.Item>
        <Nav.Item eventKey="about">About</Nav.Item>
      </Nav>
    </RNavBar>
  );
};
