import { GithubOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout, Menu, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import { features } from '@/components/common/Features';

const GITHUB_LINK = 'https://github.com/su-u/devtools';

export const SideNavBar: FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const activeKey = React.useMemo(() => {
    const matched = features
      .flatMap((group) => group.items ?? [])
      .find((item) => item.path === pathname);
    return matched?.key ?? 'home';
  }, [pathname]);

  const items: MenuProps['items'] = features.map((group) => ({
    key: group.key as string,
    label: group.title,
    icon: group.icon,
    children: group.items?.map((item) => ({
      key: item.key,
      label: <NextLink href={item.path}>{item.shortTitle || item.title}</NextLink>,
    })),
  }));

  const defaultOpenKeys = features
    .map((group) => group.key)
    .filter((key): key is string => Boolean(key));

  return (
    <StyledSider
      width={200}
      collapsedWidth={56}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="md"
      theme="dark"
    >
      <SiderInner>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[activeKey]}
          defaultOpenKeys={collapsed ? [] : defaultOpenKeys}
          items={items}
          style={{ background: 'transparent', borderInlineEnd: 'none', fontSize: 12 }}
        />
        <Footer>
          <Tooltip title="GitHub" placement="right">
            <NextLink href={GITHUB_LINK} target="_blank">
              <GithubOutlined style={{ fontSize: 24, color: '#fff' }} />
            </NextLink>
          </Tooltip>
        </Footer>
      </SiderInner>
    </StyledSider>
  );
};

const StyledSider = styled(Layout.Sider)`
  background-color: #181818 !important;
  height: 100vh;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub {
    background: transparent;
  }
`;

const SiderInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* Sider 下部のデフォルト折りたたみトリガー(高さ48px)と重ならないように余白を確保 */
  padding-bottom: 48px;
  overflow-y: auto;
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 12px 16px;
`;
