import React from 'react';
import { Controller } from 'react-hook-form';
import { Col, Grid, Panel, Row, Form, Toggle } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { Input } from '@/components/common/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';
import { useCopy } from '@/hooks/useCopy';
import { PanelGroup } from 'rsuite';
import { useHash } from '@/components/pages/hash/useHash';
import { InputGroup } from 'rsuite';
import { ConfigLabel } from '@/components/common/ConfigForm';
import { OutputLineForm, OutputLabel } from '@/components/common/OutputLineForm';
import { ButtonToolbar } from 'rsuite';
import { IconButton } from 'rsuite';
import TrashOIcon from '@rsuite/icons/legacy/TrashO';

export const Hash: React.VFC = () => {
  const title = 'ハッシュ';
  const { control, input, algorithmList, createHash, onClickInputClear } = useHash();

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
                    title="入力"
                    right={
                      <ButtonToolbar>
                        <IconButton
                          icon={<TrashOIcon />}
                          placement="right"
                          size="xs"
                          onClick={onClickInputClear}
                        >
                          クリア
                        </IconButton>
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Controller
                  render={({ field }) => <Input as="textarea" rows={14} {...field} />}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header={<PanelHeader title="設定" />}>
                <Form fluid layout="horizontal">
                  <Form.Group>
                    <ConfigLabel>大文字</ConfigLabel>
                    <Controller
                      render={({ field }) => <Toggle {...field} />}
                      name="isUppercase"
                      control={control}
                    />
                  </Form.Group>
                </Form>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header={<PanelHeader title="ハッシュ値" />}>
              <OutputLineForm layout="horizontal">
                {algorithmList.map(({ label, value }) => {
                  return <OutputLine label={label} value={createHash(value, input)} />;
                })}
              </OutputLineForm>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

const OutputLine: React.VFC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  const { copy } = useCopy();

  return (
    <Form.Group>
      <InputGroup>
        <OutputLabel>{label}</OutputLabel>
        <Input noResize="none" readOnly value={value} />
        <InputGroup.Button onClick={copy(value)} size="sm">
          <CopyIcon />
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
  );
};
