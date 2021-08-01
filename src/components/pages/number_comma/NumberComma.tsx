import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Col,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputPicker,
  Panel, PanelGroup,
  Row
} from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PageTitle } from '@/components/PageTitle';
import { copy } from '@/lib/copy';
import commonStyles from '@/styles/components/Common.module.scss';
import { comma } from '@/components/pages/number_comma/numberCommaLib';

type characterCountForm = {
  input: string;
  separator: string;
}

export const NumberComma: React.VFC = () => {
  const { control, watch } = useForm<characterCountForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const title = '数値区切り';
  const input = watch('input') ?? '';
  const separator = watch('separator') ?? ',';
  const output = comma(input, separator);

  const selectData = [
    {
      label: ',',
      value: ','
    },
    {
      label: '_',
      value: '_'
    }
  ];

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
              <Panel header="区切りたい数値">
                <Controller
                  as={<Input className={commonStyles.no_resize}/>}
                  name="input"
                  control={control}
                  defaultValue=""
                />
              </Panel>
              <Panel bordered header="区切り文字">
                <Controller
                  as={<InputPicker data={selectData} defaultValue="," />}
                  name="separator"
                  control={control}
                  defaultValue=","
                />
              </Panel>
            </PanelGroup>
          </Col>
          <Col xs={24} md={12}>
            <Panel bordered header="区切った数値">
              <InputGroup>
                <Input
                  className={commonStyles.no_resize}
                  readOnly
                  value={output}
                />
                <InputGroup.Button onClick={copy(output)}>
                  <Icon icon="copy-o"/>
                </InputGroup.Button>
              </InputGroup>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </AppLayout>
  );
};
