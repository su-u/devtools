import styled from '@emotion/styled';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror/src';
import React from 'react';

export const Editor: React.FC<ReactCodeMirrorProps> = (props) => {
  return (
    <WrapperStyle>
      <CodeMirror height="50vh" theme={vscodeDark} {...props} />
    </WrapperStyle>
  );
};

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
