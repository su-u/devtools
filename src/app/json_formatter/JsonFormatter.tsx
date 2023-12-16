'use client';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useJsonFormatter } from '@/app/json_formatter/useJsonFormatter';
import { Editor, ex } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { InputNumber } from '@/components/common/Form/InputNumber';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const JsonFormatter: FC = () => {
  const title = 'JSONフォーマット';
  const { methods, output, DEFAULT_VALUES } = useJsonFormatter();

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
                  header={<PanelHeader title="入力文字" right={<ClearButton name="input" />} />}
                >
                  <Controller
                    render={({ field }) => <Editor extensions={[ex.json]} {...field} />}
                    name="input"
                    control={methods.control}
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <FormRow label="スペース">
                    <Controller
                      render={({ field }) => (
                        <InputNumber
                          style={{ width: 250 }}
                          min={0}
                          max={10}
                          defaultValue={DEFAULT_VALUES.indentSpace}
                          {...field}
                        />
                      )}
                      name="indentSpace"
                      control={methods.control}
                    />
                  </FormRow>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="フォーマット"
                    right={<CopyButton size="small" copyText={output} />}
                  />
                }
              >
                <Editor extensions={[ex.json]} value={output} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
