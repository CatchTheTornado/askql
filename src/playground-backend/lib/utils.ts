export const json = (obj: any): string => {
  return JSON.stringify(obj, null, 2);
};

export const sendJson = (
  callback: any,
  statusCode: number,
  jsonData?: object
) => {
  callback(null, {
    statusCode,
    body: typeof jsonData === 'undefined' ? undefined : json(jsonData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
