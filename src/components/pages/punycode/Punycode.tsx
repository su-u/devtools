import React from 'react';
import { Button, FlexboxGrid, Input, Panel } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { useForm, Controller } from 'react-hook-form';
import { PageTitle } from '@/components/PageTitle';

const Punycode: React.VFC = () => {
  const { register, control, watch } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  return (
    <AppLayout>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={16}>
          <PageTitle title="punycode変換（日本語ドメイン変換）" />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={16}>
          <Controller
            as={<Input componentClass="textarea" rows={4} placeholder="Textarea" />}
            name="input"
            control={control}
            defaultValue=""
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={16}>
          <Panel bordered header="ピュニコード変換後">
            {punycode.toASCII(watch('input') ?? '')}
            <Button appearance="default">Default</Button>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </AppLayout>
  );
};

export default Punycode;
