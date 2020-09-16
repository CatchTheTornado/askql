import { equals } from '../core';
import { bitwiseAnd } from './bitwiseAnd';
import { bitwiseOr } from './bitwiseOr';
import { divideBy } from './divideBy';
import { greaterThan } from './greaterThan';
import { greaterThanOrEqual } from './greaterThanOrEqual';
import { lessThan } from './lessThan';
import { lessThanOrEqual } from './lessThanOrEqual';
import { minus } from './minus';
import { mod } from './mod';
import { sum } from './sum';
import { times } from './times';

Object.assign(exports, {
  '+': sum,
  '-': minus,
  '*': times,
  '/': divideBy,
  '<': lessThan,
  '<=': lessThanOrEqual,
  '>': greaterThan,
  '>=': greaterThanOrEqual,
  '==': equals,
  '%': mod,
  '&': bitwiseAnd,
  '|': bitwiseOr,
});

export * from './bitwiseAnd';
export * from './bitwiseOr';
export * from './ceil';
export * from './div';
export * from './divideBy';
export * from './floor';
export * from './greaterThan';
export * from './greaterThanOrEqual';
export * from './lessThan';
export * from './lessThanOrEqual';
export * from './max';
export * from './min';
export * from './minus';
export * from './mod';
export { sum as plus, sum } from './sum';
export { times as multiply, times } from './times';
export * from './toFloat';
export * from './toInt';

