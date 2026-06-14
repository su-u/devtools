import styled from '@emotion/styled';
import { DiffEditor as MonacoDiffEditor, DiffOnMount } from '@monaco-editor/react';
import React, { FC } from 'react';

type Props = {
  getOriginal: () => string;
  getModified: () => string;
  onChangeOriginal: (value: string) => void;
  onChangeModified: (value: string) => void;
  onReady?: (editor: any) => void;
  height?: string;
};

// 左右2ペインを編集可能にし、入力と差分確認を1つのエディタに統合する。
// 左ペイン=比較対象1(original) / 右ペイン=比較対象2(modified)。
// Monaco は非制御で扱う（original/modified プロップは空固定）。
// - 復元値はマウント時に setValue で初期投入（プロップ駆動だと左ペインのカーソルが飛ぶため）
// - 編集は onDidChangeModelContent でフォームへ反映
// - クリアは onReady で渡すインスタンス経由で命令的に行う
export const DiffEditor: FC<Props> = ({
  getOriginal,
  getModified,
  onChangeOriginal,
  onChangeModified,
  onReady,
  height = '74vh',
}) => {
  const handleMount: DiffOnMount = (editor) => {
    const originalEditor = editor.getOriginalEditor();
    const modifiedEditor = editor.getModifiedEditor();

    // リスナー登録前に復元値を投入（初期投入では onChange を発火させない）
    const o = getOriginal();
    const m = getModified();
    if (o) originalEditor.setValue(o);
    if (m) modifiedEditor.setValue(m);

    originalEditor.onDidChangeModelContent(() => onChangeOriginal(originalEditor.getValue()));
    modifiedEditor.onDidChangeModelContent(() => onChangeModified(modifiedEditor.getValue()));

    onReady?.(editor);
  };

  return (
    <StyledWrapper>
      <MonacoDiffEditor
        className="diff-editor"
        height={height}
        theme="vs-dark"
        original=""
        modified=""
        onMount={handleMount}
        options={{
          originalEditable: true,
          renderSideBySide: true,
          fontSize: 14,
          tabSize: 2,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border: 1px solid #565a61;
  border-radius: 6px;
  overflow: hidden;
`;
