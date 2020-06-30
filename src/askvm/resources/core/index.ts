import { logicalOr } from './logicalOr';

Object.assign(exports, {
  '||': logicalOr,
});

export * from './ask';
export * from './at';
export * from './call';
export * from './delay';
export { empty, empty as null } from './empty';
export * from './equals';
export * from './each';
export { falseRes as false } from './false';
export * from './forIn';
export * from './forOf';
export { fragment as block, fragment as f, fragment } from './fragment';
export * from './fun';
export * from './get';
export { ifRes as if } from './if';
export * from './is';
export { letRes as let, letRes as const, letRes as assign } from './let';
export * from './list';
export * from './logicalOr';
export * from './map';
export * from './not';
export * from './object';
export { node, query } from './query';
export { returnRes as return } from './return';
export { trueRes as true } from './true';
export { typedRes as typed } from './typed';
export { whileRes as while } from './while';
