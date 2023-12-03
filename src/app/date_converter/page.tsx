'use client';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form, DatePicker, InputPicker } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useDateConverter } from '@/app/date_converter/useDateConverter';
import { FormRow } from '@/components/common/Form/FormRow';
import { HorizontalForm } from '@/components/common/Form/HorizontalForm';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { dayjs } from '@/lib/dayjs';

const DateConverterePage: React.FC = () => {
  const title = '日付の変換';
  const { control, output, timezones, inputDate } = useDateConverter();

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel bordered header={<PanelHeader title="入力" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="日付">
                    <Controller
                      render={({ field: { onChange } }) => (
                        <DatePicker
                          format="yyyy-MM-dd HH:mm:ss"
                          size="sm"
                          style={{ width: 220 }}
                          onChange={(value) => value && onChange(dayjs(value))}
                        />
                      )}
                      name="inputDate"
                      control={control}
                    />
                  </FormRow>
                </Form>
              </Panel>
              <Panel bordered header={<PanelHeader title="共通設定" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="TimeZone">
                    <Controller
                      render={({ field }) => (
                        <InputPicker
                          data={timezones}
                          size="sm"
                          defaultValue=","
                          cleanable={false}
                          {...field}
                        />
                      )}
                      name="timezone"
                      control={control}
                    />
                  </FormRow>
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

export default DateConverterePage;
