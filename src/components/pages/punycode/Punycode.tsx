import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Col, Grid, Icon, Input, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { PageTitle } from '@/components/PageTitle';
import styles from './styles/punycode.module.scss';

const Punycode: React.VFC = () => {
  const { control, watch } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

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
                  value={punycode.toASCII(watch('input') ?? '')}
                />
                <InputGroup.Button>
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
                  value={punycode.encode(watch('input') ?? '')}
                />
                <InputGroup.Button>
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

export default Punycode;
