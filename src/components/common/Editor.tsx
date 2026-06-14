import styled from '@emotion/styled';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import dynamic from 'next/dynamic';
import React from 'react';

// 拡張は @codemirror/* を静的 import せずに渡せるよう、軽量なトークン文字列として扱う。
// 実体への解決は CodeMirrorEditor 側で行う。
export type EditorProps = Omit<ReactCodeMirrorProps, 'extensions'> & {
  extensions?: any[];
};

// CodeMirror 本体・テーマ・言語拡張（@codemirror/*）は重いため、
// クライアントでの遅延ロードに切り出して初期バンドルから除外する。
const CodeMirrorEditor = dynamic(() => import('@/components/common/CodeMirrorEditor'), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  return (
    <WrapperStyle ref={ref}>
      <CodeMirrorEditor {...props} />
    </WrapperStyle>
  );
});
Editor.displayName = 'Editor';

const WrapperStyle = styled.div`
  .cm-editor {
    border-radius: 6px;
  }
  .cm-scroller {
    border: 1px solid #565a61;
    border-radius: 6px;

    &:active,
    &:hover,
    &:focus {
      border-color: #34c3ff;
    }
  }
`;

// 遅延ロード中に高さを確保してレイアウトシフトを防ぐプレースホルダー。
const EditorPlaceholder = styled.div`
  width: 100%;
  max-width: 1800px;
  height: 60vh;
  border: 1px solid #565a61;
  border-radius: 6px;
`;

export const ex = {
  json: 'json',
  lineWrapping: 'lineWrapping',
} as const;
