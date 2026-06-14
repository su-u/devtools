export type TimeClaim = {
  key: string; // iat / exp / nbf / auth_time
  label: string; // 表示ラベル
  value: number; // UNIX 秒
};

export type JwtResult = {
  header: string; // 整形済み JSON
  payload: string; // 整形済み JSON
  signature: string; // base64url のままの署名セグメント
  timeClaims: TimeClaim[]; // 日時に変換できるクレーム
};

// 日時として解釈できる代表的なクレーム
const TIME_CLAIM_LABELS: Record<string, string> = {
  iat: '発行日時 (iat)',
  exp: '有効期限 (exp)',
  nbf: '有効化日時 (nbf)',
  auth_time: '認証日時 (auth_time)',
};

/** base64url 文字列を UTF-8 文字列としてデコードする */
export const base64UrlDecode = (segment: string): string => {
  let b64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const mod = b64.length % 4;
  if (mod === 1) throw new Error('Base64URLの長さが不正です。');
  if (mod === 2) b64 += '==';
  else if (mod === 3) b64 += '=';
  let binary: string;
  try {
    binary = atob(b64);
  } catch {
    throw new Error('Base64URLのデコードに失敗しました。');
  }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

/** 1セグメントを base64url デコードして JSON としてパースする */
const parseJsonSegment = (segment: string, name: string): Record<string, any> => {
  let json: string;
  try {
    json = base64UrlDecode(segment);
  } catch {
    throw new Error(`${name}のデコードに失敗しました。`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error(`${name}が正しいJSONではありません。`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${name}がJSONオブジェクトではありません。`);
  }
  return parsed as Record<string, any>;
};

/** JWT(header.payload.signature) をデコードする */
export const decodeJwt = (token: string): JwtResult => {
  const trimmed = token.trim();
  if (trimmed === '') throw new Error('JWTを入力してください。');
  const parts = trimmed.split('.');
  if (parts.length !== 3) {
    throw new Error('JWTは「header.payload.signature」の3パートで構成されます。');
  }
  const [headerSeg, payloadSeg, signatureSeg] = parts;

  const header = parseJsonSegment(headerSeg, 'ヘッダー');
  const payload = parseJsonSegment(payloadSeg, 'ペイロード');

  const timeClaims: TimeClaim[] = Object.keys(TIME_CLAIM_LABELS)
    .filter((k) => typeof payload[k] === 'number')
    .map((k) => ({ key: k, label: TIME_CLAIM_LABELS[k], value: payload[k] }));

  return {
    header: JSON.stringify(header, null, 2),
    payload: JSON.stringify(payload, null, 2),
    signature: signatureSeg,
    timeClaims,
  };
};
