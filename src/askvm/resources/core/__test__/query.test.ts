import { runUntyped } from '../../..';
import { AskCode, parse } from '../../../../askcode';
import * as core from '../../core';
import { query } from '../../core';

const values = {
  objectValue: {
    x: [1, 2, 3, 4],
  },
  stringValue: 'string',
  numberValue: 5,
  booleanValue: true,
  arrayVal: [1, 2, 3, 4],
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, query },
      values,
    },
    parse(code)
  );
}

describe('query', () => {
  it(`should return an array value`, async function () {
    const expectedValueForArray = {
      objectReturned: values.arrayVal,
    };

    const inLineArray = [1, 2, 3, 4];
    const expectedValueForInlineArray = {
      objectReturned: inLineArray,
    };

    const queryForAnArrayValue = `ask(query(node('objectReturned',f(call(get('get'),'arrayVal')))))`;
    const queryForInlineArray = `ask(query(node('objectReturned',f(list(${inLineArray.join(
      ','
    )})))))`;

    await expect(ask(queryForAnArrayValue)).resolves.toStrictEqual(
      expectedValueForArray
    );

    await expect(ask(queryForInlineArray)).resolves.toStrictEqual(
      expectedValueForInlineArray
    );
  });

  it(`should return a string value`, async function () {
    const expectedValue = {
      objectReturned: values.stringValue,
    };

    const queryForAString = `ask(query(node('objectReturned',f(call(get('get'),'stringValue')))))`;

    await expect(ask(queryForAString)).resolves.toStrictEqual(expectedValue);
  });

  it(`should return a number value`, async function () {
    const expectedValue = {
      objectReturned: values.numberValue,
    };

    const queryForANumber = `ask(query(node('objectReturned',f(call(get('get'),'numberValue')))))`;

    await expect(ask(queryForANumber)).resolves.toStrictEqual(expectedValue);
  });

  it(`should return a boolean value`, async function () {
    const expectedValue = {
      objectReturned: values.booleanValue,
    };

    const queryForABoolean = `ask(query(node('objectReturned',f(call(get('get'),'booleanValue')))))`;

    await expect(ask(queryForABoolean)).resolves.toStrictEqual(expectedValue);
  });
});
