import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, ControlLabel, Form, FormGroup, Grid, Icon, Input, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import styles from './character_count.module.scss';

type CharacterFrom = {
  input: string;
}

export const CharacterCount: React.VFC = () => {
  const { control, watch } = useForm<CharacterFrom>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const characterCount = (watch('input') ?? '').length.toString();

  return (
    <AppLayout>
      <Grid fluid>
        <Row>
          <Col xs={24}>
            <PageTitle title="文字数カウント"/>
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
            <Panel bordered header="文字数">
              <Form layout="horizontal">
                <FormGroup>
                  <InputGroup>
                    <ControlLabel>文字数</ControlLabel>
                    <Input
                      className={styles.textarea}
                      rows={4}
                      readOnly
                      value={characterCount}
                    />
                    <InputGroup.Button onClick={() => characterCount && navigator.clipboard.writeText(characterCount)}>
                      <Icon icon="copy-o"/>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};
