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
import CopyIcon from '@rsuite/icons/Copy';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import { useCopy } from '@/hooks/useCopy';
import { useUrlEncode } from '@/components/pages/urlencode/useUrlEncode';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { FormRow } from '@/components/common/Form/FormRow';

export const UrlEncode: React.FC = () => {
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
                    render={({ field }) => <Input as="textarea" rows={20} {...field} ref={null}/>}
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
                <Input name="encode" as="textarea" rows={20} readOnly value={output} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
