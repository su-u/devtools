import styled from '@emotion/styled';
import { Card } from 'antd';
import Link from 'next/link';
import React, { FC } from 'react';
import { FeatureItemType } from '@/components/common/Features';

type CardProps = Omit<FeatureItemType, 'key'>;
export const FeatureCard: FC<CardProps> = ({ title, path, description, icon }) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <StyleCard style={{ width: 200 }} title={title}>
        {icon && <FeatureIcon aria-hidden="true">{icon}</FeatureIcon>}
        {description}
      </StyleCard>
    </Link>
  );
};

const StyleCard = styled(Card)`
  transition: 0.1s;

  .ant-card-head {
    min-height: 38px !important;
    padding: 0 12px !important;
    font-size: 14px !important;
  }

  .ant-card-body {
    height: 120px !important;
    padding: 12px !important;
  }

  &:hover {
    box-shadow:
      0 6px 16px -8px #00000014,
      0 9px 28px #0000000d,
      0 12px 48px 16px #00000008;
    transform: scale(1.02);
  }
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #fff;
  font-size: 28px;
`;
