import { Modal, message } from 'antd';
import { useCallback, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
  generateDummy,
  getFieldType,
  getPreset,
  isKnownSchema,
  type FieldConfig,
  type FieldOptionKind,
  type Locale,
  type OutputFormat,
} from '@/app/dummy/dummyLib';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { useFormPersistence } from '@/hooks/useFormPersistence';

export type DummyForm = {
  locale: Locale;
  count: number;
  format: OutputFormat;
  tableName: string;
  fields: FieldConfig[];
};

export const DEFAULT_VALUES: DummyForm = {
  locale: 'ja',
  count: 10,
  format: 'json',
  tableName: 'dummy_data',
  fields: [
    { name: 'id', type: 'autoincrement', start: 1 },
    { name: '氏名', type: 'name' },
    { name: 'メールアドレス', type: 'email' },
  ],
};

// セレクトの選択肢。UUID ツールに倣い、選択肢はフック側に定義して返す。
const LOCALE_OPTIONS = [
  { label: '日本語', value: 'ja' },
  { label: 'English', value: 'en' },
];

const FORMAT_OPTIONS = [
  { label: 'JSON', value: 'json' },
  { label: 'CSV', value: 'csv' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL (INSERT)', value: 'insert' },
];

export const useDummy = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [output, setOutput] = useState('');
  const methods = useCustomForm<DummyForm>({ defaultValues: DEFAULT_VALUES });
  const { control, watch, setValue, getValues } = methods;
  // スキーマの列は可変長なので useFieldArray で扱う。
  const { fields, append, remove, replace, move } = useFieldArray({ control, name: 'fields' });

  // 列定義の現在値。型に応じたオプション欄の出し分けに使う。
  const watchedFields = watch('fields');
  // SQL(INSERT) 選択時のみテーブル名入力欄を出すための判定。
  const isInsertFormat = watch('format') === 'insert';
  // 型ピッカー（サンプル付きモーダル）のサンプル生成に使う現在ロケール。
  const currentLocale = watch('locale');

  useFormPersistence('dummy', methods, (localValues) => {
    setValue('locale', localValues?.locale ?? DEFAULT_VALUES.locale);
    setValue('count', localValues?.count ?? DEFAULT_VALUES.count);
    setValue('format', localValues?.format ?? DEFAULT_VALUES.format);
    setValue('tableName', localValues?.tableName ?? DEFAULT_VALUES.tableName);
    // 配列フィールドは setValue では useFieldArray と同期しないため replace で復元する。
    replace(
      Array.isArray(localValues?.fields) && localValues.fields.length > 0
        ? localValues.fields
        : DEFAULT_VALUES.fields,
    );
  });

  const onClickGenerate = useCallback(() => {
    try {
      const { locale, count, format, tableName, fields: currentFields } = watch();
      setOutput(generateDummy(currentFields, count, locale, format, { tableName }));
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageApi.open({ type: 'error', content: e.message });
        return;
      }
      console.error(e);
    }
  }, [watch, messageApi]);

  const onClickAddField = useCallback(() => {
    // 列名は初期状態では型の名称（例: 氏名）をそのまま使う。
    append({ name: getFieldType('name')?.label ?? '', type: 'name' });
  }, [append]);

  const onClickRemoveField = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const moveField = useCallback(
    (from: number, to: number) => {
      if (to < 0 || to >= getValues('fields').length) return;
      move(from, to);
    },
    [move, getValues],
  );

  const onClickApplyPreset = useCallback(
    (key: string) => {
      const preset = getPreset(key);
      if (!preset) return;
      // 独自入力がある状態でプリセットを当てると上書きで失われるため確認する。
      if (isKnownSchema(getValues('fields'), DEFAULT_VALUES.fields)) {
        replace(preset.fields);
        return;
      }
      modalApi.confirm({
        title: '現在の列定義を置き換えますか？',
        content: '入力中の列定義は破棄され、プリセットの内容に置き換わります。',
        okText: '置き換える',
        cancelText: 'キャンセル',
        onOk: () => replace(preset.fields),
      });
    },
    [replace, getValues, modalApi],
  );

  // 型を変更したとき、型値を更新し、列名が未入力 or 旧型の名称のままなら新しい型の名称へ
  // 追従させる。手動で付けた列名は上書きしない。
  const onChangeFieldType = useCallback(
    (index: number, nextType: string) => {
      const prevType = getValues(`fields.${index}.type`);
      setValue(`fields.${index}.type`, nextType, { shouldDirty: true });
      const currentName = getValues(`fields.${index}.name`);
      const prevLabel = getFieldType(prevType)?.label;
      if (!currentName || currentName === prevLabel) {
        setValue(`fields.${index}.name`, getFieldType(nextType)?.label ?? '', { shouldDirty: true });
      }
    },
    [getValues, setValue],
  );

  // 指定列の型が持つ追加オプションの種別（min/max・length など）。
  const fieldOptionKind = useCallback(
    (index: number): FieldOptionKind | undefined =>
      getFieldType(watchedFields?.[index]?.type)?.option,
    [watchedFields],
  );

  // 行の「型」トリガーに表示するラベル。
  const fieldTypeLabel = useCallback(
    (index: number): string => getFieldType(watchedFields?.[index]?.type)?.label ?? '型を選択',
    [watchedFields],
  );

  // --- 型ピッカー（カテゴリタブ＋検索＋サンプルのモーダル） ---
  const [typePickerIndex, setTypePickerIndex] = useState<number | null>(null);

  const openTypePicker = useCallback((index: number) => {
    setTypePickerIndex(index);
  }, []);

  const closeTypePicker = useCallback(() => {
    setTypePickerIndex(null);
  }, []);

  const onSelectType = useCallback(
    (typeKey: string) => {
      if (typePickerIndex !== null) {
        onChangeFieldType(typePickerIndex, typeKey);
      }
      setTypePickerIndex(null);
    },
    [typePickerIndex, onChangeFieldType],
  );

  const typePickerCurrentType =
    typePickerIndex !== null ? watchedFields?.[typePickerIndex]?.type : undefined;

  // --- ドラッグ&ドロップによる列の並び替え ---
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const onFieldDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const onFieldDragOver = useCallback((index: number) => {
    setOverIndex((prev) => (prev === index ? prev : index));
  }, []);

  const onFieldDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
  }, []);

  const onFieldDrop = useCallback(
    (index: number) => {
      if (dragIndex !== null && dragIndex !== index) {
        moveField(dragIndex, index);
      }
      setDragIndex(null);
      setOverIndex(null);
    },
    [dragIndex, moveField],
  );

  const onClickClear = useCallback(() => {
    setOutput('');
  }, []);

  return {
    methods,
    control,
    fields,
    output,
    locale: currentLocale,
    localeOptions: LOCALE_OPTIONS,
    formatOptions: FORMAT_OPTIONS,
    isInsertFormat,
    onClickGenerate,
    onClickAddField,
    onClickRemoveField,
    onClickApplyPreset,
    fieldOptionKind,
    fieldTypeLabel,
    typePickerOpen: typePickerIndex !== null,
    typePickerCurrentType,
    openTypePicker,
    closeTypePicker,
    onSelectType,
    dragIndex,
    overIndex,
    onFieldDragStart,
    onFieldDragOver,
    onFieldDragEnd,
    onFieldDrop,
    onClickClear,
    contextHolder,
    modalContextHolder,
  };
};
