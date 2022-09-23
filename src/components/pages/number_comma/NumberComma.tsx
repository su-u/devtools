import React from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { Col, Grid, InputGroup, InputPicker, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useNumberComma } from '@/components/pages/number_comma/useNumberComma';
import { useCopy } from '@/hooks/useCopy';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';

export const NumberComma: React.VFC = () => {
  const title = '数値区切り';
  const { control, output, selectData } = useNumberComma();
  const { copy } = useCopy();

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={10}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel header={<PanelHeader title="区切りたい数値" />}>
                <Controller
                  render={({ field }) => <Input noResize="none" {...field} />}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header={<PanelHeader title="設定" />}>
                <Form fluid layout="horizontal">
                  <Form.Group>
                    <Label>エンコード</Label>
                    <Controller
                      render={({ field }) => (
                        <InputPicker data={selectData} size="sm" defaultValue="," {...field} />
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
                <Input noResize="none" readOnly value={output} />
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
