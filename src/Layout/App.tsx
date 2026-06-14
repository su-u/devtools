'use client';
import styled from '@emotion/styled';
import { Layout } from 'antd';
import React, { FC } from 'react';
import { Provider } from '@/app/Provider';
import { SideNavBar } from '@/components/common/SideNavBar';

type Props = {
  children?: React.ReactNode;
};

export const AppLayout: FC<Props> = ({ children }) => {
  return (
    <Provider>
      {/* レイアウト骨格は inline style で固定する。
          クラス(emotion/antd cssinjs)は JS 経由で当たるまで時間がかかり初回描画に間に合わないため、
          inline style（クラスより優先・SSR HTMLに直接出力）で描画前から横並びを確定させる。 */}
      <StyledLayout style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <SideNavBar />
        <StyledContent style={{ flex: 'auto', minWidth: 0, overflow: 'auto' }}>
          {children}
        </StyledContent>
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled(Layout)`
  background-color: #36393f;
  color: white;
  height: 100vh;
  flex-direction: row;
`;

const StyledContent = styled(Layout.Content)`
  /* 変更前(rsuite Grid fluid)の横余白 約15px + 下20px に合わせる。上は元々無し */
  padding: 0 16px 20px;
  overflow: auto;
  /* flex の子が中身の最小幅以下に縮めず横あふれするのを防ぐ */
  min-width: 0;
`;
