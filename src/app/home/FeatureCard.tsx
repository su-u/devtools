import styled from '@emotion/styled';
import { Card } from 'antd';
import Link from 'next/link';
import React, { FC } from 'react';
import { FeatureItemType } from '@/components/common/Features';

type CardProps = FeatureItemType;
export const FeatureCard: FC<CardProps> = ({ title, path, description }) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <StyleCard style={{ width: 200 }} title={title}>
        {description}
      </StyleCard>
    </Link>
  );
};

const StyleCard = styled(Card)`
  transition: 0.1s;

  .ant-card-head {
    min-height: 38px;
    padding: 0 12px;
    font-size: 14px;
  }

  .ant-card-body {
    height: 120px;
    padding: 12px;
  }

  &:hover {
    box-shadow:
      0 6px 16px -8px #00000014,
      0 9px 28px #0000000d,
      0 12px 48px 16px #00000008;
    transform: scale(1.02);
  }
`;
