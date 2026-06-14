import { generateUUIDs, getUUID } from '@/app/uuid/uuidLib';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('getUUID', () => {
  it('v4 を生成する', () => {
    expect(getUUID(4)).toMatch(UUID_RE);
  });

  it('version が文字列でも数値として扱う', () => {
    expect(getUUID('4' as unknown as number)).toMatch(UUID_RE);
  });

  it('不正な version は throw する', () => {
    expect(() => getUUID(undefined as unknown as number)).toThrow('不正なバージョンです。');
    expect(() => getUUID(2 as number)).toThrow('不正なバージョンです。');
  });
});

describe('generateUUIDs', () => {
  it('指定した数だけ生成する', () => {
    const uuids = generateUUIDs(4, 3, { isHyphen: true });
    expect(uuids).toHaveLength(3);
    uuids.forEach((u) => expect(u).toMatch(UUID_RE));
  });

  it('ハイフン除去・大文字化オプション', () => {
    const [u] = generateUUIDs(4, 1, { isHyphen: false, isUppercase: true });
    expect(u).not.toContain('-');
    expect(u).toBe(u.toUpperCase());
  });

  it('生成数が不正なら throw する', () => {
    expect(() => generateUUIDs(4, 0)).toThrow('生成数が不正です。');
    expect(() => generateUUIDs(4, undefined as unknown as number)).toThrow('生成数が不正です。');
  });
});
