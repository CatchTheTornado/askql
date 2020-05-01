import { call, value } from './call';
import { string } from './string';

export function set(value: value, ...keys: string[]) {
  return call(string('s'), value, ...keys.map(string));
}
