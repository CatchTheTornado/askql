import { runUntyped } from '../../../index';
import * as core from '../../core';
import { parse } from '../../../../askcode/lib';
import { arrayExtend } from '../arrayExtend';

const values = {
  array1: [1, 2, 3, 5],
  array2: [6, 7, 8, 9],
  object1: {
    x: 'y',
  },
  object2: {
    y: 'x',
  },
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, arrayExtend },
      values,
    },
    parse(code)
  );
}

describe(`extend`, function () {
  it(`should throw if not both arrays`, async function () {
    await expect(
      ask(`call(get('arrayExtend'), array1, object1)`)
    ).rejects.toThrowError('Expecting 2 arrays in arrayExtend');
  });

  it(`should extend an array`, async function () {
    const expectedResult = [...values.array1, ...values.array2];
    await expect(
      ask(`call(get('arrayExtend'), array1, array2)`)
    ).resolves.toStrictEqual(expectedResult);
  });
});
