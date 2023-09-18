import React from 'react';
import styled from '@emotion/styled';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Col, Form, Grid, Panel, Row, ButtonToolbar } from 'rsuite';
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
import { Input } from '@/components/common/Form/Input';
import { PanelHeader } from '@/components/common/PanelHeader';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { LabelInput } from '@/components/common/Form/LabelInput';

type characterCountForm = {
  input: string;
};

export const CharacterCount: React.FC = () => {
  const methods = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const { control, watch } = methods;

  const title = '文字数カウント';
  const input = watch('input') ?? '';

  const characterCountValue = characterCountWithSpace(input).toString();
  const characterCountWithoutSpaceValue = characterCountWithoutSpace(input).toString();
  const spaceCharacterCountValue = spaceCount(input).toString();
  const fullWidthCharacterCountValue = fullWidthCharacterCount(input).toString();
  const halfWidthCharacterCountValue = halfWidthCharacterCount(input).toString();
  const linesCountValue = linesCount(input).toString();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="カウントする文字列"
                    right={
                      <ButtonToolbar>
                        <ClearButton name="input" />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Controller
                  render={({ field }) => (
                    <Input noResize="none" as="textarea" rows={14} {...field} />
                  )}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="文字数" />}>
                <ConvertedForm layout="horizontal">
                  <LabelInput label="文字数(スペース込み)" value={characterCountValue} />
                  <LabelInput label="文字数(スペース除)" value={characterCountWithoutSpaceValue} />
                  <LabelInput label="スペースの数" value={spaceCharacterCountValue} />
                  <LabelInput label="全角文字数" value={fullWidthCharacterCountValue} />
                  <LabelInput label="半角文字数" value={halfWidthCharacterCountValue} />
                  <LabelInput label="行数" value={linesCountValue} />
                </ConvertedForm>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const ConvertedForm = styled(Form)`
  > div:not(:last-child) {
    margin-bottom: 12px !important;
  }
`;
