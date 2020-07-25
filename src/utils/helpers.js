export const generateUID = (prefix, len) => {
  const randomId = Math.random().toString().substr(2, len);
  return `${prefix}_${randomId}`;
};
