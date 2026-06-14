import {
  convertColor,
  hslToRgb,
  parseColor,
  parseHex,
  parseHsl,
  parseRgb,
  rgbToHsl,
  toHexString,
  toHslString,
  toRgbString,
} from '@/app/color_converter/colorConverterLib';

describe('parseHex', () => {
  it('6桁（#あり）', () => {
    expect(parseHex('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('6桁（#なし・大文字）', () => {
    expect(parseHex('00FF00')).toEqual({ r: 0, g: 255, b: 0, a: 1 });
  });
  it('3桁ショートハンド', () => {
    expect(parseHex('#0f0')).toEqual({ r: 0, g: 255, b: 0, a: 1 });
  });
  it('8桁（アルファ付き）', () => {
    expect(parseHex('#ff000080')).toEqual({ r: 255, g: 0, b: 0, a: 128 / 255 });
  });
  it('4桁ショートハンド（アルファ付き）', () => {
    expect(parseHex('#f00f')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('不正な桁数・文字は throw', () => {
    expect(() => parseHex('#fffff')).toThrow();
    expect(() => parseHex('#gg0000')).toThrow();
    expect(() => parseHex('')).toThrow();
  });
});

describe('parseRgb', () => {
  it('rgb()', () => {
    expect(parseRgb('rgb(255, 128, 0)')).toEqual({ r: 255, g: 128, b: 0, a: 1 });
  });
  it('rgba()', () => {
    expect(parseRgb('rgba(255, 128, 0, 0.5)')).toEqual({ r: 255, g: 128, b: 0, a: 0.5 });
  });
  it('スペース区切り + スラッシュアルファ', () => {
    expect(parseRgb('rgb(255 128 0 / 50%)')).toEqual({ r: 255, g: 128, b: 0, a: 0.5 });
  });
  it('パーセント指定のチャンネル', () => {
    expect(parseRgb('rgb(100%, 0%, 0%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('範囲外はクランプ', () => {
    expect(parseRgb('rgb(300, -10, 0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('不正形式は throw', () => {
    expect(() => parseRgb('rgb(255, 0)')).toThrow();
  });
});

describe('parseHsl', () => {
  it('hsl() を RGB へ', () => {
    expect(parseHsl('hsl(0, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('hsla()', () => {
    expect(parseHsl('hsla(120, 100%, 50%, 0.5)')).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
  });
  it('彩度0はグレースケール', () => {
    expect(parseHsl('hsl(0, 0%, 50%)')).toEqual({ r: 128, g: 128, b: 128, a: 1 });
  });
});

describe('hslToRgb / rgbToHsl', () => {
  it('hslToRgb 基本色', () => {
    expect(hslToRgb(240, 1, 0.5)).toEqual({ r: 0, g: 0, b: 255 });
  });
  it('rgbToHsl 基本色', () => {
    expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
  });
  it('白・黒', () => {
    expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
    expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
  });
});

describe('toHexString / toRgbString / toHslString', () => {
  it('アルファ1は #RRGGBB', () => {
    expect(toHexString({ r: 255, g: 0, b: 0, a: 1 })).toBe('#FF0000');
  });
  it('アルファ未満は #RRGGBBAA', () => {
    expect(toHexString({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('#FF000080');
  });
  it('rgb / rgba 出し分け', () => {
    expect(toRgbString({ r: 1, g: 2, b: 3, a: 1 })).toBe('rgb(1, 2, 3)');
    expect(toRgbString({ r: 1, g: 2, b: 3, a: 0.25 })).toBe('rgba(1, 2, 3, 0.25)');
  });
  it('hsl / hsla 出し分け', () => {
    expect(toHslString({ r: 255, g: 0, b: 0, a: 1 })).toBe('hsl(0, 100%, 50%)');
    expect(toHslString({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('hsla(0, 100%, 50%, 0.5)');
  });
});

describe('parseColor（自動判別）', () => {
  it('hex / rgb / hsl を判別', () => {
    expect(parseColor('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor('rgb(255,0,0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor('hsl(0,100%,50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });
  it('空文字は throw', () => {
    expect(() => parseColor('   ')).toThrow();
  });
});

describe('convertColor', () => {
  it('HEX 入力を一括変換', () => {
    expect(convertColor('#3498db')).toEqual({
      hex: '#3498DB',
      rgb: 'rgb(52, 152, 219)',
      hsl: 'hsl(204, 70%, 53%)',
      preview: 'rgba(52, 152, 219, 1)',
    });
  });
  it('RGB 入力を一括変換', () => {
    expect(convertColor('rgb(255, 255, 255)')).toEqual({
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      hsl: 'hsl(0, 0%, 100%)',
      preview: 'rgba(255, 255, 255, 1)',
    });
  });
  it('アルファ付きは各形式へ反映', () => {
    expect(convertColor('rgba(0, 0, 0, 0.5)')).toEqual({
      hex: '#00000080',
      rgb: 'rgba(0, 0, 0, 0.5)',
      hsl: 'hsla(0, 0%, 0%, 0.5)',
      preview: 'rgba(0, 0, 0, 0.5)',
    });
  });
});
