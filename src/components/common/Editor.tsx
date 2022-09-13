import React from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';

export const Editor: React.VFC<EditorProps> = (props) => {
  return <MonacoEditor height="50vh" defaultLanguage="Markdown" {...props} />;
};
