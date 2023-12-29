import { Radio, Form } from 'antd';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form/dist/types/form';
import { addressOptions } from '@/app/dummy_generator/options';
import { DummyForm } from '@/app/dummy_generator/useDummy';

type Props<TFieldValues> = {
  id: string;
  index: number;
  control: Control<TFieldValues>;
};

export const AddressOptions: FC<Props<DummyForm>> = ({ id, index, control }) => {
  return (
    <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
      <Controller
        key={id}
        name={`items.${index}.addressType`}
        control={control}
        defaultValue={addressOptions[0].value}
        render={({ field: { ref, ...field } }) => (
          <Radio.Group {...field} defaultValue={addressOptions[0].value} buttonStyle="outline">
            {addressOptions.map(({ label, value }) => {
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
  );
};
