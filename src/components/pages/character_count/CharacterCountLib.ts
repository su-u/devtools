import { obtainUnicode } from 'obtain-unicode';

// @see https://blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html
export const characterCountWithSpace = (text: string) => {
  return obtainUnicode(text).length
}

export const characterCountWithoutSpace = (text: string) => {
  const withoutSpace = text.replace(/\s+/gm, '');
  return obtainUnicode(withoutSpace).length
}

export const spaceCount = (text: string) => {
  const space = text.replace(/\S+/gm, '');
  return obtainUnicode(space).length
}

export const linesCount = (text: string) => {
  return text.split(/\r\n|\n|\r/gm).length;
}

export const fullWidthCharacterCount = (text: string) => {
  const fullWidthCharacters = Array.from(text.matchAll(/[^\x00-\x7E]+/gm)).join('');
  return obtainUnicode(fullWidthCharacters).length
}

export const halfWidthCharacterCount = (text: string) => {
  const halfWidthCharacters = Array.from(text.matchAll(/[ -~]/gm)).join('');
  return obtainUnicode(halfWidthCharacters).length
}