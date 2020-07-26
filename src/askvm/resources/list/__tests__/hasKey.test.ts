import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { hasKey } from '../hasKey';

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
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, hasKey },
      values,
    },
    parse(code)
  );
}

test('hasKey', async () => {
  await expect(ask(`clientNames`)).resolves.toStrictEqual(values.clientNames);
  await expect(ask(`hasKey(clientNames, 'A')`)).resolves.toBe(false);
  await expect(ask(`hasKey(clientNames, 0)`)).resolves.toBe(true);
  await expect(ask(`hasKey(clientNames, '0')`)).resolves.toBe(true);
  await expect(ask(`hasKey(clientNames, 20)`)).resolves.toBe(false);
  await expect(ask(`revPerClient`)).resolves.toStrictEqual(values.revPerClient);
  await expect(ask(`hasKey(revPerClient, 'A')`)).resolves.toBe(true);
  await expect(ask(`hasKey(revPerClient, 136)`)).resolves.toBe(false);
  await expect(ask(`hasKey(revPerClient, 1)`)).resolves.toBe(false);
  await expect(ask(`hasKey(12, 1)`)).rejects.toThrow(
    'Expecting a list or an object in hasKey'
  );
});
