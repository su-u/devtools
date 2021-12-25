import React from 'react';
import { IAceEditorProps } from 'react-ace';

export const Editor: React.VFC<Omit<IAceEditorProps, 'mode' | 'theme' | 'className'>> = (props) => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('ace-builds/src-noconflict/theme-monokai');
    require('ace-builds/src-noconflict/mode-text');
    return <Ace {...props} theme="monokai" mode="text" className="editor" />;
  }
  return null;
};
