import * as askjsx from '..';
askjsx;

test('jsx', () => {
  const sum = <call name="sum" args={[4, 5]} />;
  expect(sum).toEqual({
    name: 'call',
    params: [{ name: 'get', params: ['sum'] }, 4, 5],
  });
});
