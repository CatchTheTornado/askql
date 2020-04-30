import { call, value } from './call';
import { string } from './string';

/** reference value (possibly nested) */
export function ref(...keys: string[]): value {
  return call(string('r'), ...keys.map(string));
}
