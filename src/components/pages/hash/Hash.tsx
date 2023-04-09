import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row, PanelGroup, Form, Toggle, ButtonToolbar, InputGroup } from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';
import { useHash } from '@/components/pages/hash/useHash';
import { ConfigLabel } from '@/components/common/Form/ConfigForm';
import { OutputLineForm, OutputLabel } from '@/components/common/Form/OutputLineForm';
import { ClearButton } from '@/components/common/Form/ClearButton';

export const Hash: React.FC = () => {
  const title = 'ハッシュ';
  const { methods, input, algorithmList, createHash } = useHash();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />

          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  bordered
                  header={
                    <PanelHeader
                      title="入力"
                      right={
                        <ButtonToolbar>
                          <ClearButton name="input" />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <Controller
                    render={({ field }) => <Input as="textarea" rows={14} {...field} />}
                    name="input"
                    control={methods.control}
                    defaultValue=""
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <Form fluid layout="horizontal">
                    <Form.Group>
                      <ConfigLabel>大文字</ConfigLabel>
                      <Controller
                        render={({ field }) => <Toggle {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </Form.Group>
                  </Form>
                </Panel>
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
