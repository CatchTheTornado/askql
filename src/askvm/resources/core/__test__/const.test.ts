import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { constRes } from '../const';

const values = {};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, constRes },
      values,
    },
    parse(code)
  );
}

describe(`const`, function () {
  it(`should assign value to a const variable on initialization`, async function () {
    const value = 6;
    await expect(
      ask(`ask(const('a',${value}),call(get('get'), 'a'))`)
    ).resolves.toEqual(value);
  });

  it(`should throw when trying to assign to const`, async function () {
    const value = 6;
    await expect(
      ask(`ask(const('a',${value}),call(get('get'),assign('a',4),'a'))`)
    ).rejects.toThrow(`Cannot assign to a constant variable "a"`);
  });

  const reservedWords = ['resources'];

  it(`should not allow reserved words as constant name`, async function () {
    for (let i = 0; i < reservedWords.length; i++) {
      const reservedWord = reservedWords[i];
      await expect(ask(`ask(const('resources',6))`)).rejects.toThrow(
        `Key "${reservedWord}" cannot be redeclared`
      );
    }
  });
});
