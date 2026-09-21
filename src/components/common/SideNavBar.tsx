import { GithubOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
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
      trigger={null}
      theme="dark"
      // 背景色は inline で固定（クラスのスタイルが当たる前の初回描画から効かせる）
      style={{ background: '#181818' }}
    >
      <MenuArea aria-label="ツール一覧">
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[activeKey]}
          defaultOpenKeys={collapsed ? [] : defaultOpenKeys}
          items={items}
          style={{ background: 'transparent', borderInlineEnd: 'none', fontSize: 12 }}
        />
      </MenuArea>
      <BottomBar collapsed={collapsed}>
        {!collapsed && (
          <Tooltip title="GitHub" placement="right">
            <NextLink href={GITHUB_LINK} target="_blank" aria-label="GitHub">
              <GithubOutlined style={{ fontSize: 22, color: '#fff' }} />
            </NextLink>
          </Tooltip>
        )}
        <ToggleButton
          type="button"
          aria-label={collapsed ? 'サイドバーを開く' : 'サイドバーを閉じる'}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </ToggleButton>
      </BottomBar>
    </StyledSider>
  );
};

const StyledSider = styled(Layout.Sider)`
  background-color: #181818 !important;
  height: 100vh;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub {
    background: transparent;
  }
`;

// メニュー領域は伸縮＋スクロール、下部バーは常に最下部に固定
const MenuArea = styled.nav`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
`;

const BottomBar = styled.div<{ collapsed: boolean }>`
  flex-shrink: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'space-between')};
  gap: 8px;
  padding: 0 16px;
  border-top: 1px solid #2b2d31;
`;

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
