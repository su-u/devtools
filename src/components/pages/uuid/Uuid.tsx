import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import {
  Col,
  Grid,
  Panel,
  Row,
  PanelGroup,
  Form,
  Toggle,
  InputPicker,
} from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useUuid } from '@/components/pages/uuid/useUuid';
import { InputNumber } from 'rsuite';
import { FormRow } from '@/components/common/Form/FormRow';

export const Uuid: React.FC = () => {
  const title = 'UUIDの生成';
  const { methods, selectData, control } = useUuid();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
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
                          <InputPicker
                            data={selectData}
                            size="sm"
                            defaultValue={5}
                            cleanable={false}
                            {...field}
                          />
                        )}
                        name="version"
                        control={control}
                      />
                    </FormRow>
                    <FormRow label="ハイフン">
                      <Controller
                        render={({ field }) => <Toggle defaultChecked {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </FormRow>
                    <FormRow label="大文字">
                      <Controller
                        render={({ field }) => <Toggle {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </FormRow>
                  </Panel>
                  <Panel bordered header={<PanelHeader title="生成" />}>
                    <FormRow label="エンコード">
                      <Controller
                        render={({ field }) => (
                          <InputNumber size="sm" defaultValue={1} min={1} {...field} />
                        )}
                        name="generateCount"
                        control={control}
                      />
                    </FormRow>
                  </Panel>
                </PanelGroup>
              </Form>
            </Col>
            <Col md={12} xs={24}>
              <Panel bordered header={<PanelHeader title="UUID" />}>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
