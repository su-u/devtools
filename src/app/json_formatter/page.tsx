'use client';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Grid, Panel, PanelGroup, Row, InputNumber } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useJsonFormatter } from '@/app/json_formatter/useJsonFormatter';
import { CopyButton } from '@/components/common/CopyButton';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { Editor, lang } from '@/components/common/Editor';

const JsonFormatterPage: React.FC = () => {
  const title = 'JSONフォーマット';
  const { methods, output, DEFAULT_VALUES } = useJsonFormatter();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  bordered
                  header={
                    <PanelHeader
                      title="入力文字"
                      right={
                        <ButtonToolbar>
                          <ClearButton name="input" />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <Controller
                    render={({ field }) =>
                      <Editor extensions={[lang.json()]} {...field} />}
                    name="input"
                    control={methods.control}
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <FormRow label="スペース">
                    <Controller
                      render={({ field }) => (
                        <InputNumber
                          size="sm"
                          defaultValue={DEFAULT_VALUES.indentSpace}
                          min={0}
                          max={10}
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
                    right={
                      <ButtonToolbar>
                        <CopyButton copyText={output} />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Editor extensions={[lang.json()]} value={output} readOnly />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

export default JsonFormatterPage;
