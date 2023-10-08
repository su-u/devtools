'use client';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, InputGroup, InputPicker, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useNumberComma } from '@/components/pages/number_comma/useNumberComma';
import { useCopy } from '@/hooks/useCopy';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';
import { FormRow } from '@/components/common/Form/FormRow';

export const NumberComma: React.FC = () => {
  const title = '数値区切り';
  const { control, output, selectData } = useNumberComma();
  const { copy } = useCopy();

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel header={<PanelHeader title="区切りたい数値" />}>
                <Controller
                  render={({ field }) => <Input noResize="none" size="sm" {...field} />}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header={<PanelHeader title="設定" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="区切り文字">
                    <Controller
                      render={({ field }) => (
                        <InputPicker
                          data={selectData}
                          size="sm"
                          defaultValue=","
                          cleanable={false}
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
              <InputGroup>
                <Input noResize="none" size="sm" readOnly value={output} />
                <InputGroup.Button onClick={copy(output)}>
                  <CopyIcon />
                </InputGroup.Button>
              </InputGroup>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};
