import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { map } from '../map';
import { concat } from '../../string';
import { each } from '../each';
import { plus } from '../../math';

const values = {
  arrayValue: [1, 2, 3, 4, 5],
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, each, plus },
      values,
    },
    parse(code)
  );
}

test('each', async () => {
  const expectedValue = values.arrayValue.reduce(
    (prev, curr, index) => prev + curr,
    0
  );
  await expect(
    ask(
      `ask(let('sum',0),call(get('each'),arrayValue,fun(let('c',get('$0')),let('i',get('$1')),assign('sum',call(get('plus'),call(get('get'),'sum'),call(get('get'),'c'))))),call(get('get'),'sum'))`
    )
  ).resolves.toEqual(expectedValue);
});
