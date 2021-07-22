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