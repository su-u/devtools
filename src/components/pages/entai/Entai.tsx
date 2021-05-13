import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Col,
  Grid,
  Icon,
  Input,
  Panel,
  Row,
  DatePicker,
  InputGroup,
  InputNumber,
  DateRangePicker
} from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { PageTitle } from '@/components/PageTitle';
import styles from './styles/entai.module.scss';
import { entaiCalculate } from './lib/entaiCalculate';

export const Entai: React.VFC = () => {
  const { control, watch } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const [kigen, setKigen] = useState([]);

  const value = entaiCalculate(watch('input'), kigen[0], kigen[1]);
  console.log(kigen);

  return (
    <AppLayout>
      <Grid>
        <Row>
          <Col sm={24}>
            <PageTitle title="国税-延滞税"/>
          </Col>
        </Row>
        <Row className={styles.input}>
          <Col sm={12}>
            <Row>
              <DateRangePicker style={{ width: 280 }} onChange={(v) => setKigen(v)}/>
            </Row>
            <Row>
              <DateRangePicker style={{ width: 280 }} />
            </Row>
            <Row>
              <Controller
                as={<InputNumber postfix="￥" style={{ width: 280 }} />}
                name="input"
                control={control}
                defaultValue={0}
              />
              <Controller
                as={<InputNumber postfix="￥" style={{ width: 280 }} />}
                name="input"
                control={control}
                defaultValue={0}
              />
            </Row>
          </Col>
          <Col sm={12}>
            <Panel className={styles.panel} bordered header="延滞税">
              <Input
                componentClass="textarea"
                rows={3}
                readOnly
                value={value}
              />
              <Button appearance="primary">コピー</Button>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

