import React from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useBase64 } from '@/components/pages/base64/useBase64';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import { ButtonToolbar } from 'rsuite';
import { IconButton } from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import { useCopy } from '@/hooks/useCopy';

export const Base64: React.VFC = () => {
  const title = 'base64エンコード';
  const { control, output } = useBase64();
  const { copy } = useCopy();

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
            <Panel bordered header={<PanelHeader title="入力文字" />}>
              <Controller
                render={({ field }) => <Input as="textarea" rows={20} {...field} />}
                name="input"
                control={control}
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
  );
};
