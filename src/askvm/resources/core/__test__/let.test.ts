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
  it(`should throw when trying to assign to const`, async function () {
    const value = 6;
    await expect(
      ask(`ask(const('a',${value}),call(get('get'),assign('a',4),'a'))`)
    ).rejects.toThrow(`Cannot assign to a constant variable "a"`);
  });

  it(`should assign value on initialization`, async function () {
    const value = 6;
    await expect(
      ask(`ask(let('a',${value}),call(get('get'), 'a'))`)
    ).resolves.toEqual(value);
  });

  it(`should assign value with the assign resource`, async function () {
    const initialValue = 6;
    const assignedValue = 4;
    const resolvedValue = await ask(
      `ask(let('a',${initialValue}),assign('a',${assignedValue}))`
    );
    expect(resolvedValue).toEqual(assignedValue);
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
