import React from 'react';
import { Controller } from 'react-hook-form';
import { ButtonToolbar, Col, Form, Grid, IconButton, Input, Panel, PanelGroup, Row } from 'rsuite';
import TrashOIcon from '@rsuite/icons/legacy/TrashO';
import MinusIcon from '@rsuite/icons/legacy/Minus';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useCharacterReplace } from '@/components/pages/character_replace/useCharacterReplace';
import { Editor } from '@/components/common/Editor';
import { PanelHeader } from '@/components/common/PanelHeader';
import styled from '@emotion/styled';

export const CharacterReplace: React.VFC = () => {
  const title = '文字列置換';
  const {
    control,
    onChange,
    input,
    output,
    countUp,
    countDown,
    countDownDisabled,
    countUpDisabled,
    numberArray,
    onClickInputClear,
  } = useCharacterReplace();

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
            <PanelGroup bordered>
              <Panel
                bordered
                header={
                  <PanelHeader
                    title="入力文字"
                    right={
                      <ButtonToolbar>
                        <IconButton
                          icon={<TrashOIcon />}
                          placement="right"
                          onClick={onClickInputClear}
                        >
                          クリア
                        </IconButton>
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Editor
                  onChange={onChange}
                  value={input}
                  width="100%"
                  options={{
                    fontSize: '14px',
                    tabSize: 2,
                  }}
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
                          disabled={countDownDisabled}
                          icon={<MinusIcon />}
                          placement="right"
                          onClick={countDown}
                        >
                          削除
                        </IconButton>
                        <IconButton
                          disabled={countUpDisabled}
                          icon={<PlusIcon />}
                          placement="right"
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
                    <ReplaceLine key={i} label={`${i}`} control={control} />
                  ))}
                </InputForm>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header="置換後">
              <Editor
                width="100%"
                value={output}
                options={{
                  fontSize: '14px',
                  tabSize: 2,
                  readOnly: true,
                }}
              />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};

const ReplaceLine: React.VFC<{
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
