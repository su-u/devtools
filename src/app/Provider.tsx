'use client';
import { ConfigProvider, theme } from 'antd';
import locale from 'antd/locale/ja_JP';
import React, { FC } from 'react';
import { CustomProvider } from 'rsuite';
import 'dayjs/locale/ja';

type Props = {
  children: React.ReactNode;
};

export const Provider: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
      // locale={locale}
    >
      <CustomProvider theme="dark">{children}</CustomProvider>
    </ConfigProvider>
  );
};
