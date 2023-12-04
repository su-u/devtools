import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror/src';
import React from 'react';

export const Editor: React.FC<ReactCodeMirrorProps> = (props) => {
  return <CodeMirror height="50vh" theme={vscodeDark} {...props} />;
};
