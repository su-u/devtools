'use client';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row } from 'rsuite';
import ReactJson from 'react-json-view';
import { AppLayout } from '@/Layout/App';
import { useJsonView } from '@/app/json_view/useJsonView';
import { Editor, ex } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const JsonView: FC = () => {
  const title = 'JSONビューアー';
  const { input, methods } = useJsonView();

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
                  header={<PanelHeader title="入力" right={<ClearButton name="input" />} />}
                >
                  <Controller
                    render={({ field }) => <Editor extensions={[ex.json]} {...field} />}
                    name="input"
                    control={methods.control}
                  />
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="JSON"
                    right={<CopyButton size="small" copyText={JSON.stringify(input)} />}
                  />
                }
              >
                <ReactJson
                  src={input}
                  theme="chalk"
                  style={{ padding: '4px', border: '1px solid #a4a9b3', borderRadius: '6px' }}
                />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
