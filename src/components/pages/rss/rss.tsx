import React from 'react';
import { FlexboxGrid, Input } from 'rsuite';
import { AppLayout } from '@/Layout/App';

const RssGenerator: React.FC = () => {
  return (
    <AppLayout>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={8}>
          <Input as="textarea" rows={3} placeholder="Textarea" />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>colspan={4}</FlexboxGrid.Item>
      </FlexboxGrid>
    </AppLayout>
  );
};

export default RssGenerator;
