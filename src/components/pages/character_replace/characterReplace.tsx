import React from 'react';
import { Controller } from 'react-hook-form';
import {
  ButtonToolbar,
  Col,
  ControlLabel,
  Form,
  Grid, Icon,
  IconButton,
  Input,
  Panel,
  PanelGroup,
  Row
} from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import styles from './characterReplace.module.scss';
import { useCharacterReplace } from '@/components/pages/character_replace/useCharacterReplace';


export const CharacterReplace: React.VFC = () => {
  const title = '文字列置換';
  const {
    control, output, countUp, countDown, countDownDisabled, countUpDisabled, numberArray
  } = useCharacterReplace();


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
            <PanelGroup bordered>
              <Panel bordered header="入力文字">
                <Controller
                  as={<Input componentClass="textarea" rows={20}/>}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header={
                <div className={styles.input_replace_header}>
                  <div>
                    置換する文字
                  </div>
                  <div>
                    <ButtonToolbar>
                      <IconButton disabled={countDownDisabled} icon={<Icon icon="minus"/>} placement="right"
                                  onClick={countDown}>
                        削除
                      </IconButton>
                      <IconButton disabled={countUpDisabled} icon={<Icon icon="plus"/>} placement="right"
                                  onClick={countUp}>
                        追加
                      </IconButton>
                    </ButtonToolbar>
                  </div>
                </div>
              }>
                <Form className={styles.input_form} layout="inline" autoComplete="off">
                  {numberArray.map(i => (<ReplaceLine key={i} label={`${i}`} control={control}/>))}
                </Form>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header="置換後">
              <Input componentClass="textarea" rows={20} readOnly value={output}/>
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
    <Grid fluid className={styles.input_group}>
      <Row>
        <Col xs={2} md={1}>
          <ControlLabel className={styles.label}>{label}</ControlLabel>
        </Col>
        <Col xs={10}>
          <Controller
            as={<Input/>}
            name={`target_${label}`}
            control={control}
            defaultValue=""
          />
        </Col>
        <Col xs={2} md={1}>
          <div className={styles.center_text}>→</div>
        </Col>
        <Col xs={10}>
          <Controller
            as={<Input/>}
            name={`replace_${label}`}
            control={control}
            defaultValue=""
          />
        </Col>
      </Row>
    </Grid>
  );
};