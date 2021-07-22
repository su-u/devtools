import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, ControlLabel, Form, FormGroup, Grid, Icon, Input, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import styles from './characterCount.module.scss';
import {
  characterCountWithoutSpace,
  characterCountWithSpace, linesCount,
  spaceCount
} from '@/components/pages/character_count/CharacterCountLib';

type characterCountForm = {
  input: string;
}

export const CharacterCount: React.VFC = () => {
  const { control, watch } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const input = watch('input') ?? '';

  const characterCountValue = characterCountWithSpace(input).toString();
  const characterCountWithoutSpaceValue = characterCountWithoutSpace(input).toString();
  const spaceCharacterCountValue = spaceCount(input).toString();
  const linesCountValue = linesCount(input).toString();

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
          <Col xs={12}>
            <Panel bordered header="文字数">
              <Form className={styles.converted_form} layout="horizontal">
                <InputLine label="文字数（スペース込み）" value={characterCountValue}/>
                <InputLine label="文字数（スペース除外）" value={characterCountWithoutSpaceValue}/>
                <InputLine label="スペースの数" value={spaceCharacterCountValue}/>
                <InputLine label="行数" value={linesCountValue}/>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

const InputLine: React.VFC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <FormGroup>
      <InputGroup>
        <ControlLabel className={styles.label}>{label}</ControlLabel>
        <Input
          className={styles.textarea}
          readOnly
          value={value}
        />
        <InputGroup.Button onClick={() => value && navigator.clipboard.writeText(value)}>
          <Icon icon="copy-o"/>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  )
}