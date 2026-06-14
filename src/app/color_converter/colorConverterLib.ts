export type RGBA = {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a: number; // 0-1
};

export type ColorResult = {
  hex: string; // #RRGGBB / #RRGGBBAA
  rgb: string; // rgb(r, g, b) / rgba(r, g, b, a)
  hsl: string; // hsl(h, s%, l%) / hsla(h, s%, l%, a)
  preview: string; // プレビュー用の CSS カラー文字列
};

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

/** アルファ値を小数2桁に丸める（1 や 0 は整数表記） */
const roundAlpha = (a: number): number => Math.round(a * 100) / 100;

/** RGB の各チャンネル（数値 or パーセント）を 0-255 にパースする */
const parseChannel = (s: string): number => {
  if (s.endsWith('%')) {
    const pct = parseFloat(s);
    if (Number.isNaN(pct)) throw new Error('RGBの形式が正しくありません。');
    return Math.round((clamp(pct, 0, 100) / 100) * 255);
  }
  const n = parseFloat(s);
  if (Number.isNaN(n)) throw new Error('RGBの形式が正しくありません。');
  return clamp(Math.round(n), 0, 255);
};

/** アルファ値（数値 or パーセント）を 0-1 にパースする */
const parseAlpha = (s: string): number => {
  const n = parseFloat(s);
  if (Number.isNaN(n)) throw new Error('アルファ値の形式が正しくありません。');
  return s.endsWith('%') ? clamp(n / 100, 0, 1) : clamp(n, 0, 1);
};

/** パーセント（0-100%）を 0-1 にパースする */
const parsePercent = (s: string): number => {
  const n = parseFloat(s);
  if (Number.isNaN(n)) throw new Error('HSLの形式が正しくありません。');
  return clamp(n, 0, 100) / 100;
};

/** 16進数カラーコード（#省略可・3/4/6/8桁）を RGBA にパースする */
export const parseHex = (input: string): RGBA => {
  const hex = input.trim().replace(/^#/, '').toLowerCase();
  if (!/^([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(hex)) {
    throw new Error('16進数カラーコードの形式が正しくありません。');
  }
  const short = hex.length === 3 || hex.length === 4;
  const at = (i: number) => (short ? hex[i] + hex[i] : hex.slice(i * 2, i * 2 + 2));
  const r = parseInt(at(0), 16);
  const g = parseInt(at(1), 16);
  const b = parseInt(at(2), 16);
  const hasAlpha = hex.length === 4 || hex.length === 8;
  const a = hasAlpha ? parseInt(at(3), 16) / 255 : 1;
  return { r, g, b, a };
};

/** rgb() / rgba() 文字列を RGBA にパースする */
export const parseRgb = (input: string): RGBA => {
  const m = input.match(/^rgba?\(([^)]+)\)$/i);
  if (!m) throw new Error('RGBの形式が正しくありません。');
  const parts = m[1].split(/[,/\s]+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 4) throw new Error('RGBの形式が正しくありません。');
  const a = parts[3] !== undefined ? parseAlpha(parts[3]) : 1;
  return {
    r: parseChannel(parts[0]),
    g: parseChannel(parts[1]),
    b: parseChannel(parts[2]),
    a,
  };
};

/** hsl() / hsla() 文字列を RGBA にパースする */
export const parseHsl = (input: string): RGBA => {
  const m = input.match(/^hsla?\(([^)]+)\)$/i);
  if (!m) throw new Error('HSLの形式が正しくありません。');
  const parts = m[1].split(/[,/\s]+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 4) throw new Error('HSLの形式が正しくありません。');
  const h = parseFloat(parts[0]);
  if (Number.isNaN(h)) throw new Error('HSLの形式が正しくありません。');
  const s = parsePercent(parts[1]);
  const l = parsePercent(parts[2]);
  const a = parts[3] !== undefined ? parseAlpha(parts[3]) : 1;
  return { ...hslToRgb(h, s, l), a };
};

/** 入力形式を自動判別して RGBA にパースする */
export const parseColor = (input: string): RGBA => {
  const s = input.trim();
  if (s === '') throw new Error('色を入力してください。');
  const lower = s.toLowerCase();
  if (lower.startsWith('rgb')) return parseRgb(s);
  if (lower.startsWith('hsl')) return parseHsl(s);
  return parseHex(s);
};

/** HSL(h:0-360, s/l:0-1) を RGB(0-255) に変換する */
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hue < 60) [r1, g1, b1] = [c, x, 0];
  else if (hue < 120) [r1, g1, b1] = [x, c, 0];
  else if (hue < 180) [r1, g1, b1] = [0, c, x];
  else if (hue < 240) [r1, g1, b1] = [0, x, c];
  else if (hue < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
};

/** RGB(0-255) を HSL(h:0-360, s/l:0-100 の整数) に変換する */
export const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

/** RGBA を #RRGGBB（アルファが1未満なら #RRGGBBAA）に整形する */
export const toHexString = ({ r, g, b, a }: RGBA): string => {
  const h = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  let hex = `#${h(r)}${h(g)}${h(b)}`;
  if (a < 1) hex += h(a * 255);
  return hex.toUpperCase();
};

/** RGBA を rgb()／rgba() 文字列に整形する */
export const toRgbString = ({ r, g, b, a }: RGBA): string =>
  a < 1 ? `rgba(${r}, ${g}, ${b}, ${roundAlpha(a)})` : `rgb(${r}, ${g}, ${b})`;

/** RGBA を hsl()／hsla() 文字列に整形する */
export const toHslString = ({ r, g, b, a }: RGBA): string => {
  const { h, s, l } = rgbToHsl(r, g, b);
  return a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${roundAlpha(a)})` : `hsl(${h}, ${s}%, ${l}%)`;
};

/** 入力（自動判別）を HEX / RGB / HSL へ一括変換する */
export const convertColor = (input: string): ColorResult => {
  const rgba = parseColor(input);
  return {
    hex: toHexString(rgba),
    rgb: toRgbString(rgba),
    hsl: toHslString(rgba),
    preview: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${roundAlpha(rgba.a)})`,
  };
};
