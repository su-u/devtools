'use client';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form } from 'rsuite';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AppLayout } from '@/Layout/App';
import { useDateConverter } from '@/app/datetime_converter/useDateConverter';
import { DatePicker } from '@/components/common/Form/DatePicker';
import { FormRow } from '@/components/common/Form/FormRow';
import { HorizontalForm } from '@/components/common/Form/HorizontalForm';
import { Input } from '@/components/common/Form/Input';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { Select } from '@/components/common/Form/Select';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

const width = 300;

export const DateTimeConverter: FC = () => {
  const title = '日時->日時変換';
  const {
    methods,
    control,
    output,
    timezones,
    onChangeInputDate,
    onChangeInputUnixTime,
    onChangeTimezone,
    onChangeCustomFormat,
  } = useDateConverter();
  const { inputUnixTime, timezone } = methods.getValues();

  return (
    <AppLayout>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel bordered header={<PanelHeader title="入力" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="日時">
                    <Controller
                      render={() => <DatePicker style={{ width }} onChange={onChangeInputDate} />}
                      name="inputDate"
                      control={control}
                    />
                  </FormRow>
                  <FormRow label="unixtime">
                    <Controller
                      render={() => (
                        <Input
                          style={{ width }}
                          onChange={onChangeInputUnixTime}
                          value={inputUnixTime}
                        />
                      )}
                      name="inputUnixTime"
                      control={control}
                    />
                  </FormRow>
                </Form>
              </Panel>
              <Panel bordered header={<PanelHeader title="共通設定" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="TimeZone">
                    <Controller
                      render={() => (
                        <Select
                          style={{ width }}
                          options={timezones}
                          onChange={onChangeTimezone}
                          value={timezone}
                          showSearch
                        />
                      )}
                      name="timezone"
                      control={control}
                    />
                  </FormRow>
                  <FormRow
                    label={
                      <>
                        カスタム出力
                        <a
                          href="https://day.js.org/docs/en/display/format"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '4px' }}
                        >
                          <QuestionCircleOutlined />
                        </a>
                      </>
                    }
                  >
                    <Controller
                      render={() => (
                        <Input style={{ width }} noResize="none" onChange={onChangeCustomFormat} />
                      )}
                      name="customFormat"
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
                <LabelInput label="日付時間(ロング)" value={output.enDatetime} />
                <LabelInput label="日付" value={output.enDate} />
                <LabelInput label="年" value={output.year} />
                <LabelInput label="月" value={output.month} />
                <LabelInput label="日" value={output.d} />
                <LabelInput label="曜日" value={output.week} />
                <LabelInput label="unixtime" value={output.unixTime} />
                <LabelInput label="カスタム" value={output.customFormat} />
                <LabelInput label="TimeZone" value={output.timezone} />
              </HorizontalForm>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};
