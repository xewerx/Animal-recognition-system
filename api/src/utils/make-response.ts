export const makeResponse = (message: unknown, statusCode: number) => {
  return {
    statusCode,
    body: JSON.stringify(message),
  };
};
