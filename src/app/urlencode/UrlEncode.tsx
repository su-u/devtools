'use client';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row, Form, PanelGroup } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useUrlEncode } from '@/app/urlencode/useUrlEncode';
import { Editor } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Select } from '@/components/common/Form/Select';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const UrlEncode: FC = () => {
  const title = 'URLエンコード';
  const { methods, output, encodingList } = useUrlEncode();

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
                    render={({ field }) => <Editor {...field} />}
                    name="input"
                    control={methods.control}
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <Form fluid layout="horizontal">
                    <FormRow label="エンコード">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <Select
                            {...field}
                            style={{ width: 250 }}
                            options={encodingList}
                            showSearch
                          />
                        )}
                        name="encoding"
                        control={methods.control}
                      />
                    </FormRow>
                  </Form>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="エンコード"
                    right={<CopyButton size="small" copyText={output} />}
                  />
                }
              >
                <Editor value={output} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
