import * as environment from './_environment';

declare var runUntyped: Function;
declare var source: string;

test('documentation01-complete_example', async () => {
  expect(2 + 2).toBe(4);
  // await expect(runUntyped(environment, source, [5])).resolves.toBe('121');
  // await expect(runUntyped(environment, parse(source), [5])).resolves.toBe(
  //   '121'
  // );
});
