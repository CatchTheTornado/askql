import { AskCodeOrValue, toAskCode, value } from './AskCode';
import { reduce } from './reduce';

export function parse(code: string) {
  return reduce<AskCodeOrValue>(
    {
      node: (type, ...children) =>
        toAskCode({
          name: type,
          params: children,
        }),
      id: (type) =>
        toAskCode({
          name: type,
        }),
      value: value,
    },
    code,
    {
      // logging: true,
    }
  );
}
