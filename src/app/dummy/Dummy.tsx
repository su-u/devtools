'use client';
import { DeleteOutlined, DownOutlined, HolderOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Space } from 'antd';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { AppLayout } from '@/Layout/App';
import { PRESETS } from '@/app/dummy/dummyLib';
import { TypePickerModal } from '@/app/dummy/TypePickerModal';
import { DEFAULT_VALUES, useDummy } from '@/app/dummy/useDummy';
import { Col, Grid, Panel, Row, PanelGroup, Form, Button } from '@/components/common/layout';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { InputNumber } from '@/components/common/Form/InputNumber';
import { Select } from '@/components/common/Form/Select';
import { TextArea } from '@/components/common/Form/TextArea';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const Dummy: FC<{ title: string; description: string }> = ({ title, description }) => {
  const {
    methods,
    control,
    fields,
    output,
    locale,
    localeOptions,
    formatOptions,
    isInsertFormat,
    onClickGenerate,
    onClickAddField,
    onClickRemoveField,
    onClickApplyPreset,
    fieldOptionKind,
    fieldTypeLabel,
    typePickerOpen,
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
  } = useDummy();

  // 型に応じた追加オプション欄を描画する（出し分けの判定はフックの fieldOptionKind が担う）。
  const renderOptions = (index: number) => {
    switch (fieldOptionKind(index)) {
      case 'minmax':
        return (
          <>
            <Controller
              render={({ field: { ref, ...field } }) => (
                <InputNumber placeholder="min" style={{ width: 90 }} {...field} />
              )}
              name={`fields.${index}.min`}
              control={control}
            />
            <Controller
              render={({ field: { ref, ...field } }) => (
                <InputNumber placeholder="max" style={{ width: 90 }} {...field} />
              )}
              name={`fields.${index}.max`}
              control={control}
            />
          </>
        );
      case 'length':
        return (
          <Controller
            render={({ field: { ref, ...field } }) => (
              <InputNumber placeholder="文字数" min={1} style={{ width: 100 }} {...field} />
            )}
            name={`fields.${index}.length`}
            control={control}
          />
        );
      case 'start':
        return (
          <Controller
            render={({ field: { ref, ...field } }) => (
              <InputNumber placeholder="開始値" style={{ width: 100 }} {...field} />
            )}
            name={`fields.${index}.start`}
            control={control}
          />
        );
      case 'dateRange':
        return (
          <>
            <Controller
              render={({ field: { ref, ...field } }) => (
                <Input placeholder="from 例:2000-01-01" style={{ width: 160 }} {...field} />
              )}
              name={`fields.${index}.from`}
              control={control}
            />
            <Controller
              render={({ field: { ref, ...field } }) => (
                <Input placeholder="to 例:2030-12-31" style={{ width: 160 }} {...field} />
              )}
              name={`fields.${index}.to`}
              control={control}
            />
          </>
        );
      case 'list':
        return (
          <Controller
            render={({ field: { ref, ...field } }) => (
              <Input placeholder="カンマ区切り 例: A,B,C" style={{ width: 220 }} {...field} />
            )}
            name={`fields.${index}.values`}
            control={control}
          />
        );
      case 'fixed':
        return (
          <Controller
            render={({ field: { ref, ...field } }) => (
              <Input placeholder="固定値" style={{ width: 180 }} {...field} />
            )}
            name={`fields.${index}.value`}
            control={control}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      {contextHolder}
      <AppLayout>
        {/* 確認ダイアログは ConfigProvider(ダークテーマ)配下に置く必要があるため AppLayout 内に描画する */}
        {modalContextHolder}
        <TypePickerModal
          open={typePickerOpen}
          locale={locale}
          currentType={typePickerCurrentType}
          onSelect={onSelectType}
          onClose={closeTypePicker}
        />
        <Grid fluid>
          <PageTitle title={title} description={description} />
          <Row gutter={5}>
            <Col md={12} xs={24}>
              <Form fluid layout="horizontal">
                <PanelGroup bordered>
                  <Panel bordered header={<PanelHeader title="設定" />}>
                    <FormRow label="ロケール">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <Select
                            style={{ width: '100%', maxWidth: 250 }}
                            options={localeOptions}
                            defaultValue={DEFAULT_VALUES.locale}
                            {...field}
                          />
                        )}
                        name="locale"
                        control={control}
                      />
                    </FormRow>
                    <FormRow label="件数">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <InputNumber
                            style={{ width: '100%', maxWidth: 250 }}
                            defaultValue={DEFAULT_VALUES.count}
                            min={1}
                            max={10000}
                            {...field}
                          />
                        )}
                        name="count"
                        control={control}
                      />
                    </FormRow>
                    <FormRow label="出力形式">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <Select
                            style={{ width: '100%', maxWidth: 250 }}
                            options={formatOptions}
                            defaultValue={DEFAULT_VALUES.format}
                            {...field}
                          />
                        )}
                        name="format"
                        control={control}
                      />
                    </FormRow>
                    {isInsertFormat && (
                      <FormRow label="テーブル名">
                        <Controller
                          render={({ field: { ref, ...field } }) => (
                            <Input
                              style={{ width: '100%', maxWidth: 250 }}
                              placeholder="dummy_data"
                              {...field}
                            />
                          )}
                          name="tableName"
                          control={control}
                        />
                      </FormRow>
                    )}
                  </Panel>
                  <Panel bordered header={<PanelHeader title="プリセット" />}>
                    <Space wrap>
                      {PRESETS.map((preset) => (
                        <Button key={preset.key} onClick={() => onClickApplyPreset(preset.key)}>
                          {preset.label}
                        </Button>
                      ))}
                    </Space>
                  </Panel>
                  <Panel bordered header={<PanelHeader title="列の定義" />}>
                    {fields.map((field, index) => (
                      <FieldRow
                        key={field.id}
                        $dragging={dragIndex === index}
                        $over={overIndex === index && dragIndex !== index}
                        onDragOver={(e) => {
                          e.preventDefault();
                          onFieldDragOver(index);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          onFieldDrop(index);
                        }}
                      >
                        <DragHandle
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = 'move';
                            onFieldDragStart(index);
                          }}
                          onDragEnd={onFieldDragEnd}
                          title="ドラッグで並び替え"
                        >
                          <HolderOutlined />
                        </DragHandle>
                        <Controller
                          render={({ field: { ref, ...f } }) => (
                            <Input placeholder="列名" style={{ width: 140 }} {...f} />
                          )}
                          name={`fields.${index}.name`}
                          control={control}
                        />
                        <TypeTrigger type="button" onClick={() => openTypePicker(index)}>
                          <span className="label">{fieldTypeLabel(index)}</span>
                          <DownOutlined className="caret" />
                        </TypeTrigger>
                        {renderOptions(index)}
                        <Button
                          appearance="subtle"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => onClickRemoveField(index)}
                        />
                      </FieldRow>
                    ))}
                    <Button
                      icon={<PlusOutlined />}
                      onClick={onClickAddField}
                      style={{ marginTop: 8 }}
                    >
                      列を追加
                    </Button>
                  </Panel>
                  <Panel bordered header={<PanelHeader title="生成" />}>
                    <Button appearance="primary" onClick={onClickGenerate}>
                      ダミーデータの生成
                    </Button>
                  </Panel>
                </PanelGroup>
              </Form>
            </Col>
            <Col md={12} xs={24}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="出力"
                    right={
                      <Space.Compact block>
                        <CopyButton copyText={output} size="small" />
                        <ClearButton name="output" onClick={onClickClear} />
                      </Space.Compact>
                    }
                  />
                }
              >
                <TextArea value={output} readOnly rows={24} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

// 1 列分の入力をまとめる行。狭い画面では折り返す。
const FieldRow = styled.div<{ $dragging?: boolean; $over?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  opacity: ${({ $dragging }) => ($dragging ? 0.4 : 1)};
  /* ドロップ先の行に上ボーダーで挿入位置を示す */
  box-shadow: ${({ $over }) => ($over ? 'inset 0 2px 0 0 var(--rs-primary-500, #3498ff)' : 'none')};
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

// 型選択のトリガー。antd Select 風の見た目で、クリックすると型ピッカーのモーダルを開く。
const TypeTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 220px;
  height: 32px;
  padding: 0 11px;
  border: 1px solid #424242;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    border-color: var(--rs-primary-500, #3498ff);
  }
  .label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .caret {
    font-size: 12px;
    opacity: 0.45;
  }
`;

// ドラッグの起点となるハンドル。入力欄と干渉しないよう、ここだけ draggable にする。
const DragHandle = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px;
  cursor: grab;
  color: var(--rs-text-secondary, #a4a9b3);
  &:active {
    cursor: grabbing;
  }
`;
