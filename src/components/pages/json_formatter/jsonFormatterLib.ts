export const format = (text: string, space: number) => {
  try {
    return JSON.stringify(JSON.parse(text), null, toStrSpace(space))
  } catch (e) {
    console.error(e);
    return '';
  }
}

export const toStrSpace = (space: number): string => {
  let str = '';
  for (let i = 0; i < space; i++) {
    str += ' ';
  }
  return str;
}