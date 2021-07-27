import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Grid, Icon, Input, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { PageTitle } from '@/components/PageTitle';
import styles from './punycode.module.scss';
import commonStyles from '@/styles/components/Common.module.scss';
import { copy } from '@/lib/copy';

type PunycodeForm = {
  input: string;
}

export const Punycode: React.VFC = () => {
  const title = 'punycode変換くん（日本語ドメイン変換）';
  const { control, watch } = useForm<PunycodeForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
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
          <Col xs={12}>
            <Panel bordered header="変換する文字列">
              <Controller
                as={<Input className={commonStyles.no_resize} componentClass="textarea" rows={14}/>}
                name="input"
                control={control}
                defaultValue=""
              />
            </Panel>
          </Col>
          <Col xs={12} className={styles.converted}>
            <Panel bordered header="ドメイン変換">
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
            <Panel bordered header="punycode変換">
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
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

