import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { assignRes } from '../assign';

const values = {};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, assignRes },
      values,
    },
    parse(code)
  );
}

describe(`assign`, function () {
  it(`Should assign a value to a 'let' variable with the assign resource.`, async function () {
    const initialValue = 6;
    const assignedValue = 4;
    const resolvedValue = await ask(
      `ask(let('a',${initialValue}),assign('a',${assignedValue}))`
    );
    expect(resolvedValue).toEqual(assignedValue);
  });

  it(`Should throw when assigning a value to a constant variable.`, async function () {
    const constantName = 'favoriteConst';
    await expect(
      ask(
        `ask(const('${constantName}','Coconut'),assign('${constantName}','Wallnut'))`
      )
    ).rejects.toThrow(
      `Cannot assign to a constant variable "${constantName}" because it is a constant.`
    );
  });

  it(`Should throw when assigning a value to a non-declared variable.`, async function () {
    await expect(ask(`ask(assign('unrealisticCoco','Nut'))`)).rejects.toThrow(
      `Cannot assign to an unknown variable "unrealisticCoco"`
    );
  });

  it(`Should throw when assigning a value to a reserved keyword variable.`, async function () {
    const reservedWord = 'resources';
    await expect(
      ask(`ask(assign('${reservedWord}','CocoResource'))`)
    ).rejects.toThrow(
      `Key "resources" is a reserved keyword and cannot be assigned to.`
    );
  });
});
