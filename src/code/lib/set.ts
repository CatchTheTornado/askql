import { call } from './call';
import type { tvalue } from './call';
import { json } from './json';

export function set(value: tvalue, ...keys: string[]) {
  return call(json('s'), value, ...keys.map(json));
}
