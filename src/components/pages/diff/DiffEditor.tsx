import React from 'react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import CodeMirrorMerge from 'react-codemirror-merge';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { DiffEditor as MonacoDiffEditor, DiffEditorProps } from '@monaco-editor/react';

export const DiffEditor: React.FC<DiffEditorProps> = (props) => {
  const { setValue } = useFormContext();
  const Original = CodeMirrorMerge.Original;
  const Modified = CodeMirrorMerge.Modified;

  const onChangeOriginal = React.useCallback(
    (value) => {
      setValue('original', value);
    },
    [setValue],
  );

  const onChangeModified = React.useCallback(
    (value) => {
      setValue('modified', value);
    },
    [setValue],
  );

  return (
    <CodeMirrorMerge theme={vscodeDark} orientation="a-b">
      <Original onChange={onChangeOriginal} value={props.original} />
      <Modified onChange={onChangeModified} value={props.modified} extensions={[]} />
    </CodeMirrorMerge>
  );
};
