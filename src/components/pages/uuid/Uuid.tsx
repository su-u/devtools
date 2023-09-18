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
  ButtonToolbar,
  InputGroup,
  InputPicker,
} from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';
import { ConfigLabel } from '@/components/common/Form/ConfigForm';
import { OutputLineForm, OutputLabel } from '@/components/common/Form/OutputLineForm';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { useUuid } from '@/components/pages/uuid/useUuid';
import { InputNumber } from 'rsuite';
import { FormRow } from '@/components/common/Form/FormRow';

export const Uuid: React.FC = () => {
  const title = 'UUIDの生成';
  const { methods, input, algorithmList, createHash, selectData, control } = useUuid();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />

          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Form fluid layout="horizontal">
                  <Panel
                    bordered
                    header={
                      <PanelHeader
                        title="設定"
                        right={
                          <ButtonToolbar>
                            <ClearButton name="input" />
                          </ButtonToolbar>
                        }
                      />
                    }
                  >
                    <Form.Group>
                      <ConfigLabel>大文字</ConfigLabel>
                      <Controller
                        render={({ field }) => (
                          <InputPicker
                            data={selectData}
                            size="sm"
                            defaultValue={1}
                            cleanable={false}
                            {...field}
                          />
                        )}
                        name="version"
                        control={control}
                        defaultValue={1}
                      />
                    </Form.Group>
                    <Form.Group>
                      <ConfigLabel>ハイフン</ConfigLabel>
                      <Controller
                        render={({ field }) => <Toggle {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </Form.Group>
                    <Form.Group>
                      <ConfigLabel>大文字</ConfigLabel>
                      <Controller
                        render={({ field }) => <Toggle {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </Form.Group>
                  </Panel>
                  <Panel bordered header={<PanelHeader title="生成" />}>
                    <FormRow label="エンコード">
                      <Controller
                        render={({ field }) => (
                          <InputNumber size="sm" defaultValue={1} {...field} />
                        )}
                        name="generateCount"
                        control={control}
                        defaultValue={1}
                      />
                    </FormRow>
                  </Panel>
                </Form>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="ハッシュ値" />}>
                <OutputLineForm layout="horizontal">
                  {algorithmList.map(({ label, value }) => {
                    return <OutputLine label={label} value={createHash(value, input)} />;
                  })}
                </OutputLineForm>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const OutputLine: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  const { copy } = useCopy();

  return (
    <Form.Group>
      <InputGroup>
        <OutputLabel>{label}</OutputLabel>
        <Input noResize="none" size="sm" readOnly value={value} />
        <InputGroup.Button onClick={copy(value)} size="sm">
          <CopyIcon />
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
  );
};
