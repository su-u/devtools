'use client';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react';
import { FormProvider, Controller } from 'react-hook-form';
import { Grid, Row, Col, Form, PanelGroup, Panel, IconButton } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { useDummy, DataType } from '@/app/dummy_generator/useDummy';
import { Input } from '@/components/common/Form/Input';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    key: 'key',
    dataIndex: 'key',
  },
  {
    title: 'Content',
    key: 'content',
    dataIndex: 'content',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];

export const DummyGenerator: FC = () => {
  const title = 'ダミー情報の生成';
  const { methods, fields, onClickAdd } = useDummy();

  const source = fields.map((value, index) => {
    return {
      key: index,
      content: <ConfigRow id={value.id} index={index} control={methods.control} />,
      action: null,
    };
  });

  // const source: DataType[] = [
  //   {
  //     key: 1,
  //     content: '1',
  //     action: 'a',
  //   },
  //   {
  //     key: 2,
  //     content: '2',
  //     action: 'a',
  //   }
  // ];

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col md={12} xs={24}>
              <Form fluid layout="horizontal">
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
}> = ({ id, index, control }) => {
  return (
    <Controller
      key={id}
      name={`items.${index}.firstName`}
      control={control}
      render={({ field: { ref, ...field } }) => <Input {...field} />}
    />
  );
};
