'use client';
import { ConfigProvider, theme } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import React, { FC } from 'react';
import 'dayjs/locale/ja';

type Props = {
  children: React.ReactNode;
};

export const Provider: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          // 旧 rsuite ダークテーマの配色に近づける
          colorBgLayout: '#36393f',
          colorBgContainer: '#2b2d31',
          colorBorder: '#a4a9b3',
          colorBorderSecondary: '#3a3d42',
        },
        components: {
          Layout: {
            // サイドバー(Sider)の色を統一。デフォルトの折りたたみトリガーは紺色(#002140)なので合わせる
            siderBg: '#181818',
            triggerBg: '#181818',
            triggerColor: '#ffffff',
          },
          Menu: {
            // ダークメニューの各階層の背景を Sider と同色にして色ムラをなくす
            darkItemBg: '#181818',
            darkSubMenuItemBg: '#181818',
            darkPopupBg: '#181818',
            // 項目の行の高さを低めにしてコンパクトにする
            itemHeight: 32,
          },
        },
      }}
      locale={jaJP}
    >
      {children}
    </ConfigProvider>
  );
};
