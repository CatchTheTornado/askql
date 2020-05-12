import { typed, untyped } from '../typed';

test('typed', () => {
  expect(typed(5)).toHaveProperty('value', 5);
  expect(typed(5).type.name).toBe('int');
  expect(typed(5.01).type.name).toBe('float');
  expect(typed(() => {}).type.name).toBe('lambda');
});

test('untyped', () => {
  const value = {};
  expect(untyped(typed(value))).toStrictEqual(value);
});
