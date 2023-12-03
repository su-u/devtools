import styled from '@emotion/styled';
import CopyIcon from '@rsuite/icons/Copy';
import React from 'react';
import { Form , InputGroup } from 'rsuite';
import { Input } from '@/components/common/Form/Input';
import { useCopy } from '@/hooks/useCopy';

export const LabelInput: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  const { copy } = useCopy();

  return (
    <Form.Group>
      <InputGroup>
        <Label>{label}</Label>
        <Input noResize="none" size="sm" readOnly value={value} />
        <InputGroup.Button onClick={copy(value)} size="sm">
          <CopyIcon />
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
  );
};

const Label = styled(Form.ControlLabel)`
  margin-left: 12px;
  font-size: 12px !important;
  width: 250px !important;
`;
