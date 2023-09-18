import React from 'react';
import { FlexboxGrid, Form } from 'rsuite';
import { ConfigLabel } from '@/components/common/Form/ConfigForm';

type Props = {
  label: string;
  children: React.ReactNode;
};

export const FormRow: React.FC<Props> = ({ label, children, ...rest }) => {
  return (
    <Form.Group>
      <FlexboxGrid {...rest} align="middle">
        <FlexboxGrid.Item colspan={4}>
          <ConfigLabel>{label}</ConfigLabel>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>{children}</FlexboxGrid.Item>
      </FlexboxGrid>
    </Form.Group>
  );
};
