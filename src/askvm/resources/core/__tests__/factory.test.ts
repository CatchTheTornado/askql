import { runUntyped } from '../../../index';
import { parse } from '../../../../askcode/lib';
import { factory } from '../../../lib/resource';
import * as core from '..';

const values = {};
const moduleToBeWrapped = {
  wrapMe1: () => {
    return 100;
  },
  wrapMe2: (arg: string) => {
    return arg;
  },
  dontWrapMe: () => {
    return 0;
  },
};
const wrappedResources = factory(moduleToBeWrapped, ['wrapMe1', 'wrapMe2']);

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, ...wrappedResources },
      values,
    },
    parse(code)
  );
}

describe(`factory`, function () {
  it(`factory should wrap only whitelisted resources`, async function () {
    await expect(
      Promise.resolve(Object.keys(wrappedResources))
    ).resolves.toStrictEqual(['wrapMe1', 'wrapMe2']);
  });
  it(`should wrap wrapMe1 js method and return 100`, async function () {
    const expectedResult = 100;
    await expect(ask(`ask(call(get('wrapMe1')))`)).resolves.toStrictEqual(
      expectedResult
    );
  });
  it(`should wrap wrapMe2 js method nad return arg`, async function () {
    const expectedResult = 'arg';
    await expect(
      ask(`ask(call(get('wrapMe2'), 'arg'))`)
    ).resolves.toStrictEqual(expectedResult);
  });
});
