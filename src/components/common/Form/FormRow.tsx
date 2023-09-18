import React from 'react';
import { Form, Grid, Row, Col } from 'rsuite';
import { ConfigLabel } from '@/components/common/Form/ConfigForm';

type Props = {
  label: string;
  children: React.ReactNode;
};

export const FormRow: React.FC<Props> = ({ label, children, ...rest }) => {
  return (
    <Form.Group>
      <Grid {...rest} fluid>
        <Row>
          <Col xl={4} md={8} sm={12} xs={24}>
            <ConfigLabel>{label}</ConfigLabel>
          </Col>
          <Col xl={20} md={16} sm={12} xs={24}>
            {children}
          </Col>
        </Row>
      </Grid>
    </Form.Group>
  );
};
