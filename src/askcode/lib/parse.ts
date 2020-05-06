import type { AskCode } from './AskCode';
import { reduce, Reducer } from './reduce';

const askCodeReducer: Reducer<AskCode<string>> = {
  node: (type, ...children) => ({ type, children }),
  id: (type) => ({ type }),
  value: (value: string) => value,
};

export function parse(code: string) {
  return reduce(askCodeReducer, code);
}
