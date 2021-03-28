import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Col, Grid, Icon, Input, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { PageTitle } from '@/components/PageTitle';
import styles from '@/styles/components/pages/punycode.module.scss';

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
      <Grid>
        <Row>
          <Col sm={24}>
            <PageTitle title="punycode変換（日本語ドメイン変換）" />
          </Col>
        </Row>
        <Row className={styles.input}>
          <Col sm={24}>
            <Controller
              as={<Input componentClass="textarea" rows={4} />}
              name="input"
              control={control}
              defaultValue=""
            />
          </Col>
          <Col className={styles.icon} sm={24}>
            <Icon icon="long-arrow-down" size="4x" />
          </Col>
        </Row>
        <Row>
          <Col className={styles.converted} sm={24}>
            <Panel className={styles.panel} bordered header="ドメイン変換">
              <Input
                componentClass="textarea"
                rows={3}
                readOnly
                value={punycode.toASCII(watch('input') ?? '')}
              />
              <Button appearance="primary">コピー</Button>
            </Panel>
            <Panel className={styles.panel} bordered header="punycode変換">
              <Input
                componentClass="textarea"
                rows={3}
                readOnly
                value={punycode.encode(watch('input') ?? '')}
              />
              <Button appearance="primary">コピー</Button>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

export default Punycode;
