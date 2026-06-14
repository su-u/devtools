'use client';
import React, { FC } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { Col, Grid, Panel, PanelGroup, Row } from '@/components/common/layout';
import { AppLayout } from '@/Layout/App';
import { useJwtDecoder, DEFAULT_VALUES } from '@/app/jwt_decoder/useJwtDecoder';
import { TimeClaim } from '@/app/jwt_decoder/jwtDecoderLib';
import { ClearButton } from '@/components/common/Form/ClearButton';
import { CopyButton } from '@/components/common/Form/CopyButton';
import { InputListForm } from '@/components/common/Form/InputListForm';
import { LabelInput } from '@/components/common/Form/LabelInput';
import { TextArea } from '@/components/common/Form/TextArea';
import { PageTitle } from '@/components/common/PageTitle';
import { PanelHeader } from '@/components/common/PanelHeader';
import { dayjs } from '@/lib/dayjs';

// UNIX 秒のクレームを日時文字列に整形する。exp は有効期限の状態も併記する。
const formatClaim = (claim: TimeClaim): string => {
  const d = dayjs.unix(claim.value);
  const formatted = d.format('YYYY-MM-DD HH:mm:ss');
  if (claim.key === 'exp') {
    return `${formatted}（${d.isBefore(dayjs()) ? '期限切れ' : '有効'}）`;
  }
  return formatted;
};

export const JwtDecoder: FC = () => {
  const title = 'JWTデコーダー';
  const { methods, result, error } = useJwtDecoder();

  return (
    <FormProvider {...methods}>
      <AppLayout>
        <Grid fluid>
          <PageTitle title={title} />
          <Row gutter={5}>
            <Col xs={24} md={12}>
              <Panel
                bordered
                header={<PanelHeader title="JWT" right={<ClearButton name="input" />} />}
              >
                <Controller
                  render={({ field: { ref, ...field } }) => (
                    <TextArea
                      {...field}
                      placeholder="JWTを貼り付け"
                      autoSize={{ minRows: 4, maxRows: 10 }}
                      style={{ fontFamily: 'monospace' }}
                    />
                  )}
                  name="input"
                  control={methods.control}
                  defaultValue={DEFAULT_VALUES.input}
                />
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              {error ? (
                <Panel bordered header={<PanelHeader title="デコード結果" />}>
                  <ErrorText>{error}</ErrorText>
                </Panel>
              ) : (
                <PanelGroup bordered>
                  <Panel
                    bordered
                    header={
                      <PanelHeader
                        title="ヘッダー"
                        right={<CopyButton size="small" copyText={result.header} />}
                      />
                    }
                  >
                    <TextArea
                      readOnly
                      value={result.header}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Panel>
                  <Panel
                    bordered
                    header={
                      <PanelHeader
                        title="ペイロード"
                        right={<CopyButton size="small" copyText={result.payload} />}
                      />
                    }
                  >
                    <TextArea
                      readOnly
                      value={result.payload}
                      autoSize={{ minRows: 3, maxRows: 12 }}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Panel>
                  {result.timeClaims.length > 0 && (
                    <Panel bordered header={<PanelHeader title="時刻クレーム" />}>
                      <InputListForm>
                        {result.timeClaims.map((claim) => (
                          <LabelInput key={claim.key} label={claim.label} value={formatClaim(claim)} />
                        ))}
                      </InputListForm>
                    </Panel>
                  )}
                  <Panel bordered header={<PanelHeader title="署名" />}>
                    <LabelInput label="signature" value={result.signature} />
                  </Panel>
                </PanelGroup>
              )}
            </Col>
          </Row>
        </Grid>
      </AppLayout>
    </FormProvider>
  );
};

const ErrorText: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ color: '#ff7875', margin: 0 }}>{children}</p>
);
