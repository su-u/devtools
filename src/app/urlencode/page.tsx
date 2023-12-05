'use client';
import CopyIcon from '@rsuite/icons/Copy';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
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
import { useUrlEncode } from '@/app/urlencode/useUrlEncode';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { FormRow } from '@/components/common/Form/FormRow';
import { Input } from '@/components/common/Form/Input';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';
import { Editor } from '@/components/common/Editor';

const UrlEncodePage: React.FC = () => {
  const title = 'URLエンコード';
  const { methods, output, encodingList } = useUrlEncode();
  const { copy } = useCopy();

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
                      title="入力"
                      right={
                        <ButtonToolbar>
                          <ClearButton name="input" />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <Controller
                    render={({ field }) => <Editor {...field} />}
                    name="input"
                    control={methods.control}
                  />
                </Panel>
                <Panel bordered header={<PanelHeader title="設定" />}>
                  <Form fluid layout="horizontal">
                    <FormRow label="エンコード">
                      <Controller
                        render={({ field }) => (
                          <SelectPicker
                            data={encodingList}
                            size="sm"
                            groupBy="category"
                            placement="autoVerticalStart"
                            cleanable={false}
                            style={{ width: 224 }}
                            {...field}
                            ref={null}
                          />
                        )}
                        name="encoding"
                        control={methods.control}
                      />
                    </FormRow>
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
                <Editor value={output} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

export default UrlEncodePage;
