import { any, boolean, lambda } from '../type';

test('any', () => {
  expect(any.validate(0)).toBe(true);
  expect(any.validate(false)).toBe(true);
  expect(any.validate(true)).toBe(true);
  expect(any.validate(() => {})).toBe(true);
});

test('boolean', () => {
  expect(boolean.validate(0)).toBe(false);
  expect(boolean.validate(false)).toBe(true);
  expect(boolean.validate(true)).toBe(true);
});

test('lambda', () => {
  expect(lambda(any).validate(0)).toBe(false);
  expect(lambda(any).validate(false)).toBe(false);
  expect(lambda(any).validate(() => {})).toBe(true);
});
