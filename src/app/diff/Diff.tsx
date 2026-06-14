'use client';
import React, { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Grid, Panel, PanelGroup, Row } from '@/components/common/layout';
import { AppLayout } from '@/Layout/App';
import { DiffEditor } from '@/app/diff/DiffEditor';
import { useDiff } from '@/app/diff/useDiff';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const Diff: FC = () => {
  const title = 'テキスト差分';
  const {
    methods,
    getOriginal,
    getModified,
    onChangeOriginal,
    onChangeModified,
    handleReady,
    clearOriginal,
    clearModified,
  } = useDiff();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row>
            <Col xs={24}>
              <PanelGroup bordered>
                <Panel
                  bordered
                  header={
                    <PanelHeader
                      title="テキスト差分"
                      right={
                        <ButtonToolbar>
                          <ClearButton name="original" title="左をクリア" onClick={clearOriginal} />
                          <ClearButton name="modified" title="右をクリア" onClick={clearModified} />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <DiffEditor
                    getOriginal={getOriginal}
                    getModified={getModified}
                    onChangeOriginal={onChangeOriginal}
                    onChangeModified={onChangeModified}
                    onReady={handleReady}
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
