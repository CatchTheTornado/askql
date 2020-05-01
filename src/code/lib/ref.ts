import { call } from './call';
import type { tvalue } from './call';
import { string } from './string';

/** reference value (possibly nested) */
export function ref(...keys: string[]): tvalue {
  return call(string('r'), ...keys.map(string));
}
