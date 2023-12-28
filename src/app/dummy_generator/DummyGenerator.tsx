'use client';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import { Table, Form } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react';
import { FormProvider, Controller } from 'react-hook-form';
import { Grid, Row, Col, PanelGroup, Panel, IconButton } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { dataTypeOptions } from '@/app/dummy_generator/facker';
import type { DataType } from '@/app/dummy_generator/facker';
import { NameOptions } from '@/app/dummy_generator/options/NameOptions';
import { useDummy, RecordType } from '@/app/dummy_generator/useDummy';
import { FormRow } from '@/components/common/Form/FormRow';
import { Select } from '@/components/common/Form/Select';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

const columns: ColumnsType<RecordType> = [
  {
    title: 'ID',
    key: 'key',
    dataIndex: 'key',
    width: '5%',
  },
  {
    title: 'Content',
    key: 'content',
    dataIndex: 'content',
  },
  {
    title: '削除',
    key: 'action',
    dataIndex: 'action',
    width: '15%',
  },
];

export const DummyGenerator: FC = () => {
  const title = 'ダミー情報の生成';
  const { methods, fields, onClickAdd } = useDummy();
  const { watch, control } = methods;

  const source = fields.map((value, index) => {
    return {
      key: index,
      content: <ConfigRow id={value.id} index={index} control={control} watch={watch} />,
      action: null,
    };
  });

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col md={12} xs={24}>
              <Form layout="horizontal">
                <PanelGroup bordered>
                  <Panel bordered header={<PanelHeader title="管理" />}>
                    <IconButton
                      icon={<PlusIcon />}
                      placement="right"
                      size="xs"
                      onClick={onClickAdd}
                    >
                      追加
                    </IconButton>
                  </Panel>
                  <Panel bordered header={<PanelHeader title="設定" />}>
                    <Table columns={columns} dataSource={source} />
                  </Panel>
                </PanelGroup>
              </Form>
            </Col>
            <Col md={12} xs={24}>
              <Panel bordered header={<PanelHeader title="UUID" />}></Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const ConfigRow: FC<{
  id: string;
  index: number;
  control: any;
  watch: any;
}> = ({ id, index, control, watch }) => {
  return (
    <FormRow label="形式">
      <Controller
        key={id}
        name={`items.${index}.dataType`}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Select
            style={{ width: 250 }}
            options={dataTypeOptions as unknown as DefaultOptionType[]}
            defaultValue={undefined}
            showSearch
            {...field}
          />
        )}
      />
      <Options dataType={watch(`items.${index}.dataType`)} index={index} control={control} />
    </FormRow>
  );
};

const Options: FC<{ dataType: DataType; index: number; control: any }> = ({
  dataType,
  index,
  control,
}) => {
  switch (dataType) {
    case 'name': {
      return <NameOptions />;
    }
    default: {
      return null;
    }
  }
};
