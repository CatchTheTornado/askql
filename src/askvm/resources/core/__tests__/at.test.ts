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
  it(`should throw when trying to access undefined property`, async function () {
    await expect(
      ask(
        `ask(const('myobject',object('title','Coco')),call(get('at'),get('myobject'),'description'))`
      )
    ).rejects.toThrow(
      `Requested property key was not defined so it is not possible to get its value.`
    );
  });

  it(`should throw when accessing index which is out of lists bounds.`, async function () {
    await expect(
      ask(`ask(const('myarray',array(1,2,3)),call(get('at'),get('myarray'),3))`)
    ).rejects.toThrow(`Index out of bounds mate.`);
  });
});
