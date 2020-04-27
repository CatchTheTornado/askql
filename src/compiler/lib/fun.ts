import { call, value } from './call';
import type { fun as func } from './call';
import { ref } from './ref';
import { set } from './set';
import { string } from './string';

/** create function which has no type checking */
export function funUnsafe(...expressions: value[]): func {
  return call(string('f'), ...expressions.map(string));
}

export function returnUnsafe(expression: value): value {
  return set(expression, 'frame', 'returnedValue');
}

export function fun(args: string[], ...expressions: value[]): func {
  if (expressions.length === 0) {
    throw new Error('Functions need to have at least one expression');
  }
  return funUnsafe(
    ...args.map((arg, index) => set(ref('frame', 'args', String(index)), arg)),
    ...expressions
  );
}
