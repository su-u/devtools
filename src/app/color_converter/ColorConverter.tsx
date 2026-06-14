'use client';
import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { useColorConverter, DEFAULT_VALUES } from '@/app/color_converter/useColorConverter';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { Input } from '@/components/common/Form/Input';
import { InputListForm } from '@/components/common/Form/InputListForm';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { Col, Grid, Panel, PanelGroup, Row } from '@/components/common/layout';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { AppLayout } from '@/Layout/App';

export const ColorConverter: FC = () => {
  const title = 'カラーコード変換';
  const { methods, result, error, pickerValue, onPickColor } = useColorConverter();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  bordered
                  header={<PanelHeader title="入力値" right={<ClearButton name="input" />} />}
                >
                  <InputRow>
                    <ColorPicker
                      type="color"
                      value={pickerValue}
                      onChange={(e) => onPickColor(e.target.value)}
                      aria-label="カラーピッカー"
                    />
                    <Controller
                      render={({ field: { ref, ...field } }) => (
                        <Input
                          noResize="none"
                          placeholder="#3498DB / rgb(52,152,219) / hsl(204,70%,53%)"
                          {...field}
                        />
                      )}
                      name="input"
                      control={methods.control}
                      defaultValue={DEFAULT_VALUES.input}
                    />
                  </InputRow>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="変換結果" />}>
                {error ? (
                  <ErrorText>{error}</ErrorText>
                ) : (
                  <>
                    <Preview>
                      <PreviewColor style={{ background: result.preview }} />
                    </Preview>
                    <InputListForm>
                      <LabelInput label="HEX" value={result.hex} />
                      <LabelInput label="RGB" value={result.rgb} />
                      <LabelInput label="HSL" value={result.hsl} />
                    </InputListForm>
                  </>
                )}
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ネイティブカラーピッカー（rsuite/antd に依存しない最小スタイル）
const ColorPicker = styled.input`
  flex: 0 0 auto;
  width: 40px;
  height: 32px;
  padding: 0;
  border: 1px solid #444;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
`;

// 市松模様の背景。アルファ付きの色を重ねても透過が視認できるようにする
const Preview = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 12px;
  overflow: hidden;
  border: 1px solid #444;
  border-radius: 6px;
  background-image: linear-gradient(45deg, #555 25%, transparent 25%),
    linear-gradient(-45deg, #555 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #555 75%),
    linear-gradient(-45deg, transparent 75%, #555 75%);
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0;
`;

// 市松模様の上に重ねる実際の色（透過色は下地が透ける）
const PreviewColor = styled.div`
  width: 100%;
  height: 100%;
`;

const ErrorText: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ color: '#ff7875', margin: 0 }}>{children}</p>
);
