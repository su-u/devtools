import React from 'react';
import styled from '@emotion/styled';
import CodeMirrorMerge from 'react-codemirror-merge';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { DiffEditor as MonacoDiffEditor, DiffEditorProps } from '@monaco-editor/react';

// export const DiffEditor: React.FC<DiffEditorProps> = (props) => {
//   return (
//     <StyledWrapper>
//       <MonacoDiffEditor className="diff-editor" height="80vh" theme="vs-dark" {...props} />
//     </StyledWrapper>
//   );
// };
//
const StyledWrapper = styled.div``;


export const DiffEditor: React.FC<DiffEditorProps> = (props) => {

  const Original = CodeMirrorMerge.Original;
  const Modified = CodeMirrorMerge.Modified;

  return (
    <>
    <CodeMirrorMerge theme={vscodeDark} orientation="a-b">
      <Original value={props.original} />
      <Modified
        value={props.modified}
        extensions={[]}
      />
    </CodeMirrorMerge>
      {/*<StyledWrapper>*/}
      {/*<MonacoDiffEditor className="diff-editor" height="80vh" theme="vs-dark" {...props} />*/}
      {/* </StyledWrapper>*/}
      </>
  );
};