'use client';
import React, { FC } from 'react';
import { CustomProvider } from 'rsuite';

type Props = {
  children: React.ReactNode;
};

export const Provider: FC<Props> = ({ children }) => {
  return <CustomProvider theme="dark">{children}</CustomProvider>;
};
