import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '..';
import { at } from '../at';

const values = {};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, at },
      values,
    },
    parse(code)
  );
}

describe(`at`, function () {
  it(`Should retrieve a defined property from an object.`, async function () {
    await expect(
      ask(
        `ask(const('cocoObject',object('title','Coco')),call(get('at'),get('cocoObject'),'title'))`
      )
    ).resolves.toStrictEqual(`Coco`);
  });

  it(`Should throw when trying to access an undefined property of an object.`, async function () {
    await expect(
      ask(
        `ask(const('myobject',object('title','Coco')),call(get('at'),get('myobject'),'description'))`
      )
    ).rejects.toThrow(
      `Requested property key was not defined so it is not possible to get its value.`
    );
  });

  it(`Should retrieve an element from a list.`, async function () {
    await expect(
      ask(
        `ask(const('yummyList',list('Coco','Papaya','Mango')),call(get('at'),get('yummyList'),0))`
      )
    ).resolves.toStrictEqual(`Coco`);
  });

  it(`Should throw when accessing a nonnegative index which is out of lists bounds.`, async function () {
    await expect(
      ask(
        `ask(const('yummyList',list('coco','papaya','mango')),call(get('at'),get('yummyList'),3))`
      )
    ).rejects.toThrow(
      `Sorry, but index 3 is out of bounds for a list with 3 elements.`
    );
  });

  it(`Should throw when accessing a nonnegative index which is out of lists bounds.`, async function () {
    await expect(
      ask(
        `ask(const('yummyList',list('coco','papaya','mango')),call(get('at'),get('yummyList'),-1))`
      )
    ).rejects.toThrow(
      `Sorry, but index -1 is out of bounds for a list with 3 elements.`
    );
  });
});
