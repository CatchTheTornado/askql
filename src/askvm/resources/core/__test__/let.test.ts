import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { letRes } from '../let';

const values = {};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, letRes },
      values,
    },
    parse(code)
  );
}

describe(`let`, function () {
  it(`should assign value to a let variable on initialization`, async function () {
    const value = 6;
    await expect(
      ask(`ask(let('cocoCount',${value}),get('cocoCount'))`)
    ).resolves.toEqual(value);
  });

  const reservedWords = ['resources'];

  it(`should not allow reserved words as variable name`, async function () {
    for (let i = 0; i < reservedWords.length; i++) {
      const reservedWord = reservedWords[i];
      await expect(ask(`ask(let('resources',6))`)).rejects.toThrow(
        `Key "${reservedWord}" cannot be redeclared`
      );
    }
  });
});
