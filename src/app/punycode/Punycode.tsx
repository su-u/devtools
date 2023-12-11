'use client';
import CopyIcon from '@rsuite/icons/Copy';
import { toASCII, encode } from 'punycode/';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, InputGroup, Panel, PanelGroup, Row, ButtonToolbar } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { Editor } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
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
                  <InputGroup>
                    <Input
                      noResize="none"
                      as="textarea"
                      rows={4}
                      readOnly
                      value={converted_ascii}
                    />
                    <InputGroup.Button onClick={copy(converted_ascii)}>
                      <CopyIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </Panel>
                <Panel header={<PanelHeader title="punycode変換" />}>
                  <InputGroup>
                    <Input
                      noResize="none"
                      as="textarea"
                      rows={4}
                      readOnly
                      value={converted_punycode}
                    />
                    <InputGroup.Button onClick={copy(converted_punycode)}>
                      <CopyIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </Panel>
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
