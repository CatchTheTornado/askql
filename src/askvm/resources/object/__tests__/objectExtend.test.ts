import { runUntyped } from '../../../index';
import * as core from '../../core';
import { parse } from '../../../../askcode/lib';
import { objectExtend } from '../objectExtend';

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
      resources: { ...core, objectExtend },
      values,
    },
    parse(code)
  );
}

describe(`objectExtend`, function () {
  const errorMessage = 'Expecting 2 objects in objectExtend';

  it(`should throw if not both objects`, async function () {
    await expect(
      ask(`call(get('objectExtend'), object1, array2)`)
    ).rejects.toThrowError(errorMessage);
  });

  it(`should throw if any is not an object`, async function () {
    await expect(
      ask(`call(get('objectExtend'), object1, 5)`)
    ).rejects.toThrowError(errorMessage);
    await expect(
      ask(`call(get('objectExtend'), 5, object1)`)
    ).rejects.toThrowError(errorMessage);
    await expect(
      ask(`call(get('objectExtend'), 5, array2)`)
    ).rejects.toThrowError(errorMessage);
  });

  it(`should extend an object`, async function () {
    const expectedResult = { ...values.object1, ...values.object2 };
    await expect(
      ask(`call(get('objectExtend'), object1, object2)`)
    ).resolves.toStrictEqual(expectedResult);
  });
});
