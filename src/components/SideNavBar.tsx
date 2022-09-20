import React from 'react';
import NextLink from 'next/link';
import { Nav, Sidenav, Sidebar } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import ListOl from '@rsuite/icons/legacy/ListOl';
import styles from '@/styles/Layout/App.module.scss';

type NavItem = {
  key: string;
  title: string;
  path: string;
  icon?: string;
};

type NavGroup = {
  title: string;
  icon?: React.ReactElement;
  key?: string;
  items?: NavItem[];
};

const navList: NavGroup[] = [
  {
    title: 'テキストツール',
    icon: <EditIcon />,
    key: '1',
    items: [
      {
        key: 'punycode',
        title: 'Punycode変換',
        path: '/punycode',
      },
      {
        key: 'character_count',
        title: '文字数カウント',
        path: '/character_count',
      },
      {
        key: 'character_replace',
        title: '文字列置換',
        path: '/character_replace',
      },
      {
        key: 'base64',
        title: 'Base64エンコード',
        path: '/base64',
      },
      {
        key: 'diff',
        title: 'テキスト差分',
        path: '/diff',
      },
    ],
  },
  {
    title: '数値ツール',
    icon: <ListOl />,
    key: '2',
    items: [
      {
        key: 'number_comma',
        title: '数字カンマ区切り',
        path: '/number_comma',
      },
    ],
  },
];

type NavKeys = typeof navList[number]['key'];

export const SideNavBar: React.VFC = () => {
  const [activeKey, setActiveKey] = React.useState<NavKeys>(() => 'home');
  const [expanded, setExpanded] = React.useState(false);

  const onSelect = React.useCallback(
    (activeKey: NavKeys) => {
      setActiveKey(activeKey);
    },
    [activeKey, setActiveKey],
  );

  return (
    <Sidebar width={expanded ? 260 : 56} className={styles.sidebar}>
      <Sidenav expanded={expanded} defaultOpenKeys={['1', '2']}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={onSelect}>
            {navList.map((group) => {
              return (
                <Nav.Menu
                  key={group.key}
                  eventKey={group.key}
                  title={group.title}
                  icon={group.icon}
                >
                  {group.items?.map((item) => (
                    <Nav.Item as={NavLink} key={item.key} eventKey={item.key} href={item.path}>
                      {item.title}
                    </Nav.Item>
                  ))}
                </Nav.Menu>
              );
            })}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
      </Sidenav>
    </Sidebar>
  );
};

const NavLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...rest} />
    </NextLink>
  );
});
NavLink.displayName = 'LinkComponent';
