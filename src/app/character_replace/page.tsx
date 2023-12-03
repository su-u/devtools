'use client';
import styled from '@emotion/styled';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Form, Grid, IconButton, Panel, PanelGroup, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { AddButton } from '@/app/character_replace/AddButton';
import { DeleteButton } from '@/app/character_replace/DeleteButton';
import { useCharacterReplace } from '@/app/character_replace/useCharacterReplace';
import { CopyButton } from '@/components/common/CopyButton';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { Input } from '@/components/common/Form/Input';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

const CharacterReplacePage: React.FC = () => {
  const title = '文字列置換';
  const { methods, output, countUp, countDown, countDownDisabled, countUpDisabled, numberArray } =
    useCharacterReplace();

  return (
    <FormProvider {...methods}>
      <AppLayout title={title}>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <PanelGroup bordered>
                <Panel
                  bordered
                  header={
                    <PanelHeader
                      title="入力文字"
                      right={
                        <ButtonToolbar>
                          <ClearButton name="input" />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <Controller
                    render={({ field }) => <Input as="textarea" rows={14} {...field} />}
                    name="input"
                    control={methods.control}
                  />
                </Panel>
                <Panel
                  bordered
                  header={
                    <PanelHeader
                      title="置換する文字"
                      right={
                        <ButtonToolbar>
                          <DeleteButton disabled={countDownDisabled} onClick={countDown} />
                          <AddButton disabled={countUpDisabled} onClick={countUp} />
                        </ButtonToolbar>
                      }
                    />
                  }
                >
                  <InputForm layout="inline" autoComplete="off">
                    {numberArray.map((i) => (
                      <ReplaceLine key={i} label={`${i}`} control={methods.control} />
                    ))}
                  </InputForm>
                </Panel>
              </PanelGroup>
            </Col>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="置換後"
                    right={
                      <ButtonToolbar>
                        <CopyButton copyText={output} />
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Input value={output} as="textarea" readOnly rows={14} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const ReplaceLine: React.FC<{
  label: string;
  control: any;
}> = ({ label, control }) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={2} md={1}>
          <Label>{label}</Label>
        </Col>
        <Col xs={10}>
          <Controller
            name={`target_${label}`}
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} />}
          />
        </Col>
        <Col xs={2} md={1}>
          <Mark>→</Mark>
        </Col>
        <Col xs={10}>
          <Controller
            name={`replace_${label}`}
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} />}
          />
        </Col>
      </Row>
    </Grid>
  );
};

const InputForm = styled(Form)`
  > div:last-child {
    margin-bottom: 0 !important;
  }
`;

const Label = styled(Form.ControlLabel)`
  width: 15px !important;
`;

const Mark = styled.div`
  margin-bottom: auto;
  margin-top: 8px;
  text-align: center;
  vertical-align: top;
`;

export default CharacterReplacePage;
