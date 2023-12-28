import { Radio, Form } from 'antd';
import React, { FC } from 'react';
import { nameOptions, nameDataOptions } from '@/app/dummy_generator/facker';

export const NameOptions: FC = () => {
  return (
    <>
      <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
        <Radio.Group defaultValue={nameOptions[0].value} buttonStyle="outline">
          {nameOptions.map(({ label, value }) => {
            return (
              <Radio.Button key={label} value={value}>
                {label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Form.Item>
      <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
        <Radio.Group defaultValue={nameDataOptions[0].value} buttonStyle="outline">
          {nameDataOptions.map(({ label, value }) => {
            return (
              <Radio.Button key={label} value={value}>
                {label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Form.Item>
    </>
  );
};
