import styled from '@emotion/styled';
import {
  Row as AntRow,
  Col as AntCol,
  Card,
  Form as AntForm,
  Button as AntButton,
  Space,
} from 'antd';
import type { RowProps, ColProps, CardProps, ButtonProps } from 'antd';
import React, { FC } from 'react';

// rsuite からの移行用 antd 互換レイアウト部品。
// 各ページの JSX 構造・props をほぼ変えずに rsuite を置き換えるための薄いラッパー。

// rsuite <Grid fluid> 相当（横幅100%のコンテナ）
export const Grid: FC<{ fluid?: boolean; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => <div style={{ width: '100%', ...style }}>{children}</div>;

// Row/Col は antd と rsuite で API がほぼ同じ（gutter, xs/sm/md/lg/xl）
export const Row: FC<RowProps> = (props) => <AntRow {...props} />;
export const Col: FC<ColProps> = (props) => <AntCol {...props} />;

// rsuite <Panel bordered header={...}> 相当 → antd Card
type PanelProps = {
  bordered?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  // rsuite 固有のプロップ（受け取って無視する）
  collapsible?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  shaded?: boolean;
  eventKey?: string | number;
} & Omit<CardProps, 'title' | 'bordered'>;

export const Panel: FC<PanelProps> = ({
  header,
  bordered,
  collapsible,
  expanded,
  defaultExpanded,
  shaded,
  eventKey,
  children,
  ...rest
}) => (
  <Card bordered size="small" title={header} {...rest}>
    {children}
  </Card>
);

// rsuite <PanelGroup bordered> 相当 → Panel(Card) を縦に並べるコンテナ
export const PanelGroup: FC<{ bordered?: boolean; children?: React.ReactNode }> = ({ children }) => (
  <PanelGroupWrapper>{children}</PanelGroupWrapper>
);

const PanelGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// rsuite <Form fluid layout="horizontal"> 相当（子要素間に余白を付けるだけのコンテナ）
type FormType = FC<{
  fluid?: boolean;
  layout?: string;
  autoComplete?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> & {
  Group: FC<{ className?: string; children?: React.ReactNode }>;
  ControlLabel: ReturnType<typeof styled.label>;
};

export const Form: FormType = ({ className, style, children }) => (
  <FormWrapper className={className} style={style}>
    {children}
  </FormWrapper>
);
Form.Group = ({ className, children }) => <div className={className}>{children}</div>;
Form.ControlLabel = styled.label`
  display: inline-block;
  font-size: 14px;
`;

const FormWrapper = styled.div`
  width: 100%;
  > div:not(:last-child) {
    margin-bottom: 12px;
  }
`;

// rsuite <ButtonToolbar> 相当
export const ButtonToolbar: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Space>{children}</Space>
);

// rsuite <InputGroup> 相当
export const InputGroup: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Space.Compact block>{children}</Space.Compact>
);

// rsuite <Button appearance="primary" size="..."> 相当
const APPEARANCE_TO_TYPE: Record<string, ButtonProps['type']> = {
  primary: 'primary',
  default: 'default',
  link: 'link',
  subtle: 'text',
  ghost: 'default',
};
const SIZE_MAP: Record<string, ButtonProps['size']> = {
  xs: 'small',
  sm: 'small',
  md: 'middle',
  lg: 'large',
};

type RsButtonProps = Omit<ButtonProps, 'type' | 'size'> & {
  appearance?: string;
  size?: ButtonProps['size'] | 'xs' | 'sm' | 'md' | 'lg';
};

export const Button: FC<RsButtonProps> = ({ appearance, size, ...rest }) => (
  <AntButton
    type={appearance ? APPEARANCE_TO_TYPE[appearance] : undefined}
    size={size ? SIZE_MAP[size] ?? (size as ButtonProps['size']) : undefined}
    {...rest}
  />
);
