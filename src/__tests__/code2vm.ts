import { vm } from './lib';

test('code2vm', async () => {
  await expect(vm('list("1", "2" ,"3")')).resolves.toStrictEqual([
    '1',
    '2',
    '3',
  ]);
  await expect(vm('false')).resolves.toBe(false);
  await expect(vm('2')).resolves.toBe(2);
  await expect(vm('true')).resolves.toBe(true);
  await expect(vm('get("false")')).resolves.toBe(false);
  await expect(vm('get("true")')).resolves.toBe(true);
  await expect(vm(`{ 'a': 1 }`)).resolves.toStrictEqual({ a: 1 });
  await expect(vm(`call(fun(let('a', 5), a))`)).resolves.toStrictEqual(5);
  await expect(vm('call(fun("1"))')).resolves.toBe('1');

  // function as value
  await expect(vm('fun("1",fun("2"))')).resolves.toEqual({
    name: 'fun',
    params: [
      '1',
      {
        name: 'fun',
        params: ['2'],
      },
    ],
  });

  await expect(vm(`get('call')`)).resolves.toEqual({
    name: 'call',
  });
  expect(await vm(`call(get, 'call')`)).toEqual({
    name: 'call',
  });

  await expect(vm(`call(get('call'), fun(5))`)).resolves.toEqual(5);
  await expect(vm(`ask(call(get('call'), fun(5)))`)).resolves.toEqual(5);

  expect(await vm(`get('get')`)).toEqual({
    name: 'get',
  });

  // ask(call(get('times'), call(get('get'), 'score'), 2));
  expect(await vm(`call(times, 2, 4)`)).toEqual(8);

  // TODO uncomment
  // expect(await vm(`call(get('times'), 2, 4)`)).toEqual(8);
});

test('types', async () => {
  await expect(vm('typed(2)')).resolves.toBe(2);
  // expect(() => vm('typed(string, 2)')).toThrow();
});
