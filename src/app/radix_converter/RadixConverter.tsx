'use client';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, Form } from '@/components/common/layout';
import { AppLayout } from '@/Layout/App';
import {
  useRadixConverter,
  DEFAULT_VALUES,
  BASE_OPTIONS,
} from '@/app/radix_converter/useRadixConverter';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { Select } from '@/components/common/Form/Select';
import { InputListForm } from '@/components/common/Form/InputListForm';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const RadixConverter: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const { methods, result, error, baseOptions } = useRadixConverter();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} description={description} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  bordered
                  header={<PanelHeader title="入力値" right={<ClearButton name="input" />} />}
                >
                  <Controller
                    render={({ field: { ref, ...field } }) => (
                      <Input noResize="none" placeholder="変換する値を入力" {...field} />
                    )}
                    name="input"
                    control={methods.control}
                    defaultValue={DEFAULT_VALUES.input}
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <Form fluid layout="horizontal">
                    <FormRow label="入力の基数">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <Select
                            style={{ width: '100%', maxWidth: 250 }}
                            options={baseOptions}
                            defaultValue={DEFAULT_VALUES.base}
                            {...field}
                          />
                        )}
                        name="base"
                        control={methods.control}
                      />
                    </FormRow>
                  </Form>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="変換結果" />}>
                {error ? (
                  <ErrorText>{error}</ErrorText>
                ) : (
                  <InputListForm>
                    <LabelInput label="2進数" value={result.bin} />
                    <LabelInput label="8進数" value={result.oct} />
                    <LabelInput label="10進数" value={result.dec} />
                    <LabelInput label="16進数" value={result.hex} />
                  </InputListForm>
                )}
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const ErrorText: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ color: '#ff7875', margin: 0 }}>{children}</p>
);
