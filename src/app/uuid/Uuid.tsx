'use client';
import { Switch, Space } from 'antd';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row, PanelGroup, Form, Button, ButtonToolbar } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useUuid } from '@/app/uuid/useUuid';
import { CopyButton } from '@/components/common/CopyButton';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { InputNumber } from '@/components/common/Form/InputNumber';
import { Select } from '@/components/common/Form/Select';
import { TextArea } from '@/components/common/Form/TextArea';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';

export const Uuid: FC = () => {
  const title = 'UUIDの生成';
  const {
    methods,
    selectData,
    control,
    output,
    onClickGenerateUUID,
    DEFAULT_VALUES,
    version,
    onClickClear,
  } = useUuid();
  const { copy } = useCopy();

  const requireName = version === 3 || version === 5;

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col md={12} xs={24}>
              <Form fluid layout="horizontal">
                <PanelGroup bordered>
                  <Panel bordered header={<PanelHeader title="設定" />}>
                    <FormRow label="バージョン">
                      <Controller
                        render={({ field }) => (
                          <Select
                            style={{ width: 250 }}
                            options={selectData}
                            defaultValue={DEFAULT_VALUES.version}
                            {...field}
                          />
                        )}
                        name="version"
                        control={control}
                      />
                    </FormRow>
                    <FormRow label="ハイフン">
                      <Controller
                        render={({ field }) => (
                          <Switch defaultChecked={DEFAULT_VALUES.isHyphen} {...field} />
                        )}
                        name="isHyphen"
                        control={methods.control}
                      />
                    </FormRow>
                    <FormRow label="大文字">
                      <Controller
                        render={({ field }) => (
                          <Switch defaultChecked={DEFAULT_VALUES.isUppercase} {...field} />
                        )}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </FormRow>
                    {requireName && (
                      <FormRow label="name">
                        <Controller
                          render={({ field }) => <Input noResize="none" {...field} />}
                          name="UUIDName"
                          control={control}
                        />
                      </FormRow>
                    )}
                    {requireName && (
                      <FormRow label="namespace">
                        <Controller
                          render={({ field }) => <Input noResize="none" {...field} />}
                          name="UUIDNamespace"
                          control={control}
                        />
                      </FormRow>
                    )}
                  </Panel>
                  <Panel bordered header={<PanelHeader title="生成" />}>
                    <FormRow label="生成数">
                      <Controller
                        render={({ field }) => (
                          <InputNumber
                            style={{ width: 250 }}
                            defaultValue={DEFAULT_VALUES.generateCount}
                            min={1}
                            max={100000}
                            {...field}
                          />
                        )}
                        name="generateCount"
                        control={control}
                      />
                    </FormRow>
                    <Button appearance="primary" onClick={onClickGenerateUUID}>
                      UUIDの生成
                    </Button>
                  </Panel>
                </PanelGroup>
              </Form>
            </Col>
            <Col md={12} xs={24}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="UUID"
                    right={
                      <Space.Compact block>
                        <CopyButton copyText={output} size="small" />
                        <ClearButton name="output" onClick={onClickClear} />
                      </Space.Compact>
                    }
                  />
                }
              >
                <TextArea value={output} readOnly rows={14} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
