import React from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { Col, Grid, InputGroup, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useCopy } from '@/hooks/useCopy';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';
import { useDate } from '@/components/pages/date/useDate';
import { DatePicker } from 'rsuite';
import { ConfigLabel } from '@/components/common/Form/ConfigForm';
import { Toggle } from 'rsuite';

export const Date: React.VFC = () => {
  const title = 'ダミーデータ';
  const { methods, control, output } = useDate();
  const { copy } = useCopy();

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel bordered header={<PanelHeader title="入力" />}>
                <Form fluid layout="horizontal">
                  <Form.Group>
                    <Label>日付</Label>
                    <Controller
                      render={() => <DatePicker format="yyyy-MM-dd HH:mm:ss" size="sm" style={{ width: 220 }} />}
                      name="inputDate"
                      control={control}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Label>Unixtime</Label>
                    <Controller
                      render={({ field }) => <Input noResize="none" style={{ width: 220 }} {...field} />}
                      name="inputUnixTime"
                      control={control}
                    />
                  </Form.Group>
                </Form>
              </Panel>
              {/*<Panel bordered header={<PanelHeader title="設定" />}>*/}
              {/*  <Form fluid layout="horizontal">*/}
              {/*    <Form.Group>*/}
              {/*      <ConfigLabel>大文字</ConfigLabel>*/}
              {/*      <Controller*/}
              {/*        render={({ field }) => <Toggle {...field} />}*/}
              {/*        name="isUppercase"*/}
              {/*        control={methods.control}*/}
              {/*      />*/}
              {/*    </Form.Group>*/}
              {/*  </Form>*/}
              {/*</Panel>*/}
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
