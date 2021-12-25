export const comma = (num: string, separator: string = ',') => {
  const [integer, decimal] = num.split('.');
  let ret = integer.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separator}`);
  if (decimal) {
    ret += '.' + decimal;
  }
  return ret;
};
