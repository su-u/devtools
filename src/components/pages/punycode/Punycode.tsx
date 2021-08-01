import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Grid, Icon, Input, InputGroup, Panel, PanelGroup, Row } from 'rsuite';
import punycode from 'punycode/';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import commonStyles from '@/styles/components/Common.module.scss';
import { copy } from '@/lib/copy';

type PunycodeForm = {
  input: string;
}

export const Punycode: React.VFC = () => {
  const title = 'punycode変換（日本語ドメイン変換）';
  const { control, watch } = useForm<PunycodeForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const converted_ascii = punycode.toASCII(watch('input') ?? '');
  const converted_punycode = punycode.encode(watch('input') ?? '');

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <Row>
          <Col xs={24}>
            <PageTitle title={title}/>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} md={12}>
            <Panel bordered header="変換する文字列">
              <Controller
                as={<Input className={commonStyles.no_resize} componentClass="textarea" rows={14}/>}
                name="input"
                control={control}
                defaultValue=""
              />
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <PanelGroup bordered>
              <Panel header="ドメイン変換">
                <InputGroup>
                  <Input
                    className={commonStyles.no_resize}
                    componentClass="textarea"
                    rows={4}
                    readOnly
                    value={converted_ascii}
                  />
                  <InputGroup.Button onClick={copy(converted_ascii)}>
                    <Icon icon="copy-o"/>
                  </InputGroup.Button>
                </InputGroup>
              </Panel>
              <Panel header="punycode変換">
                <InputGroup>
                  <Input
                    className={commonStyles.no_resize}
                    componentClass="textarea"
                    rows={4}
                    readOnly
                    value={converted_punycode}
                  />
                  <InputGroup.Button onClick={copy(converted_punycode)}>
                    <Icon icon="copy-o"/>
                  </InputGroup.Button>
                </InputGroup>
              </Panel>
            </PanelGroup>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

