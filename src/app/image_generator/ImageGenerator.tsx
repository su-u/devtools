'use client';
import { Button, Tabs } from 'antd';
import React, { FC } from 'react';
import { FormProvider, Controller } from 'react-hook-form';
import { Grid, Row, Col, PanelGroup, Panel, Form } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import { PRESET_SIZE_OPTIONS } from '@/app/image_generator/presetSize';
import {
  useImageGenerator,
  DEFAULT_VALUES,
  SIZE_LIMIT,
  UNSPLASH_FILE_TYPES,
  PLACEHOLD_FILE_TYPES,
} from '@/app/image_generator/useImageGenerator';
import { FormRow } from '@/components/common/Form/FormRow';
import { InputNumber } from '@/components/common/Form/InputNumber';
import { Select } from '@/components/common/Form/Select';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';

const width = 250;

export const ImageGenerator: FC = () => {
  const title = '画像生成';
  const { methods, src, onClickGenerate, onSelectPreset, onChangeTab } = useImageGenerator();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Form fluid layout="horizontal">
                <PanelGroup bordered>
                  <Panel bordered header={<PanelHeader title="設定" />}>
                    <Tabs
                      defaultActiveKey="Unsplash"
                      onChange={onChangeTab}
                      items={[
                        {
                          label: 'Unsplash',
                          key: 'unsplash',
                          children: <UnsplashTab control={control} />,
                        },
                        {
                          label: 'Placehold',
                          key: 'placehold',
                          children: <PlaceholdTab control={control} />,
                        },
                      ]}
                    />
                  </Panel>
                  <Panel bordered header={<PanelHeader title="プリセット" />}>
                    <FormRow label="サイズ">
                      <Select
                        style={{ width: 400 }}
                        options={PRESET_SIZE_OPTIONS}
                        onSelect={onSelectPreset}
                        listHeight={512}
                        listItemHeight={12}
                        showSearch
                      />
                    </FormRow>
                    <Button type="primary" onClick={onClickGenerate}>
                      生成
                    </Button>
                  </Panel>
                </PanelGroup>
              </Form>
            </Col>
            <Col xs={24} md={12}>
              <Panel bordered header={<PanelHeader title="生成画像" />}>
                <img src={src} width="100%" loading="lazy" alt="" />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const CommonForm: FC<{ control: any }> = ({ control }) => {
  return (
    <>
      <FormRow label="幅">
        <Controller
          render={({ field }) => (
            <InputNumber
              {...field}
              style={{ width }}
              min={SIZE_LIMIT.min}
              max={SIZE_LIMIT.max}
              defaultValue={DEFAULT_VALUES.wight}
            />
          )}
          name="wight"
          control={control}
        />
      </FormRow>
      <FormRow label="高さ">
        <Controller
          render={({ field }) => (
            <InputNumber
              {...field}
              style={{ width }}
              min={SIZE_LIMIT.min}
              max={SIZE_LIMIT.max}
              defaultValue={DEFAULT_VALUES.height}
            />
          )}
          name="height"
          control={control}
        />
      </FormRow>
    </>
  );
};

const UnsplashTab: FC<{ control: any }> = ({ control }) => {
  return (
    <>
      <CommonForm control={control} />
      <FormRow label="拡張子">
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              style={{ width }}
              options={UNSPLASH_FILE_TYPES}
              defaultValue={DEFAULT_VALUES.type}
            />
          )}
          name="type"
          control={control}
        />
      </FormRow>
    </>
  );
};

const PlaceholdTab: FC<{ control: any }> = ({ control }) => {
  return (
    <>
      <CommonForm control={control} />
      <FormRow label="拡張子">
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              style={{ width }}
              options={PLACEHOLD_FILE_TYPES}
              defaultValue={DEFAULT_VALUES.type}
            />
          )}
          name="type"
          control={control}
        />
      </FormRow>
    </>
  );
};
