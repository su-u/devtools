import React from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';

export const Editor: React.FC<EditorProps> = (props) => {
  return <MonacoEditor height="50vh" theme="vs-dark" defaultLanguage="Markdown" {...props} />;
};
