import { extend } from '../extend';
import { runUntyped } from '../../../index';
import * as core from '../../core';
import { parse } from '../../../../askcode/lib';

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
      resources: { ...core, extend },
      values,
    },
    parse(code)
  );
}

describe(`extend`, function () {
  it(`should throw if not both arrays`, async function () {
    await expect(
      ask(`call(get('extend'), array1, object1)`)
    ).rejects.toThrowError('Expecting 2 arrays or 2 objects in extend');
  });

  it(`should extend an array`, async function () {
    const expectedResult = [...values.array1, ...values.array2];
    await expect(
      ask(`call(get('extend'), array1, array2)`)
    ).resolves.toStrictEqual(expectedResult);
  });

  it(`should throw if not both objects`, async function () {
    await expect(
      ask(`call(get('extend'), object1, array2)`)
    ).rejects.toThrowError('Expecting 2 arrays or 2 objects in extend');
  });

  it(`should throw if any is not an object`, async function () {
    await expect(ask(`call(get('extend'), object1, 5)`)).rejects.toThrowError(
      'Expecting 2 arrays or 2 objects in extend'
    );
    await expect(ask(`call(get('extend'), 5, object1)`)).rejects.toThrowError(
      'Expecting 2 arrays or 2 objects in extend'
    );
    await expect(ask(`call(get('extend'), 5, array2)`)).rejects.toThrowError(
      'Expecting 2 arrays or 2 objects in extend'
    );
  });

  it(`should extend an object`, async function () {
    const expectedResult = { ...values.object1, ...values.object2 };
    await expect(
      ask(`call(get('extend'), object1, object2)`)
    ).resolves.toStrictEqual(expectedResult);
  });
});
