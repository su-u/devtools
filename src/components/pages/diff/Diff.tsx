import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Grid, Panel, PanelGroup, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { DiffEditor } from '@/components/pages/diff/DiffEditor';
import { useDiff } from '@/components/pages/diff/useDiff';
import { Input } from '@/components/common/Form/Input';
import { ClearButton } from '@/components/common/Form/ClearButton';

export const Diff: React.FC = () => {
  const title = 'テキスト差分';
  const { methods, original, modified } = useDiff();
  const INPUT_ROWS = 10;

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
                      title="比較対象1"
                      right={
                        <ButtonToolbar>
                          <ClearButton name="original" />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <Controller
                    render={({ field }) => <Input as="textarea" rows={INPUT_ROWS} {...field} />}
                    name="original"
                    control={methods.control}
                  />
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="比較対象2"
                    right={
                      <ButtonToolbar>
                        <ClearButton name="modified" />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Controller
                  render={({ field }) => (
                    <Input as="textarea" rows={INPUT_ROWS} {...field} ref={null} />
                  )}
                  name="modified"
                  control={methods.control}
                />
              </Panel>
            </Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Col xs={24}>
              <PanelGroup bordered>
                <Panel bordered header={<PanelHeader title="差分" right={null} />}>
                  <DiffEditor
                    original={original}
                    modified={modified}
                    width="100%"
                    options={{
                      fontSize: '14px',
                      tabSize: 2,
                    }}
                  />
                </Panel>
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
