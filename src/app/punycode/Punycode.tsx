'use client';
import { Space } from 'antd';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, ButtonToolbar } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { usePunycode } from '@/app/punycode/usePunycode';
import { Editor } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { TextArea } from '@/components/common/Form/TextArea';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const Punycode: FC = () => {
  const title = 'punycode変換（日本語ドメイン変換）';
  const INPUT_ROWS = 5;
  const { methods, converted_ascii, converted_punycode } = usePunycode();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="変換する文字列"
                    right={
                      <ButtonToolbar>
                        <ClearButton name="input" />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Controller
                  render={({ field }) => <Editor {...field} />}
                  name="input"
                  control={control}
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  header={
                    <PanelHeader
                      title="ドメイン変換"
                      right={<CopyButton size="small" copyText={converted_punycode} />}
                    />
                  }
                >
                  <Space.Compact block>
                    <TextArea rows={INPUT_ROWS} readOnly value={converted_ascii} />
                  </Space.Compact>
                </Panel>
                <Panel
                  header={
                    <PanelHeader
                      title="punycode変換"
                      right={<CopyButton size="small" copyText={converted_punycode} />}
                    />
                  }
                >
                  <Space.Compact block>
                    <TextArea rows={INPUT_ROWS} readOnly value={converted_punycode} />
                  </Space.Compact>
                </Panel>
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
