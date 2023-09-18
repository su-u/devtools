import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row, PanelGroup, Form, Toggle, InputPicker } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useUuid } from '@/components/pages/uuid/useUuid';
import { InputNumber } from 'rsuite';
import { FormRow } from '@/components/common/Form/FormRow';
import { Button } from 'rsuite';
import { Input } from '@/components/common/Form/Input';
import { InputGroup } from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import { useCopy } from '@/hooks/useCopy';

export const Uuid: React.FC = () => {
  const title = 'UUIDの生成';
  const { methods, selectData, control, output, onClickGenerateUUID, DEFAULT_VALUES } = useUuid();
  const { copy } = useCopy();


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
                            defaultValue={DEFAULT_VALUES.version}
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
                        render={({ field }) => <Toggle defaultChecked={DEFAULT_VALUES.isHyphen} {...field} />}
                        name="isHyphen"
                        control={methods.control}
                      />
                    </FormRow>
                    <FormRow label="大文字">
                      <Controller
                        render={({ field }) => <Toggle defaultChecked={DEFAULT_VALUES.isUppercase} {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </FormRow>
                  </Panel>
                  <Panel bordered header={<PanelHeader title="生成" />}>
                    <FormRow label="エンコード">
                      <Controller
                        render={({ field }) => (
                          <InputNumber size="sm" defaultValue={DEFAULT_VALUES.generateCount} min={1} {...field} />
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
              <Panel bordered header={<PanelHeader title="UUID" />}>
                <InputGroup>
                  <Input value={output} as="textarea" readOnly rows={15} noResize="none" />
                  <InputGroup.Button onClick={copy(output)}>
                    <CopyIcon />
                  </InputGroup.Button>
                </InputGroup>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
