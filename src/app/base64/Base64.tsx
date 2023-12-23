'use client';
import React, { FC } from 'react';
import { FormProvider, Controller } from 'react-hook-form';
import { Grid, Row, Col, Panel } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useBase64 } from '@/app/base64/useBase64';
import { Editor, ex } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const Base64: FC = () => {
  const title = 'base64エンコード';
  const { methods, output } = useBase64();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={<PanelHeader title="入力文字" right={<ClearButton name="input" />} />}
              >
                <Controller
                  render={({ field }) => <Editor {...field} />}
                  name="input"
                  control={methods.control}
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="base64エンコード"
                    right={<CopyButton size="small" copyText={output} />}
                  />
                }
              >
                <Editor value={output} extensions={[ex.lineWrapping]} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
