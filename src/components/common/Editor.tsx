import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import styled from '@emotion/styled';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror/src';
import React from 'react';

export const Editor = React.forwardRef<HTMLDivElement, ReactCodeMirrorProps>((props, ref) => {
  return (
    <WrapperStyle ref={ref}>
      <CodeMirror width="100%" maxWidth="1800px" height="60vh" theme={vscodeDark} {...props} />
    </WrapperStyle>
  );
});
Editor.displayName = 'Editor';

const WrapperStyle = styled.div`
  .cm-editor {
    border-radius: 6px;
  }
  .cm-scroller {
    border: 1px solid #a4a9b3;
    border-radius: 6px;

    &:active,
    &:hover,
    &:focus {
      border-color: #34c3ff;
    }
  }
`;

export const ex = {
  json: json(),
  lineWrapping: EditorView.lineWrapping,
};
