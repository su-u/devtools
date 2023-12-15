'use client';
import CopyIcon from '@rsuite/icons/Copy';
import { Space } from 'antd';
import { toASCII, encode } from 'punycode/';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, InputGroup, Panel, PanelGroup, Row, ButtonToolbar } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { Editor } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { Input } from '@/components/common/Form/Input';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';

type PunycodeForm = {
  input: string;
};

export const Punycode: FC = () => {
  const title = 'punycode変換（日本語ドメイン変換）';
  const methods = useCustomForm<PunycodeForm>({
    defaultValues: {
      input: '',
    },
  });
  const { control, watch } = methods;
  const { copy } = useCopy();

  const converted_ascii = toASCII(watch('input', ''));
  const converted_punycode = encode(watch('input', ''));

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="変換する文字列"
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
                  control={control}
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel header={<PanelHeader title="ドメイン変換" />}>
                  <Space.Compact block>
                    <Input readOnly value={converted_ascii} />
                    <CopyButton copyText={converted_punycode} />
                  </Space.Compact>
                </Panel>
                <Panel header={<PanelHeader title="punycode変換" />}>
                  <Space.Compact block>
                    <Input readOnly value={converted_punycode} />
                    <CopyButton copyText={converted_punycode} />
                  </Space.Compact>
                </Panel>
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
