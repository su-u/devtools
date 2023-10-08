'use client';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Grid, Panel, PanelGroup, Row, FlexboxGrid } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { DiffEditor } from '@/components/pages/diff/DiffEditor';
import { useDiff } from '@/components/pages/diff/useDiff';
import { Input } from '@/components/common/Form/Input';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { fa } from '@faker-js/faker';

export const Diff: React.FC = () => {
  const title = 'テキスト差分';
  const { methods, original, modified } = useDiff();
  const INPUT_ROWS = 10;

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />
          <Row style={{ marginTop: '5px' }}>
            <Col xs={24}>
              <PanelGroup bordered>
                <Panel collapsible={false} bordered header={<PanelHeader title="差分" />}>
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
