'use client';
import { Space } from 'antd';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useNumberComma, DEFAULT_VALUES, SEPARATOR_LIST } from '@/app/number_comma/useNumberComma';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { Select } from '@/components/common/Form/Select';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const NumberComma: FC = () => {
  const title = '数値区切り';
  const { methods, output } = useNumberComma();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  header={
                    <PanelHeader title="区切りたい数値" right={<ClearButton name="input" />} />
                  }
                >
                  <Controller
                    render={({ field: { ref, ...field } }) => <Input noResize="none" {...field} />}
                    name="input"
                    control={methods.control}
                    defaultValue={DEFAULT_VALUES.input}
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <Form fluid layout="horizontal">
                    <FormRow label="区切り文字">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <Select
                            style={{ width: 250 }}
                            options={SEPARATOR_LIST}
                            defaultValue={DEFAULT_VALUES.separator}
                            {...field}
                          />
                        )}
                        name="separator"
                        control={methods.control}
                      />
                    </FormRow>
                  </Form>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="区切った数値" />}>
                <Space.Compact block>
                  <Input noResize="none" readOnly value={output} />
                  <CopyButton copyText={output} />
                </Space.Compact>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
