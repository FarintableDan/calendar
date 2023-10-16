export const spreadAll = (arr) =>
  arr.reduce((acc, item) => {
    return [...acc, item];
  }, []);
