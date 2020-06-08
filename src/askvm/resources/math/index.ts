import { divideBy } from './divideBy';
import { minus } from './minus';
import { sum } from './sum';
import { times } from './times';
import { lessThan } from './lessThan';

Object.assign(exports, {
  '+': sum,
  '-': minus,
  '*': times,
  '/': divideBy,
  '<': lessThan,
});

export * from './ceil';
export * from './floor';
export * from './divideBy';
export * from './lessThan';
export * from './max';
export * from './minus';
export { sum as plus, sum } from './sum';
export { times as multiply, times } from './times';
export * from './toInt';
