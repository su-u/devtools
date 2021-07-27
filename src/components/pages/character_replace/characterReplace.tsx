import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, ControlLabel, Form, FormGroup, Grid, Input, Panel, PanelGroup, Row } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';

type characterCountForm = {
  input: string;
  [key: string]: string;
}

export const CharacterReplace: React.VFC = () => {
  const title = '文字列置換くん';
  const { control, watch } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const input_count = 2;
  // @ts-ignore
  const array = [...Array(input_count).keys()].map(i => ++i);

  const input = watch('input') ?? '';
  const output = array.reduce((a, b) => {
    const target = watch(`target_${b}`) ?? '';
    const replace = watch(`replace_${b}`) ?? '';
    if (target === '') return a;

    return a.replace(new RegExp(target, 'gm'), replace);
  }, input);

  return (
    <AppLayout title={title}>
      <Grid fluid>
        <Row>
          <Col xs={24}>
            <PageTitle title={title}/>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={12}>
            <PanelGroup bordered>
              <Panel bordered header="入力文字">
                <Controller
                  as={<Input componentClass="textarea" rows={20}/>}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header="置換する文字">
                <Form layout="inline" autoComplete="off">
                  {array.map(i => (<ReplaceLine key={i} label={`${i}`} control={control}/>))}
                </Form>
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={12}>
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
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormGroup>
        <Controller
          as={<Input />}
          name={`target_${label}`}
          control={control}
          defaultValue=""
        />
      </FormGroup>
      　→　
      <FormGroup>
        <Controller
          as={<Input />}
          name={`replace_${label}`}
          control={control}
          defaultValue=""
        />
      </FormGroup>
    </FormGroup>
  );
};