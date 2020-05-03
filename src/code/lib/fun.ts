import { call } from './call';
import type { tfun, tvalue } from './call';
import { json } from './json';

/** create function which has no type checking */
export function fun(...expressions: tvalue[]): tfun {
  return call(json('f'), ...expressions.map(json));
}
