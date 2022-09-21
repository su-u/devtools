import React from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, InputGroup, InputPicker, Panel, PanelGroup, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useNumberComma } from '@/components/pages/number_comma/useNumberComma';
import { useCopy } from '@/hooks/useCopy';
import { Input } from '@/components/common/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';

export const NumberComma: React.VFC = () => {
  const { control, title, output, selectData } = useNumberComma();
  const { copy } = useCopy();

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <Row>
          <Col xs={24}>
            <PageTitle title={title} />
          </Col>
        </Row>
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
              <Panel bordered header={<PanelHeader title="区切り文字" />}>
                <Controller
                  render={({ field }) => (
                    <InputPicker data={selectData} defaultValue="," {...field} />
                  )}
                  name="separator"
                  control={control}
                  defaultValue=","
                />
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
