'use client';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row, FlexboxGrid } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { DiffEditor } from '@/components/pages/diff/DiffEditor';
import { useDiff } from '@/components/pages/diff/useDiff';
import { ButtonToolbar } from 'rsuite';
import { ClearButton } from '@/components/common/Form/ClearButton';

export const Diff: React.FC = () => {
  const title = 'テキスト差分';
  const { methods, original, modified, onClickOriginalReset } = useDiff();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />
          <Row style={{ marginTop: '5px' }}>
            <Col xs={24}>
              <PanelGroup bordered>
                <Panel collapsible={false} bordered header={<PanelHeader title="差分" />}>
                  <Row>
                    <Col xs={12}>
                      <FlexboxGrid justify="end">
                        <ButtonToolbar>
                          {/*<ClearButton name="original" onClick={onClickOriginalReset} />*/}
                        </ButtonToolbar>
                      </FlexboxGrid>
                    </Col>
                    <Col xs={12}>
                      <FlexboxGrid justify="end">
                        <ButtonToolbar>{/*<ClearButton name="modified" />*/}</ButtonToolbar>
                      </FlexboxGrid>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '10px' }}>
                    <DiffEditor original={original} modified={modified} />
                  </Row>
                </Panel>
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
