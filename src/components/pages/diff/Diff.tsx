import React from 'react';
import { ButtonToolbar, Col, Grid, IconButton, Panel, PanelGroup, Row } from 'rsuite';
import TrashOIcon from '@rsuite/icons/legacy/TrashO';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import { Editor } from '@/components/common/Editor';
import { PanelHeader } from '@/components/common/PanelHeader';
import { DiffEditor } from '@/components/pages/diff/DiffEditor';
import { useDiff } from '@/components/pages/diff/useDiff';

export const Diff: React.VFC = () => {
  const title = 'テキスト差分';
  const { onChange, original, modified, onClickInputClear } = useDiff();

  return (
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
                        <IconButton
                          icon={<TrashOIcon />}
                          placement="right"
                          onClick={onClickInputClear('original')}
                        >
                          クリア
                        </IconButton>
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Editor
                  onChange={onChange('original')}
                  value={original}
                  width="100%"
                  options={{
                    fontSize: '14px',
                    tabSize: 2,
                  }}
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
                      <IconButton
                        icon={<TrashOIcon />}
                        placement="right"
                        onClick={onClickInputClear('modified')}
                      >
                        クリア
                      </IconButton>
                    </ButtonToolbar>
                  }
                />
              }
            >
              <Editor
                onChange={onChange('modified')}
                width="100%"
                value={modified}
                options={{
                  fontSize: '14px',
                  tabSize: 2,
                }}
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
  );
};
