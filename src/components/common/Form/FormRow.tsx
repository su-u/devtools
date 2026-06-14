import styled from '@emotion/styled';
import { Row, Col } from 'antd';
import React, { FC } from 'react';
import { FormLabel } from '@/components/common/Form/FormLabel';

type Props = {
  label: React.ReactNode;
  children?: React.ReactNode;
};

export const FormRow: FC<Props> = ({ label, children }) => {
  return (
    <StyledRow align="middle">
      <Col xl={4} md={8} sm={12} xs={24}>
        <FormLabel>{label}</FormLabel>
      </Col>
      <Col xl={20} md={16} sm={12} xs={24}>
        {children}
      </Col>
    </StyledRow>
  );
};

// 行同士の縦の余白を確保する（最後の行は不要）
const StyledRow = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;
