'use client';
import { Tabs, Switch } from 'antd';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useDateDiff } from '@/app/date_diff/useDateDiff';
import { DatePicker } from '@/components/common/Form/DatePicker';
import { FormRow } from '@/components/common/Form/FormRow';
import { HorizontalForm } from '@/components/common/Form/HorizontalForm';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

const width = 200;

export const DateDiff: FC = () => {
  const title = '日数計算';
  const { methods, outputs, onChangeInputDate, onChangeInputDateTime } = useDateDiff();

  return (
    <AppLayout>
      <Grid fluid>
        <PageTitle title={title} />
        <Row gutter={5}>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel bordered header={<PanelHeader title="入力" />}>
                <Form fluid layout="horizontal">
                  <Tabs
                    defaultActiveKey="日付"
                    items={[
                      {
                        label: '日付',
                        key: '日付',
                        children: (
                          <DateTab
                            onChangeInputDate={onChangeInputDate}
                            control={methods.control}
                          />
                        ),
                      },
                      {
                        label: '日時',
                        key: '日時',
                        children: (
                          <DateTimeTab
                            onChangeInputDateTime={onChangeInputDateTime}
                            control={methods.control}
                          />
                        ),
                      },
                    ]}
                  />
                </Form>
              </Panel>
              <Panel bordered header={<PanelHeader title="共通設定" />}>
                <Form fluid layout="horizontal">
                  <FormRow label="少数">
                    <Controller
                      render={({ field: { ref, ...field } }) => <Switch {...field} />}
                      name="isFormatFloat"
                      control={methods.control}
                    />
                  </FormRow>
                </Form>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header={<PanelHeader title="出力" />}>
              <HorizontalForm>
                <LabelInput label="年" value={outputs.year} />
                <LabelInput label="月" value={outputs.month} />
                <LabelInput label="日" value={outputs.day} />
                <LabelInput label="時間" value={outputs.hour} />
                <LabelInput label="分" value={outputs.minute} />
                <LabelInput label="秒" value={outputs.second} />
                <LabelInput label="週" value={outputs.week} />
                <LabelInput label="経過日時" value={outputs.elapsedDays} />
                <LabelInput label="経過時間" value={outputs.elapsedTime} />
              </HorizontalForm>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

export const DateTab: FC<{ onChangeInputDate: any; control: any }> = ({
  onChangeInputDate,
  control,
}) => {
  return (
    <>
      <FormRow label="開始日付">
        <Controller
          render={({ field }) => (
            <DatePicker
              {...field}
              style={{ width }}
              format="YYYY-MM-DD"
              showTime={false}
              onChange={onChangeInputDate('inputDate1')}
            />
          )}
          name="inputDate1"
          control={control}
        />
      </FormRow>
      <FormRow label="終了日付">
        <Controller
          render={({ field: { ref, ...field } }) => (
            <DatePicker
              {...field}
              style={{ width }}
              format="YYYY-MM-DD"
              showTime={false}
              onChange={onChangeInputDate('inputDate2')}
            />
          )}
          name="inputDate2"
          control={control}
        />
      </FormRow>
    </>
  );
};

export const DateTimeTab: FC<{ onChangeInputDateTime: any; control: any }> = ({
  onChangeInputDateTime,
  control,
}) => {
  return (
    <>
      <FormRow label="開始日時">
        <Controller
          render={({ field: { ref, ...field } }) => (
            <DatePicker
              {...field}
              style={{ width }}
              onChange={onChangeInputDateTime('inputDate1')}
            />
          )}
          name="inputDate1"
          control={control}
        />
      </FormRow>
      <FormRow label="終了日時">
        <Controller
          render={({ field }) => (
            <DatePicker
              {...field}
              style={{ width }}
              onChange={onChangeInputDateTime('inputDate2')}
            />
          )}
          name="inputDate2"
          control={control}
        />
      </FormRow>
    </>
  );
};
