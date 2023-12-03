'use client';
import React from 'react';
import { FormProvider, Controller } from 'react-hook-form';
import { Grid, Row, Col } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { Panel } from 'rsuite';
import { PanelHeader } from '@/components/common/PanelHeader';
import { ButtonToolbar } from 'rsuite';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { Input } from '@/components/common/Form/Input';
import { CopyButton } from '@/components/common/CopyButton';
import { useBase64 } from '@/app/base64/useBase64';

const Base64Page: React.FC = () => {
  const title = 'base64エンコード';
  const { methods, output } = useBase64();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="入力文字"
                    right={
                      <ButtonToolbar>
                        <ClearButton name="input" />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Controller
                  render={({ field }) => <Input as="textarea" rows={20} {...field} ref={null} />}
                  name="input"
                  control={methods.control}
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="base64エンコード"
                    right={
                      <ButtonToolbar>
                        <CopyButton copyText={output} />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Input as="textarea" rows={20} readOnly value={output} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};


export default Base64Page;
