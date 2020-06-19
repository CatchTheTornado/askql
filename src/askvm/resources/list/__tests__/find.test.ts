import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { find } from '../find';

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  revPerClient: {
    A: 136,
    B: 426,
    C: 133,
    D: 35,
    E: 246,
    F: 446,
    G: 53,
  },
  test: 5,
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, find },
      values,
    },
    parse(code)
  );
}

test('find', async () => {
  await expect(ask('call(fun(1),)')).resolves.toBe(1);
  await expect(ask('[1, 2, 3, 4]')).resolves.toStrictEqual([1, 2, 3, 4]);
  await expect(ask(`find([1, 2, 3, 4], fun(is(get('$0'), 3)))`)).resolves.toBe(
    3
  );
  await expect(ask(`test`)).resolves.toBe(5);
  await expect(ask(`clientNames`)).resolves.toStrictEqual(values.clientNames);
  await expect(ask(`revPerClient`)).resolves.toStrictEqual(values.revPerClient);
  await expect(ask(`find(clientNames, fun(is(get('$0'), 'A')))`)).resolves.toBe(
    'A'
  );
  await expect(ask(`call(fun(revPerClient))`)).resolves.toBe(
    values.revPerClient
  );

  expect(await ask(`call(find, clientNames, fun(is(get('$0'), 'A')))`)).toBe(
    'A'
  );
  expect(
    await ask(
      `call(get('find'), call(get('get'), 'clientNames'), fun(is(get('$0'), 'A')))`
    )
  ).toBe('A');
});
