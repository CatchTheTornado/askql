import { call } from './call';
import type { tfun, tvalue } from './call';
import { string } from './string';

/** create function which has no type checking */
export function fun(...expressions: tvalue[]): tfun {
  return call(string('f'), ...expressions.map(string));
}
