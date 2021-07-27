import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, ControlLabel, Form, FormGroup, Grid, Icon, Input, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import styles from './characterCount.module.scss';
import {
  characterCountWithoutSpace,
  characterCountWithSpace,
  fullWidthCharacterCount,
  halfWidthCharacterCount,
  linesCount,
  spaceCount
} from '@/components/pages/character_count/CharacterCountLib';
import { copy } from '@/lib/copy';
import commonStyles from '@/styles/components/Common.module.scss';

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

  const title = '文字数カウントくん';
  const input = watch('input') ?? '';

  const characterCountValue = characterCountWithSpace(input).toString();
  const characterCountWithoutSpaceValue = characterCountWithoutSpace(input).toString();
  const spaceCharacterCountValue = spaceCount(input).toString();
  const fullWidthCharacterCountValue = fullWidthCharacterCount(input).toString();
  const halfWidthCharacterCountValue = halfWidthCharacterCount(input).toString();
  const linesCountValue = linesCount(input).toString();

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
            <Panel bordered header="カウントする文字列">
              <Controller
                as={<Input className={commonStyles.no_resize} componentClass="textarea" rows={15}/>}
                name="input"
                control={control}
                defaultValue=""
              />
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header="文字数">
              <Form className={styles.converted_form} layout="horizontal">
                <InputLine label="文字数（スペース込み）" value={characterCountValue}/>
                <InputLine label="文字数（スペース除外）" value={characterCountWithoutSpaceValue}/>
                <InputLine label="スペースの数" value={spaceCharacterCountValue}/>
                <InputLine label="全角文字数" value={fullWidthCharacterCountValue}/>
                <InputLine label="半角文字数" value={halfWidthCharacterCountValue}/>
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
          className={commonStyles.no_resize}
          readOnly
          value={value}
        />
        <InputGroup.Button onClick={copy(value)}>
          <Icon icon="copy-o"/>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  );
};