import React, { FC } from 'react';
import { Form, Grid, Row, Col } from 'rsuite';
import { FormLabel } from '@/components/common/Form/FormLabel';

type Props = {
  label: string;
  children: React.ReactNode;
};

export const FormRow: FC<Props> = ({ label, children, ...rest }) => {
  return (
    <Form.Group>
      <Grid {...rest} fluid>
        <Row>
          <Col xl={4} md={8} sm={12} xs={24}>
            <FormLabel>{label}</FormLabel>
          </Col>
          <Col xl={20} md={16} sm={12} xs={24}>
            {children}
          </Col>
        </Row>
      </Grid>
    </Form.Group>
  );
};
