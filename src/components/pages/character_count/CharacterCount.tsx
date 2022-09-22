import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Form, Grid, InputGroup, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import {
  characterCountWithoutSpace,
  characterCountWithSpace,
  fullWidthCharacterCount,
  halfWidthCharacterCount,
  linesCount,
  spaceCount,
} from '@/components/pages/character_count/CharacterCountLib';
import { useCopy } from '@/hooks/useCopy';
import styled from '@emotion/styled';
import { Input } from '@/components/common/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import CopyIcon from '@rsuite/icons/Copy';

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
            <Panel bordered header={<PanelHeader title="カウントする文字列" />}>
              <Controller
                render={({ field }) => <Input noResize="none" as="textarea" rows={14} {...field} />}
                name="input"
                control={control}
                defaultValue=""
              />
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header={<PanelHeader title="文字数" />}>
              <ConvertedForm layout="horizontal">
                <InputLine label="文字数(スペース込み)" value={characterCountValue} />
                <InputLine label="文字数(スペース除)" value={characterCountWithoutSpaceValue} />
                <InputLine label="スペースの数" value={spaceCharacterCountValue} />
                <InputLine label="全角文字数" value={fullWidthCharacterCountValue} />
                <InputLine label="半角文字数" value={halfWidthCharacterCountValue} />
                <InputLine label="行数" value={linesCountValue} />
              </ConvertedForm>
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
        <Label>{label}</Label>
        <Input noResize="none" readOnly value={value} />
        <InputGroup.Button onClick={copy(value)} size="sm">
          <CopyIcon />
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
  );
};

const ConvertedForm = styled(Form)`
  > div:not(:last-child) {
    margin-bottom: 12px !important;
  }
`;

const Label = styled(Form.ControlLabel)`
  margin-left: 12px;
  font-size: 12px !important;
  width: 250px !important;
`;
