'use client';
import { ConfigProvider, theme } from 'antd';
import React, { FC } from 'react';
import { CustomProvider } from 'rsuite';

type Props = {
  children: React.ReactNode;
};

export const Provider: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <CustomProvider theme="dark">{children}</CustomProvider>
    </ConfigProvider>
  );
};
