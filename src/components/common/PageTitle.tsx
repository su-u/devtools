import styled from '@emotion/styled';
import { Row, Col } from 'antd';
import React, { FC } from 'react';

type Props = {
  title: string;
  description: string;
};

export const PageTitle: FC<Props> = ({ title, description }) => {
  return (
    <Row>
      <Col xs={24}>
        <H1>{title}</H1>
        <Description>{description}</Description>
      </Col>
    </Row>
  );
};

const H1 = styled.h1`
  margin: 10px 5px 4px;
  line-height: 24px;
  font-size: 20px;
`;

const Description = styled.p`
  max-width: 900px;
  margin: 0 5px 12px;
  color: #c9cdd4;
  font-size: 13px;
  line-height: 1.6;
`;
