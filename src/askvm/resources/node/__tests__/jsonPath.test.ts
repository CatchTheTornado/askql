import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { jsonPath } from '../jsonPath';

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
  value: 5,
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, jsonPath },
      values,
    },
    parse(code)
  );
}

test('jsonPath', async () => {
  await expect(
    ask(`call(get('jsonPath'),get('revPerClient'),'$.A')`)
  ).resolves.toStrictEqual([136]);
});
