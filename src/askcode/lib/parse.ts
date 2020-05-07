import { askCode } from './askCode';
import { reduce } from './reduce';

export function parse(code: string) {
  return reduce(
    {
      node: (type, ...children) =>
        askCode({
          name: type,
          params: children,
        }),
      id: (type) =>
        askCode({
          name: type,
        }),
      value: askCode,
    },
    code
  );
}
