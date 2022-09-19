import React from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Input, InputGroup, InputPicker, Panel, PanelGroup, Row } from 'rsuite';
import CopyOIcon from '@rsuite/icons/legacy/CopyO';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import commonStyles from '@/styles/components/Common.module.scss';
import { useNumberComma } from '@/components/pages/number_comma/useNumberComma';
import { useCopy } from '@/hooks/useCopy';

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
              <Panel header="区切りたい数値">
                <Controller
                  render={({ field }) => <Input className={commonStyles.no_resize} {...field} />}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header="区切り文字">
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
            <Panel bordered header="区切った数値">
              <InputGroup>
                <Input className={commonStyles.no_resize} readOnly value={output} />
                <InputGroup.Button onClick={copy(output)}>
                  <CopyOIcon />
                </InputGroup.Button>
              </InputGroup>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};
