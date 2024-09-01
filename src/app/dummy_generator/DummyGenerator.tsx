'use client';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Form, Popconfirm, Button, Space } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react';
import { FormProvider, Controller } from 'react-hook-form';
import type { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import { Grid, Row, Col, PanelGroup, Panel } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { dataTypeOptions } from '@/app/dummy_generator/options';
import type { DataType } from '@/app/dummy_generator/options';
import { AddressOptions } from '@/app/dummy_generator/options/AddressOptions';
import { NameOptions } from '@/app/dummy_generator/options/NameOptions';
import {
  useDummy,
  RecordType,
  DummyForm,
  COUNT_LIMIT,
  DEFAULT_VALUES,
} from '@/app/dummy_generator/useDummy';
import { FormRow } from '@/components/common/Form/FormRow';
import { InputNumber } from '@/components/common/Form/InputNumber';
import { Select } from '@/components/common/Form/Select';
import { TextArea } from '@/components/common/Form/TextArea';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

export const DummyGenerator: FC = () => {
  const title = 'ダミー情報の生成';
  const width = 250;
  const { methods, fields, output, onClickAdd, onClickClear, onClickDelete, onClickGenerate } =
    useDummy();
  const { watch, control } = methods;

  const source = fields.map((value, index) => {
    return {
      key: index,
      content: <ConfigRow id={value.id} index={index} control={control} watch={watch} />,
      action: null,
    };
  });

  const columns: ColumnsType<RecordType> = [
    {
      title: 'ID',
      key: 'key',
      dataIndex: 'key',
      width: '5%',
    },
    {
      title: 'データ',
      key: 'content',
      dataIndex: 'content',
    },
    {
      key: 'action',
      dataIndex: 'action',
      width: '5%',
      render: (_, record: RecordType) => (
        <DeleteAction key={record.key} onClick={onClickDelete(record.key)} />
      ),
    },
  ];

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
                    <FormRow label="生成数">
                      <Controller
                        render={({ field: { ref, ...field } }) => (
                          <InputNumber
                            {...field}
                            style={{ width }}
                            min={COUNT_LIMIT.min}
                            max={COUNT_LIMIT.max}
                            defaultValue={DEFAULT_VALUES.count}
                          />
                        )}
                        name="count"
                        control={control}
                      />
                    </FormRow>
                    <Button type="primary" onClick={onClickGenerate}>
                      生成
                    </Button>
                  </Panel>
                  <Panel
                    bordered
                    header={
                      <PanelHeader
                        title="設定"
                        right={
                          <Space.Compact block>
                            <Button icon={<PlusOutlined />} size="small" onClick={onClickAdd}>
                              追加
                            </Button>
                            <Popconfirm title="全て削除していいですか？" onConfirm={onClickClear}>
                              <Button icon={<DeleteOutlined />} danger size="small">
                                クリア
                              </Button>
                            </Popconfirm>
                          </Space.Compact>
                        }
                      />
                    }
                  >
                    <Table
                      pagination={{
                        pageSize: 20,
                      }}
                      columns={columns}
                      dataSource={source}
                    />
                  </Panel>
                </PanelGroup>
              </Form>
            </Col>
            <Col md={12} xs={24}>
              <Panel bordered header={<PanelHeader title="テストデータ" />}>
                <TextArea value={output} readOnly rows={30} />
              </Panel>
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
  control: Control<DummyForm>;
  watch: UseFormWatch<DummyForm>;
}> = ({ id, index, control, watch }) => {
  return (
    <FormRow label="形式">
      <Controller
        key={id}
        name={`items.${index}.dataType`}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Select
            {...field}
            style={{ width: 250 }}
            options={dataTypeOptions as unknown as DefaultOptionType[]}
            defaultValue={undefined}
            listHeight={512}
            listItemHeight={12}
            showSearch
          />
        )}
      />
      <Options
        dataType={watch(`items.${index}.dataType`)}
        id={id}
        index={index}
        control={control}
      />
    </FormRow>
  );
};

const Options: FC<{
  dataType: DataType;
  id: string;
  index: number;
  control: Control<DummyForm>;
}> = ({ dataType, id: id, index, control }) => {
  switch (dataType) {
    case 'name': {
      return <NameOptions id={id} index={index} control={control} />;
    }
    case 'address': {
      return <AddressOptions id={id} index={index} control={control} />;
    }
    default: {
      return null;
    }
  }
};

const DeleteAction: FC<{ key: number; onClick: () => void }> = ({ key, onClick }) => {
  return (
    <Popconfirm title="本当に削除していいですか？" onConfirm={onClick}>
      <Button icon={<DeleteOutlined />} danger />
    </Popconfirm>
  );
};
