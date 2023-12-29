import { Radio, Form } from 'antd';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form/dist/types/form';
import { nameOptions, nameDataOptions } from '@/app/dummy_generator/options';
import { DummyForm } from '@/app/dummy_generator/useDummy';

type Props<TFieldValues> = {
  id: string;
  index: number;
  control: Control<TFieldValues>;
};

export const NameOptions: FC<Props<DummyForm>> = ({ id, index, control }) => {
  return (
    <>
      <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
        <Controller
          key={id}
          name={`items.${index}.nameType`}
          control={control}
          defaultValue={nameOptions[0].value}
          render={({ field: { ref, ...field } }) => (
            <Radio.Group {...field} defaultValue={nameOptions[0].value} buttonStyle="outline">
              {nameOptions.map(({ label, value }) => {
                return (
                  <Radio.Button key={label} value={value}>
                    {label}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          )}
        />
      </Form.Item>
      <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
        <Controller
          key={id}
          name={`items.${index}.nameDataType`}
          control={control}
          defaultValue={nameDataOptions[0].value}
          render={({ field: { ref, ...field } }) => (
            <Radio.Group {...field} defaultValue={nameDataOptions[0].value} buttonStyle="outline">
              {nameDataOptions.map(({ label, value }) => {
                return (
                  <Radio.Button key={label} value={value}>
                    {label}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          )}
        />
      </Form.Item>
    </>
  );
};
