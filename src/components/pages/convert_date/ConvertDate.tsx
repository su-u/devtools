import React from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useConvertDate } from '@/components/pages/convert_date/useConvertDate';
import { DatePicker } from 'rsuite';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { HorizontalForm } from '@/components/common/Form/HorizontalForm';
import { InputPicker } from 'rsuite';
import { dayjs } from '@/lib/dayjs';

export const ConvertDate: React.FC = () => {
  const title = 'ダミーデータ';
  const { methods, control, output, timezones, inputDate } = useConvertDate();

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
                      render={({ field: { onChange } }) => <DatePicker format="yyyy-MM-dd HH:mm:ss" size="sm" style={{ width: 220 }} onChange={(value) => value && onChange(dayjs(value))}/>}
                      name="inputDate"
                      control={control}
                    />
                  </Form.Group>
                </Form>
              </Panel>
              <Panel bordered header={<PanelHeader title="共通設定" />}>
                <Form fluid layout="horizontal">
                  <Form.Group>
                    <Label>TimeZone</Label>
                    <Controller
                      render={({ field }) => (
                        <InputPicker data={timezones} size="sm" defaultValue="," {...field} />
                      )}
                      name="timezone"
                      control={control}
                    />
                  </Form.Group>
                </Form>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header={<PanelHeader title="出力" />}>
              <HorizontalForm>
                <LabelInput label="ISO 8601" value={output.ISO8601} />
                <LabelInput label="日付時間" value={output.fullDate} />
                <LabelInput label="年" value={output.year} />
                <LabelInput label="月" value={output.month} />
                <LabelInput label="日" value={output.d} />
                <LabelInput label="曜日" value={output.week} />
                <LabelInput label="unixtime" value={output.unixTime} />
              </HorizontalForm>
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
