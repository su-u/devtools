import styled from '@emotion/styled';
import GithubIcon from '@rsuite/icons/legacy/Github';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import { Nav, Sidenav, Sidebar, Navbar, Whisper, Tooltip } from 'rsuite';
import { features } from '@/components/common/Features';

const GITHUB_LINK = 'https://github.com/su-u/devtools';

export const SideNavBar: FC = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(true);

  const activeKey = React.useMemo(() => {
    const matched = features
      .flatMap((group) => group.items ?? [])
      .find((item) => item.path === pathname);
    return matched?.key ?? 'home';
  }, [pathname]);

  return (
    <StyledSidebar width={expanded ? 220 : 56}>
      <Sidenav expanded={expanded} appearance="subtle" defaultOpenKeys={['1', '2', '3', '4', '5']}>
        <Sidenav.Body>
          <Nav activeKey={activeKey}>
            {features.map((group) => {
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
                      {item.shortTitle || item.title}
                    </NavItem>
                  ))}
                </Nav.Menu>
              );
            })}
          </Nav>
        </Sidenav.Body>
        <Navbar appearance="subtle">
          <Nav>
            <Nav.Item as={NavLink} href={GITHUB_LINK} target="_blank">
              <Whisper
                placement="right"
                controlId="control-id-sidenav-github"
                trigger="hover"
                speaker={<Tooltip>GitHub</Tooltip>}
              >
                <GithubIcon style={{ fontSize: 24 }} />
              </Whisper>
            </Nav.Item>
          </Nav>
          <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
        </Navbar>
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
`;

const NavItem = styled(Nav.Item)<{ expanded: boolean }>`
  font-size: 12px;
  padding: ${({ expanded }) => (expanded ? '6px 12px 6px 42px' : '6px 12px 6px 12px')} !important;
`;
