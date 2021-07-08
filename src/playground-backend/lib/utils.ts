import { Resource } from '../../askvm/lib';
import { AskCodeOrValue } from '../../askcode/lib';
import { runUntyped } from '../../askvm';

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

export function logError(id: string, code: string, e: Error) {
  console.error(id + ' -- ' + new Date().toString());
  console.error(id + ' -- ' + code);
  console.error(id + ' -- ' + e);
  console.error('\n\n');
}

export async function compileAskCode(
  baseEnvironment: {
    values?: { [p: string]: any };
    customValues?: { [p: string]: any };
    resources: {
      [p: string]: Resource<any, any>;
    };
  },
  askCode: AskCodeOrValue
) {
  let result = await runUntyped(baseEnvironment, askCode, []);
  if (
    result === Infinity ||
    result === -Infinity ||
    (typeof result === 'number' && isNaN(result))
  ) {
    result = result.toString();
  }
  return result;
}
