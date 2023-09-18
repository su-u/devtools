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
import { ButtonToolbar } from 'rsuite';
import { ClearButton } from '@/components/common/Form/ClearButton';

export const Uuid: React.FC = () => {
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
                        render={({ field }) => (
                          <Toggle defaultChecked={DEFAULT_VALUES.isHyphen} {...field} />
                        )}
                        name="isHyphen"
                        control={methods.control}
                      />
                    </FormRow>
                    <FormRow label="大文字">
                      <Controller
                        render={({ field }) => (
                          <Toggle defaultChecked={DEFAULT_VALUES.isUppercase} {...field} />
                        )}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </FormRow>
                    {requireName && (
                      <FormRow label="name">
                        <Controller
                          render={({ field }) => <Input noResize="none" size="sm" {...field} />}
                          name="UUIDName"
                          control={control}
                        />
                      </FormRow>
                    )}
                    {requireName && (
                      <FormRow label="namespace">
                        <Controller
                          render={({ field }) => <Input noResize="none" size="sm" {...field} />}
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
                            size="sm"
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
                      <ButtonToolbar>
                        <ClearButton name="output" onClick={onClickClear} />
                      </ButtonToolbar>
                    }
                  />
                }
              >
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
