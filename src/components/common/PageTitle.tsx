import styled from '@emotion/styled';
import { Row, Col } from 'antd';
import React, { FC } from 'react';

type Props = {
  title: string;
};

export const PageTitle: FC<Props> = ({ title }) => {
  return (
    <Row>
      <Col xs={24}>
        <H2>{title}</H2>
      </Col>
    </Row>
  );
};

const H2 = styled.h2`
  margin: 10px 5px;
  line-height: 24px;
  font-size: 20px;
`;
