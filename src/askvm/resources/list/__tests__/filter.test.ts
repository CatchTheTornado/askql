import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { filter } from '../filter';
import { greaterThan } from '../../math';

const values = {
  arrayValue: [1, 2, 3, 4, 5],
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, filter, greaterThan },
      values,
    },
    parse(code)
  );
}

test('filter', async () => {
  await expect(
    ask(
      `ask(call(get('filter'),list(1,2,3,4),fun(let('c',get('$0')),let('i',get('$1')),let('arr',get('$2')),call(get('greaterThan'),call(get('get'),'c'),2))))`
    )
  ).resolves.toStrictEqual([3, 4]);

  const threshold = 3;
  const expectedResult = values.arrayValue.filter((item) => item > threshold);
  await expect(
    ask(
      `ask(call(get('filter'),arrayValue,fun(let('c',get('$0')),let('i',get('$1')),let('arr',get('$2')),call(get('greaterThan'),call(get('get'),'c'),${threshold}))))`
    )
  ).resolves.toStrictEqual(expectedResult);
});
