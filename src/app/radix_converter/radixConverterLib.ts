export type RadixResult = {
  bin: string; // 2進数
  oct: string; // 8進数
  dec: string; // 10進数
  hex: string; // 16進数
};

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';

/**
 * 文字列を指定基数(2〜36)の整数として BigInt にパースする。
 * 大きな桁でも誤差なく扱えるよう BigInt を使う。負号(+/-)に対応。
 */
export const parseToBigInt = (input: string, fromBase: number): bigint => {
  if (fromBase < 2 || fromBase > 36) {
    throw new Error('基数は2〜36の範囲で指定してください。');
  }
  let s = input.trim().toLowerCase();
  if (s === '') {
    throw new Error('値を入力してください。');
  }
  let negative = false;
  if (s.startsWith('-')) {
    negative = true;
    s = s.slice(1);
  } else if (s.startsWith('+')) {
    s = s.slice(1);
  }
  if (s === '') {
    throw new Error('不正な値です。');
  }
  let value = BigInt(0);
  const base = BigInt(fromBase);
  for (const ch of s) {
    const digit = DIGITS.indexOf(ch);
    if (digit < 0 || digit >= fromBase) {
      throw new Error(`${fromBase}進数として不正な文字「${ch}」が含まれています。`);
    }
    value = value * base + BigInt(digit);
  }
  return negative ? -value : value;
};

/** BigInt を指定基数の文字列に変換する(2〜36) */
export const toBase = (value: bigint, radix: number): string => value.toString(radix);

/** 入力値(fromBase)を 2/8/10/16 進数へ一括変換する */
export const convertRadix = (input: string, fromBase: number): RadixResult => {
  const value = parseToBigInt(input, fromBase);
  return {
    bin: toBase(value, 2),
    oct: toBase(value, 8),
    dec: toBase(value, 10),
    hex: toBase(value, 16).toUpperCase(),
  };
};
