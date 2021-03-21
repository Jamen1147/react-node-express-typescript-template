export const parse = (value: unknown) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

export const stringify = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw Error(error);
  }
};
