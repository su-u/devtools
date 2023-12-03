'use client';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Grid, Panel, PanelGroup, Row, InputNumber } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useJsonFormatter } from '@/components/pages/json_formatter/useJsonFormatter';
import { PanelHeader } from '@/components/common/PanelHeader';
import { Input } from '@/components/common/Form/Input';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/CopyButton';
import { FormRow } from '@/components/common/Form/FormRow';

export const JsonFormatter: React.FC = () => {
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
                    render={({ field }) => <Input as="textarea" rows={14} {...field} />}
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
                <Input value={output} as="textarea" readOnly rows={14} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
