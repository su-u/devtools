import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Col,
  Grid,
  Panel,
  Row,
  Form,
  ButtonToolbar,
  IconButton,
  PanelGroup,
  SelectPicker,
} from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { Input } from '@/components/common/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';
import { useCopy } from '@/hooks/useCopy';
import { useUrlEncode } from '@/components/pages/urlencode/useUrlEncode';
import { ConfigLabel } from '@/components/common/ConfigForm';

export const UrlEncode: React.VFC = () => {
  const title = 'URLエンコード';
  const { control, output, encodingList } = useUrlEncode();
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
            <PanelGroup bordered>
              <Panel bordered header={<PanelHeader title="デコード" />}>
                <Controller
                  render={({ field }) => <Input as="textarea" rows={20} {...field} />}
                  name="decode"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header={<PanelHeader title="設定" />}>
                <Form fluid layout="horizontal">
                  <Form.Group>
                    <ConfigLabel>エンコード</ConfigLabel>
                    <Controller
                      render={({ field }) => (
                        <SelectPicker
                          data={encodingList}
                          size="sm"
                          groupBy="category"
                          placement="autoVerticalStart"
                          style={{ width: 224 }}
                          {...field}
                        />
                      )}
                      name="encoding"
                      control={control}
                      defaultValue={encodingList[0].value}
                    />
                  </Form.Group>
                </Form>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel
              bordered
              header={
                <PanelHeader
                  title="エンコード"
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
              <Input name="encode" as="textarea" rows={20} readOnly value={output} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};
