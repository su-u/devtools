import { toStrSpace, format } from './jsonFormatterLib';

describe('toStrSpace', () => {
  test('1', () => {
    expect(toStrSpace(1)).toBe(' ');
  });

  test('4', () => {
    expect(toStrSpace(4)).toBe('    ');
  });
});

describe('format', () => {
  test('success', () => {
    expect(format('{ "k": "v" }', 1)).toBe('{\n "k": "v"\n}');
  });
  test('failed input', () => {
    expect(format('aaaa', 4)).toBe('');
  });
});
