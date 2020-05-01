import { call, value } from './call';
import type { fun as func } from './call';
import { string } from './string';

/** create function which has no type checking */
export function funUnsafe(...expressions: value[]): func {
  return call(string('f'), ...expressions.map(string));
}
