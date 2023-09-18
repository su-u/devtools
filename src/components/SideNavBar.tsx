import React from 'react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { Nav, Sidenav, Sidebar } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import GrowthIcon from '@rsuite/icons/Growth';
import ListOl from '@rsuite/icons/legacy/ListOl';

type NavItemType = {
  key: string;
  title: string;
  path: string;
  icon?: string;
};

type NavGroupType = {
  title: string;
  icon?: React.ReactElement;
  key?: string;
  items?: NavItemType[];
};

const navList: NavGroupType[] = [
  {
    title: 'エンコード',
    icon: <ListOl />,
    key: '1',
    items: [
      {
        key: 'punycode',
        title: 'Punycode',
        path: '/punycode',
      },
      {
        key: 'base64',
        title: 'Base64',
        path: '/base64',
      },
      {
        key: 'urlencode',
        title: 'URL',
        path: '/urlencode',
      },
    ],
  },
  {
    title: 'テキストツール',
    icon: <EditIcon />,
    key: '2',
    items: [
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
        key: 'diff',
        title: 'テキスト差分',
        path: '/diff',
      },
    ],
  },
  {
    title: '数値ツール',
    icon: <ListOl />,
    key: '3',
    items: [
      {
        key: 'number_comma',
        title: '数字カンマ区切り',
        path: '/number_comma',
      },
      {
        key: 'date',
        title: '日付の変換',
        path: '/date',
      },
    ],
  },
  {
    title: '生成ツール',
    icon: <GrowthIcon />,
    key: '4',
    items: [
      {
        key: 'hash',
        title: 'Hash',
        path: '/hash',
      },
      // {
      //   key: 'dummy',
      //   title: 'ダミーデータ',
      //   path: '/dummy',
      // },
      {
        key: 'uuid',
        title: 'UUID生成',
        path: '/uuid',
      },
    ],
  },
];

type NavKeys = (typeof navList)[number]['key'];

export const SideNavBar: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState<NavKeys>(() => 'home');
  const [expanded, setExpanded] = React.useState(true);

  const onSelect = React.useCallback(
    (activeKey: NavKeys) => {
      setActiveKey(activeKey);
    },
    [activeKey, setActiveKey],
  );

  return (
    <StyledSidebar width={expanded ? 220 : 56}>
      <Sidenav expanded={expanded} appearance="subtle" defaultOpenKeys={['1', '2', '3', '4']}>
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
                    <NavItem
                      as={NavLink}
                      key={item.key}
                      eventKey={item.key}
                      href={item.path}
                      expanded={expanded}
                    >
                      {item.title}
                    </NavItem>
                  ))}
                </Nav.Menu>
              );
            })}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
      </Sidenav>
    </StyledSidebar>
  );
};

const NavLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
  const { href, as, expanded, ...rest } = props;
  return <NextLink href={href} as={as} {...rest} />;
});
NavLink.displayName = 'LinkComponent';

const StyledSidebar = styled(Sidebar)`
  font-size: 12px;
  background-color: #1a1d24;
`;

const NavItem = styled(Nav.Item)<{ expanded: boolean }>`
  font-size: 12px;
  padding: ${({ expanded }) => (expanded ? '6px 12px 6px 42px' : '6px 12px 6px 12px')} !important;
`;
