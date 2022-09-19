import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Form, Grid, Input, InputGroup, Panel, Row } from 'rsuite';
import CopyOIcon from '@rsuite/icons/legacy/CopyO';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import styles from './characterCount.module.scss';
import {
  characterCountWithoutSpace,
  characterCountWithSpace,
  fullWidthCharacterCount,
  halfWidthCharacterCount,
  linesCount,
  spaceCount,
} from '@/components/pages/character_count/CharacterCountLib';
import commonStyles from '@/styles/components/Common.module.scss';
import { useCopy } from '@/hooks/useCopy';

type characterCountForm = {
  input: string;
};

export const CharacterCount: React.VFC = () => {
  const { control, watch } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const title = '文字数カウント';
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
            <PageTitle title={title} />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} md={12}>
            <Panel bordered header="カウントする文字列">
              <Controller
                render={({ field }) => (
                  <Input className={commonStyles.no_resize} as="textarea" rows={15} {...field} />
                )}
                name="input"
                control={control}
                defaultValue=""
              />
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header="文字数">
              <Form className={styles.converted_form} layout="horizontal">
                <InputLine label="文字数（スペース込み）" value={characterCountValue} />
                <InputLine label="文字数（スペース除外）" value={characterCountWithoutSpaceValue} />
                <InputLine label="スペースの数" value={spaceCharacterCountValue} />
                <InputLine label="全角文字数" value={fullWidthCharacterCountValue} />
                <InputLine label="半角文字数" value={halfWidthCharacterCountValue} />
                <InputLine label="行数" value={linesCountValue} />
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
  const { copy } = useCopy();

  return (
    <Form.Group>
      <InputGroup>
        <Form.ControlLabel className={styles.label}>{label}</Form.ControlLabel>
        <Input className={commonStyles.no_resize} readOnly value={value} />
        <InputGroup.Button onClick={copy(value)}>
          <CopyOIcon />
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
  );
};