import { logicalOr } from './logicalOr';
import { notEquals } from './notEquals';
import { not } from './not';

Object.assign(exports, {
  '||': logicalOr,
  '!=': notEquals,
  '!': not,
});

export * from './ask';
export * from './at';
export * from './call';
export * from './delay';
export { empty, empty as null } from './empty';
export * from './equals';
export { falseRes as false } from './false';
export * from './forIn';
export * from './forOf';
export { fragment as block, fragment as f, fragment } from './fragment';
export * from './fun';
export * from './get';
export { ifRes as if } from './if';
export * from './is';
export { letRes as let } from './let';
export { constRes as const } from './const';
export { assignRes as assign } from './assign';
export * from './list';
export * from './logicalOr';
export * from './not';
export * from './notEquals';
export * from './object';
export { node, query } from './query';
export { returnRes as return } from './return';
export { trueRes as true } from './true';
export { typedRes as typed } from './typed';
export { whileRes as while } from './while';
export { breakRes as break } from './break';
