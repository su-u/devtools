import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import React from 'react';
import { EditorProps } from '@/components/common/Editor';

// Editor.tsx の `ex` トークン文字列 → 実際の CodeMirror Extension へのマップ。
// 重い @codemirror/* はこのファイル内だけに閉じ込め、next/dynamic 経由で遅延ロードする。
const EXTENSION_MAP: Record<string, Extension> = {
  json: json(),
  lineWrapping: EditorView.lineWrapping,
};

const resolveExtensions = (extensions?: any[]): Extension[] =>
  (extensions ?? []).map((ext) => (typeof ext === 'string' ? EXTENSION_MAP[ext] : ext));

const CodeMirrorEditor: React.FC<EditorProps> = ({ extensions, ...props }) => {
  return (
    <CodeMirror
      width="100%"
      maxWidth="1800px"
      height="60vh"
      theme={vscodeDark}
      extensions={resolveExtensions(extensions)}
      {...props}
    />
  );
};

export default CodeMirrorEditor;
