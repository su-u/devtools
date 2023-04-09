import React from 'react';
import { DiffEditor as MonacoDiffEditor, DiffEditorProps } from '@monaco-editor/react';

export const DiffEditor: React.FC<DiffEditorProps> = (props) => {
  return <MonacoDiffEditor height="80vh" theme="vs-dark" {...props} />;
};
