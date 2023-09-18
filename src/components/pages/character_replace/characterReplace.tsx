import React from 'react';
import styled from '@emotion/styled';
import { Controller, FormProvider } from 'react-hook-form';
import { ButtonToolbar, Col, Form, Grid, IconButton, Panel, PanelGroup, Row } from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import MinusIcon from '@rsuite/icons/legacy/Minus';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useCharacterReplace } from '@/components/pages/character_replace/useCharacterReplace';
import { PanelHeader } from '@/components/common/PanelHeader';
import { Input } from '@/components/common/Form/Input';
import { useCopy } from '@/hooks/useCopy';
import { ClearButton } from '@/components/common/Form/ClearButton';

export const CharacterReplace: React.FC = () => {
  const title = '文字列置換';
  const { methods, output, countUp, countDown, countDownDisabled, countUpDisabled, numberArray } =
    useCharacterReplace();
  const { copy } = useCopy();

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
                          <IconButton
                            icon={<MinusIcon />}
                            placement="right"
                            size="xs"
                            disabled={countDownDisabled}
                            onClick={countDown}
                          >
                            削除
                          </IconButton>
                          <IconButton
                            icon={<PlusIcon />}
                            placement="right"
                            size="xs"
                            disabled={countUpDisabled}
                            onClick={countUp}
                          >
                            追加
                          </IconButton>
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
                        <IconButton
                          icon={<CopyIcon />}
                          placement="right"
                          size="xs"
                          onClick={copy(output)}
                        ></IconButton>
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
