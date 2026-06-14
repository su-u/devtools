import React from 'react';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

type DiffForm = {
  original: string;
  modified: string;
};

const DEFAULT_VALUES: DiffForm = {
  original: '',
  modified: '',
};

export const useDiff = () => {
  const methods = useCustomForm<DiffForm>({
    defaultValues: DEFAULT_VALUES,
  });
  const { setValue, getValues } = methods;
  useFormPersistence('diff', methods, (defaultValues) => {
    setValue('original', defaultValues?.original);
    setValue('modified', defaultValues?.modified);
  });

  // Monaco の diff editor インスタンス（クリアの命令的操作に使う）
  const editorRef = React.useRef<any>(null);
  const handleReady = React.useCallback((editor: any) => {
    editorRef.current = editor;
  }, []);

  // 初期表示（復元値）の取得。Monaco はマウント時にこれを読んで投入する
  const getOriginal = React.useCallback(() => getValues('original') ?? '', [getValues]);
  const getModified = React.useCallback(() => getValues('modified') ?? '', [getValues]);

  // エディタの編集をフォーム（＝永続化）へ反映
  const onChangeOriginal = React.useCallback(
    (value: string) => setValue('original', value),
    [setValue],
  );
  const onChangeModified = React.useCallback(
    (value: string) => setValue('modified', value),
    [setValue],
  );

  // クリアはエディタを直接空にし、フォームも空にする
  const clearOriginal = React.useCallback(() => {
    editorRef.current?.getOriginalEditor()?.setValue('');
    setValue('original', '');
  }, [setValue]);
  const clearModified = React.useCallback(() => {
    editorRef.current?.getModifiedEditor()?.setValue('');
    setValue('modified', '');
  }, [setValue]);

  return {
    methods,
    getOriginal,
    getModified,
    onChangeOriginal,
    onChangeModified,
    handleReady,
    clearOriginal,
    clearModified,
  };
};
