import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row, IconButton, ButtonToolbar } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useBase64 } from '@/components/pages/base64/useBase64';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';
import { useCopy } from '@/hooks/useCopy';
import { ClearButton } from '@/components/common/Form/ClearButton';

export const Base64: React.FC = () => {
  const title = 'base64エンコード';
  const { methods, output } = useBase64();
  const { copy } = useCopy();

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
                  render={({ field }) => <Input as="textarea" rows={20} {...field} />}
                  name="input"
                  control={methods.control}
                  defaultValue=""
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
                        <IconButton
                          icon={<CopyIcon />}
                          placement="right"
                          size="xs"
                          onClick={copy(output)}
                        ></IconButton>
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
