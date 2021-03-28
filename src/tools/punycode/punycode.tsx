import React from 'react';
import { FlexboxGrid, Input } from 'rsuite';
import { AppLayout } from '@/Layout/App';

const Punycode: React.VFC = () => {
  return (
    <AppLayout>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={8}>
          <Input componentClass="textarea" rows={3} placeholder="Textarea" />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>colspan={4}</FlexboxGrid.Item>
      </FlexboxGrid>
    </AppLayout>
  );
};

export default Punycode;
