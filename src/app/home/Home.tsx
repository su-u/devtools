'use client';
import { Flex } from 'antd';
import React, { FC } from 'react';
import { AppLayout } from '@/Layout/App';
import { FeatureCard } from '@/app/home/FeatureCard';
import { features } from '@/components/common/Features';

export const HomePage: FC = () => {
  const list = features.map(({ items }) => [...items]).flat();
  console.log(list);

  return (
    <AppLayout>
      <Flex style={{ margin: 8 }} wrap="wrap" gap="small">
        {list.map((feature) => (
          <FeatureCard key={feature.key} {...feature} />
        ))}
      </Flex>
    </AppLayout>
  );
};
