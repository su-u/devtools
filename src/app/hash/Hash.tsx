'use client';
import CopyIcon from '@rsuite/icons/Copy';
import { Switch } from 'antd';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row, PanelGroup, Form, ButtonToolbar, InputGroup } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useHash } from '@/app/hash/useHash';
import { Editor } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { OutputLineForm, OutputLabel } from '@/components/common/Form/OutputLineForm';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';

export const Hash: FC = () => {
  const title = 'ハッシュ';
  const { methods, input, algorithmList, createHash } = useHash();

  return (
    <FormProvider {...methods}>
      <AppLayout>
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
                    render={({ field }) => <Editor {...field} />}
                    name="input"
                    control={methods.control}
                    defaultValue=""
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <Form fluid layout="horizontal">
                    <FormRow label="大文字">
                      <Controller
                        render={({ field }) => <Switch {...field} />}
                        name="isUppercase"
                        control={methods.control}
                      />
                    </FormRow>
                  </Form>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="ハッシュ値" />}>
                <OutputLineForm layout="horizontal">
                  {algorithmList.map(({ label, value }) => {
                    return (
                      <OutputLine key={label} label={label} value={createHash(value, input)} />
                    );
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

const OutputLine: FC<{
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
