'use client';
import React from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { Col, Grid, InputGroup, InputPicker, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useCopy } from '@/hooks/useCopy';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';
import { useDummy, LANG_LIST } from '@/components/pages/dummy/useDummy';

export const Dummy: React.FC = () => {
  const title = 'ダミーデータ';
  const { control, output } = useDummy();
  const { copy } = useCopy();

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel bordered header={<PanelHeader title="設定" />}>
                <Form fluid layout="horizontal">
                  <Form.Group>
                    <Label>エンコード</Label>
                    <Controller
                      render={({ field }) => (
                        <InputPicker data={LANG_LIST} size="sm" defaultValue="," {...field} />
                      )}
                      name="separator"
                      control={control}
                      defaultValue=","
                    />
                  </Form.Group>
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

const Label = styled(Form.ControlLabel)`
  padding-left: 6px !important;
  width: 90px !important;
  line-height: 12px !important;
  text-align: left !important;
`;
