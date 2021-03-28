import React from 'react';
import { Button, FlexboxGrid, Icon, Input, Panel } from 'rsuite';
import { AppLayout } from '@/Layout/App';
import punycode from 'punycode/';
import { useForm, Controller } from 'react-hook-form';
import { PageTitle } from '@/components/PageTitle';
import styles from '@/styles/components/pages/punycode.module.scss';

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
      <FlexboxGrid className={styles.input} justify="center">
        <FlexboxGrid.Item colspan={16}>
          <Controller
            as={<Input componentClass="textarea" rows={4} />}
            name="input"
            control={control}
            defaultValue=""
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className={styles.icon} colspan={16}>
          <Icon icon="long-arrow-down" size="4x" />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className={styles.converted} colspan={16}>
          <Panel className={styles.panel} bordered header="ドメイン変換">
            <Input
              componentClass="textarea"
              rows={3}
              readonly
              value={punycode.toASCII(watch('input') ?? '')}
            />
            <Button appearance="primary">コピー</Button>
          </Panel>
          <Panel className={styles.panel} bordered header="punycode変換">
            <Input
              componentClass="textarea"
              rows={3}
              readonly
              value={punycode.encode(watch('input') ?? '')}
            />
            <Button appearance="primary">コピー</Button>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </AppLayout>
  );
};

export default Punycode;
