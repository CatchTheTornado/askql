import { call } from './call';
import type { tvalue } from './call';
import { string } from './string';

export function set(value: tvalue, ...keys: string[]) {
  return call(string('s'), value, ...keys.map(string));
}
