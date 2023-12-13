'use client';
import { Space } from 'antd';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useNumberComma } from '@/app/number_comma/useNumberComma';
import { CopyButton } from '@/components/common/CopyButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { Select } from '@/components/common/Form/Select';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const NumberComma: FC = () => {
  const title = '数値区切り';
  const { control, output, SEPARATOR_LIST, DEFAULT_VALUES } = useNumberComma();

  return (
    <AppLayout>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel header={<PanelHeader title="区切りたい数値" />}>
                <Controller
                  render={({ field }) => <Input noResize="none" {...field} />}
                  name="input"
                  control={control}
                  defaultValue={DEFAULT_VALUES.input}
                />
              </Panel>
              <Panel bordered header={<PanelHeader title="設定" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="区切り文字">
                    <Controller
                      render={({ field }) => (
                        <Select
                          style={{ width: 250 }}
                          options={SEPARATOR_LIST}
                          defaultValue={DEFAULT_VALUES.separator}
                          {...field}
                        />
                      )}
                      name="separator"
                      control={control}
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
  );
};