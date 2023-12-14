import styled from '@emotion/styled';
import { Space } from 'antd';
import React, { FC } from 'react';
import { Form } from 'rsuite';
import { CopyButton } from '@/components/common/CopyButton';
import { Input } from '@/components/common/Form/Input';

export const LabelInput: FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <Form.Group>
      <Space.Compact block>
        <StyleInput addonBefore={label} noResize="none" readOnly value={value} />
        <CopyButton copyText={value} />
      </Space.Compact>
    </Form.Group>
  );
};

const StyleInput = styled(Input)`
  .ant-input-group-addon {
    margin-left: 12px;
    width: 200px !important;
    text-align: right;
  }
`;
