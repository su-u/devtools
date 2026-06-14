import { convertRadix, parseToBigInt, toBase } from '@/app/radix_converter/radixConverterLib';

describe('parseToBigInt', () => {
  it('10進数をパース', () => {
    expect(parseToBigInt('255', 10)).toBe(BigInt(255));
  });
  it('16進数をパース（大小文字混在）', () => {
    expect(parseToBigInt('Ff', 16)).toBe(BigInt(255));
  });
  it('2進数をパース', () => {
    expect(parseToBigInt('1010', 2)).toBe(BigInt(10));
  });
  it('負号に対応', () => {
    expect(parseToBigInt('-10', 10)).toBe(BigInt(-10));
  });
  it('大きな桁でも誤差なし', () => {
    expect(parseToBigInt('9007199254740993', 10)).toBe(BigInt('9007199254740993'));
  });
  it('不正な文字は throw', () => {
    expect(() => parseToBigInt('12', 2)).toThrow();
    expect(() => parseToBigInt('xyz', 16)).toThrow();
  });
  it('空文字は throw', () => {
    expect(() => parseToBigInt('   ', 10)).toThrow();
  });
});

describe('toBase', () => {
  it('各基数へ変換', () => {
    expect(toBase(BigInt(255), 2)).toBe('11111111');
    expect(toBase(BigInt(255), 8)).toBe('377');
    expect(toBase(BigInt(255), 16)).toBe('ff');
  });
});

describe('convertRadix', () => {
  it('10進数255を一括変換', () => {
    expect(convertRadix('255', 10)).toEqual({
      bin: '11111111',
      oct: '377',
      dec: '255',
      hex: 'FF',
    });
  });
  it('16進数 ff を一括変換', () => {
    expect(convertRadix('ff', 16)).toEqual({
      bin: '11111111',
      oct: '377',
      dec: '255',
      hex: 'FF',
    });
  });
  it('負の値', () => {
    expect(convertRadix('-10', 10)).toEqual({
      bin: '-1010',
      oct: '-12',
      dec: '-10',
      hex: '-A',
    });
  });
});
