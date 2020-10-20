import { runUntyped } from '../../../index';
import * as core from '../../core';
import { parse } from '../../../../askcode/lib';
import { object } from '../object';

const values = {};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, object },
      values,
    },
    parse(code)
  );
}

describe(`object`, function () {
  it(`should return an object with key values`, async function () {
    const input = ['key1', 'value1', 'key2', 'value2'];
    const expectedOutput = {
      key1: 'value1',
      key2: 'value2',
    };
    await expect(object.resolver(...input)).toStrictEqual(expectedOutput);
  });

  it(`should allow for string properties`, async function () {
    const expectedResult = {
      'string property': 1,
      'another funky string': true,
    };
    await expect(
      ask(
        `ask(object('string property',1,'another funky string',call(get('true'))))`
      )
    ).resolves.toStrictEqual(expectedResult);
  });
});
