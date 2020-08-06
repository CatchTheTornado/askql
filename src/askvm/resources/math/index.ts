import { divideBy } from './divideBy';
import { minus } from './minus';
import { sum } from './sum';
import { times } from './times';
import { lessThan } from './lessThan';
import { lessThanOrEqual } from './lessThanOrEqual';
import { greaterThan } from './greaterThan';
import { greaterThanOrEqual } from './greaterThanOrEqual';
import { equals } from '../core';
import { mod } from './mod';
import { bitwiseAnd } from './bitwiseAnd';
import { bitwiseOr } from './bitwiseOr';

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

export * from './ceil';
export * from './floor';
export * from './divideBy';
export * from './lessThan';
export * from './lessThanOrEqual';
export * from './greaterThan';
export * from './greaterThanOrEqual';
export * from './max';
export * from './min';
export * from './minus';
export { sum as plus, sum } from './sum';
export { times as multiply, times } from './times';
export * from './toInt';
export * from './mod';
export * from './bitwiseAnd';
export * from './bitwiseOr';
