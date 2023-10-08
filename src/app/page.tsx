'use client';
import React from 'react';
import { AppLayout } from '@/Layout/App';
const indexPage: React.FC = () => {
  const title = '開発補助ツール';

  return (
    <AppLayout title={title}></AppLayout>
  )
}

export default indexPage;