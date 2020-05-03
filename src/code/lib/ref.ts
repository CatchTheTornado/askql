import { call } from './call';
import type { tvalue } from './call';
import { json } from './json';

/** reference value (possibly nested) */
export function ref(...keys: string[]): tvalue {
  return call(json('r'), ...keys.map(json));
}
