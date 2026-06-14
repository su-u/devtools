import { base64UrlDecode, decodeJwt } from '@/app/jwt_decoder/jwtDecoderLib';

// jwt.io のサンプルトークン（HS256）
const SAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
  '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('base64UrlDecode', () => {
  it('base64url を UTF-8 文字列にデコード', () => {
    // {"name":"あ"} を base64url 化したもの
    expect(base64UrlDecode('eyJuYW1lIjoi44GCIn0')).toBe('{"name":"あ"}');
  });
  it('パディング不要なヘッダーをデコード', () => {
    expect(base64UrlDecode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).toBe(
      '{"alg":"HS256","typ":"JWT"}',
    );
  });
});

describe('decodeJwt', () => {
  it('ヘッダーとペイロードを整形 JSON で返す', () => {
    const result = decodeJwt(SAMPLE);
    expect(JSON.parse(result.header)).toEqual({ alg: 'HS256', typ: 'JWT' });
    expect(JSON.parse(result.payload)).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });
    expect(result.signature).toBe('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  });

  it('整形 JSON はインデント付き', () => {
    const result = decodeJwt(SAMPLE);
    expect(result.header).toContain('\n  "alg"');
  });

  it('時刻クレーム(iat)を抽出', () => {
    const result = decodeJwt(SAMPLE);
    expect(result.timeClaims).toEqual([{ key: 'iat', label: '発行日時 (iat)', value: 1516239022 }]);
  });

  it('複数の時刻クレームを順序通りに抽出', () => {
    // {"iat":1000,"exp":2000,"nbf":1500}
    const payload = 'eyJpYXQiOjEwMDAsImV4cCI6MjAwMCwibmJmIjoxNTAwfQ';
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.sig`;
    const result = decodeJwt(token);
    expect(result.timeClaims.map((c) => c.key)).toEqual(['iat', 'exp', 'nbf']);
  });

  it('空入力は throw', () => {
    expect(() => decodeJwt('   ')).toThrow();
  });

  it('パート数が3でない場合は throw', () => {
    expect(() => decodeJwt('aaa.bbb')).toThrow('3パート');
  });

  it('JSONとして不正なペイロードは throw', () => {
    // ペイロードが "not-json"（base64url: bm90LWpzb24）
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.bm90LWpzb24.sig';
    expect(() => decodeJwt(token)).toThrow('ペイロード');
  });
});
