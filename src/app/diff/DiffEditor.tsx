import styled from '@emotion/styled';
import { DiffEditor as MonacoDiffEditor, DiffEditorProps } from '@monaco-editor/react';
import React from 'react';

export const DiffEditor: React.FC<DiffEditorProps> = (props) => {
  return (
    <StyledWrapper>
      <MonacoDiffEditor className="diff-editor" height="80vh" theme="vs-dark" {...props} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;
