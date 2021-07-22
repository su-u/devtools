import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nav, Icon, Navbar as RNavBar, Dropdown, Sidenav } from 'rsuite';
import styles from '../styles/components/Nav.module.scss';
import Punycode from '@/components/pages/punycode/Punycode';

type NavItem = {
  key: string;
  title: string;
  path: string;
  icon?: string;
}

type NavGroup = {
  title: string;
  icon?: React.ReactElement;
  key?: string;
  items?: NavItem[];
};

const navList: NavGroup[] = [
  {
    title: 'Text Tools',
    icon: <Icon icon="magic"/>,
    key: '1',
    items: [
      {
        key: 'punycode',
        title: 'Punycode',
        path: '/punycode',
      }
    ]
  }
];

type NavKeys = typeof navList[number]['key'];

export const SideNavBar: React.VFC = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = React.useState<NavKeys>('home');

  const onSelect = React.useCallback(
    (activeKey: NavKeys) => {
      setActiveKey(activeKey);
    },
    [activeKey],
  );

  const itemOnClick = (key: string) => () => {
    router.push(key);
  };

  return (
    <div>
      <Sidenav activeKey={activeKey} onSelect={onSelect} defaultOpenKeys={['1']}>
        <Sidenav.Body>
          <Nav>
            {navList.map((group) => {
              return (
                <Dropdown key={group.key} eventKey={group.key} title={group.title} icon={group.icon}>
                  {group.items?.map((item) => (
                    <Dropdown.Item eventKey={item.key} onSelect={itemOnClick(item.path)}>{item.title}</Dropdown.Item>
                  ))}
                </Dropdown>);
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
