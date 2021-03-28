import React from 'react';
import { NavBar } from '@/components/NavBar';
import 'rsuite/dist/styles/rsuite-default.min.css';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
};