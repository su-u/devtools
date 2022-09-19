import React from 'react';
import NextLink from 'next/link';
import { Nav, Icon, Dropdown, Sidenav } from 'rsuite';

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
    icon: <Icon icon="magic" />,
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
    ],
  },
  {
    title: '数値ツール',
    icon: <Icon icon="magic" />,
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

  const onSelect = React.useCallback(
    (activeKey: NavKeys) => {
      setActiveKey(activeKey);
    },
    [activeKey, setActiveKey],
  );

  return (
    <div>
      <Sidenav activeKey={activeKey} onSelect={onSelect} defaultOpenKeys={['1', '2']}>
        <Sidenav.Body>
          <Nav>
            {navList.map((group) => {
              return (
                <Dropdown
                  key={group.key}
                  eventKey={group.key}
                  title={group.title}
                  icon={group.icon}
                >
                  {group.items?.map((item) => (
                    <Link key={item.key} eventKey={item.key} href={item.path}>
                      {item.title}
                    </Link>
                  ))}
                </Dropdown>
              );
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

const LinkComponent = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...rest} />
    </NextLink>
  );
});
LinkComponent.displayName = 'LinkComponent';

const Link: React.VFC<any> = (props) => <Dropdown.Item componentClass={LinkComponent} {...props} />;
