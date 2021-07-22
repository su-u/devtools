import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Grid, Icon, Input, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { PageTitle } from '@/components/PageTitle';
import styles from './punycode.module.scss';

type PunycodeForm = {
  input: string;
}

export const Punycode: React.VFC = () => {
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
    <AppLayout>
      <Grid fluid>
        <Row>
          <Col xs={24}>
            <PageTitle title="punycode変換（日本語ドメイン変換）"/>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={12}>
            <Controller
              as={<Input className={styles.textarea} componentClass="textarea" rows={19}/>}
              name="input"
              control={control}
              defaultValue=""
            />
          </Col>
          <Col xs={12} className={styles.converted}>
            <Panel bordered header="ドメイン変換">
              <InputGroup>
                <Input
                  className={styles.textarea}
                  componentClass="textarea"
                  rows={4}
                  readOnly
                  value={converted_ascii}
                />
                <InputGroup.Button onClick={() => converted_ascii && navigator.clipboard.writeText(converted_ascii)}>
                  <Icon icon="copy-o"/>
                </InputGroup.Button>
              </InputGroup>
            </Panel>
            <Panel bordered header="punycode変換">
              <InputGroup>
                <Input
                  className={styles.textarea}
                  componentClass="textarea"
                  rows={4}
                  readOnly
                  value={converted_punycode}
                />
                <InputGroup.Button onClick={() => converted_punycode && navigator.clipboard.writeText(converted_punycode)}>
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

