'use client';
import { Flex } from 'antd';
import React, { FC } from 'react';
import { AppLayout } from '@/Layout/App';
import { FeatureCard } from '@/app/home/FeatureCard';
import { features } from '@/components/common/Features';

export const HomePage: FC = () => {
  return (
    <AppLayout>
      <div style={{ margin: 8 }}>
        {features.map((group) => (
          <section
            key={group.key}
            aria-labelledby={`feature-group-${group.key}`}
            style={{ marginBottom: 24 }}
          >
            <h2
              id={`feature-group-${group.key}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: '16px 0 12px',
                color: '#fff',
                fontSize: 16,
              }}
            >
              <span aria-hidden="true">{group.icon}</span>
              {group.title}
            </h2>
            <Flex wrap="wrap" gap="small">
              {group.items?.map((feature) => (
                <FeatureCard
                  key={feature.key}
                  icon={feature.icon}
                  title={feature.title}
                  path={feature.path}
                  description={feature.description}
                />
              ))}
            </Flex>
          </section>
        ))}
      </div>
    </AppLayout>
  );
};
