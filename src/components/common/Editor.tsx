import React from 'react';
import MonacoEditor, { EditorProps } from "@monaco-editor/react";

export const Editor: React.VFC<EditorProps> = (props) => {
  return (
    <MonacoEditor
      height="50vh"
      defaultLanguage="Markdown"
      {...props}
    />
  );

  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('ace-builds/src-noconflict/theme-monokai');
    require('ace-builds/src-noconflict/mode-text');
    return <Ace {...props} theme="monokai" mode="text" className="editor" />;
  }
  return null;
};
