import React from 'react';
import { Controller } from 'react-hook-form';
import { ButtonToolbar, Col, Form, Grid, IconButton, Panel, PanelGroup, Row } from 'rsuite';
import CopyIcon from '@rsuite/icons/Copy';
import TrashOIcon from '@rsuite/icons/legacy/TrashO';
import MinusIcon from '@rsuite/icons/legacy/Minus';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/common/PageTitle';
import { useCharacterReplace } from '@/components/pages/character_replace/useCharacterReplace';
import { PanelHeader } from '@/components/common/PanelHeader';
import styled from '@emotion/styled';
import { Input } from '@/components/common/Form/Input';
import { useCopy } from '@/hooks/useCopy';

export const CharacterReplace: React.VFC = () => {
  const title = '文字列置換';
  const {
    control,
    output,
    countUp,
    countDown,
    countDownDisabled,
    countUpDisabled,
    numberArray,
    onClickInputClear,
  } = useCharacterReplace();
  const { copy } = useCopy();

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
                          size="xs"
                          onClick={onClickInputClear}
                        >
                          クリア
                        </IconButton>
                      </ButtonToolbar>
                    }
                  />
                }
              >
                <Controller
                  render={({ field }) => <Input as="textarea" rows={14} {...field} />}
                  name="input"
                  control={control}
                  defaultValue=""
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
                    <ReplaceLine key={i} label={`${i}`} control={control} />
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
