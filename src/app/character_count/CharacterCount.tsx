'use client';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import {
  characterCountWithoutSpace,
  characterCountWithSpace,
  fullWidthCharacterCount,
  halfWidthCharacterCount,
  linesCount,
  spaceCount,
} from '@/app/character_count/CharacterCountLib';
import { Editor } from '@/components/common/Editor';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { InputListForm } from '@/components/common/Form/InputListForm';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { useCustomForm } from '@/components/common/Form/useCustomForm';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

type characterCountForm = {
  input: string;
};

export const CharacterCount: FC = () => {
  const methods = useCustomForm<characterCountForm>({
    defaultValues: {
      input: '',
    },
  });
  const { control, watch } = methods;

  const title = '文字数カウント';
  const input = watch('input', '');

  const characterCountValue = characterCountWithSpace(input).toString();
  const characterCountWithoutSpaceValue = characterCountWithoutSpace(input).toString();
  const spaceCharacterCountValue = spaceCount(input).toString();
  const fullWidthCharacterCountValue = fullWidthCharacterCount(input).toString();
  const halfWidthCharacterCountValue = halfWidthCharacterCount(input).toString();
  const linesCountValue = linesCount(input).toString();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader title="カウントする文字列" right={<ClearButton name="input" />} />
                }
              >
                <Controller
                  render={({ field }) => <Editor {...field} ref={null} />}
                  name="input"
                  control={control}
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="文字数" />}>
                <InputListForm layout="horizontal">
                  <LabelInput label="文字数(スペース込み)" value={characterCountValue} />
                  <LabelInput
                    label="文字数(スペース除く)"
                    value={characterCountWithoutSpaceValue}
                  />
                  <LabelInput label="スペースの数" value={spaceCharacterCountValue} />
                  <LabelInput label="全角文字数" value={fullWidthCharacterCountValue} />
                  <LabelInput label="半角文字数" value={halfWidthCharacterCountValue} />
                  <LabelInput label="行数" value={linesCountValue} />
                </InputListForm>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};
