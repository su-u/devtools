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

export const Diff: React.VFC = () => {
  const title = 'テキスト差分';
  const { methods, original, modified } = useDiff();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <Row>
            <Col xs={24}>
              <PageTitle title={title} />
            </Col>
          </Row>
          <Row gutter={10}>
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
                    render={({ field }) => <Input as="textarea" rows={15} {...field} />}
                    name="original"
                    control={methods.control}
                    defaultValue=""
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
                  render={({ field }) => <Input as="textarea" rows={15} {...field} />}
                  name="modified"
                  control={methods.control}
                  defaultValue=""
                />
              </Panel>
            </Col>
          </Row>
          <Row>
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
