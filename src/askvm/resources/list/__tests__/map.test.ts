import { runUntyped } from '../../..';
import { parse } from '../../../../askcode';
import * as core from '../../core';
import { map } from '../map';
import { concat } from '../../string';
import { each } from '../each';

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  revPerClient: {
    A: 136,
    B: 426,
    C: 133,
    D: 35,
    E: 246,
    F: 446,
    G: 53,
  },
  value: 5,
};

function ask(code: string) {
  return runUntyped(
    {
      resources: { ...core, map, concat },
      values,
    },
    parse(code)
  );
}

test('map', async () => {
  await expect(
    ask(
      `map([1, 2, 3, 4], fun(let('c',get('$0')),let('i',get('$1')),call(get('get'),'i')))`
    )
  ).resolves.toStrictEqual([0, 1, 2, 3]);

  const namesWithPrefix = values.clientNames.map(
    (name: string) => (name = 'client ' + name)
  );
  await expect(
    ask(
      `map(clientNames, fun(let('c',get('$0')),let('i',get('$1')),call(get('concat'),'client ',call(get('get'),'c'))))`
    )
  ).resolves.toStrictEqual(namesWithPrefix);
});

test('map should not mutate the array', async () => {
  const array = [1, 2, 3, 4];

  const anotherArray = await map.resolver(array, (item: number) => item + 1);

  expect(array !== anotherArray).toEqual(true);
});
