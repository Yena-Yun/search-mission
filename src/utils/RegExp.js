export const RegExp = (data) => {
  return /^\s+|\s+$/g.test(data) || /([^가-힣a-z\x20])/i.test(data);
};
