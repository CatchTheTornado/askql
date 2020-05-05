import { parse } from '../askcode';
import { run } from '../askvm';

test('code2vm', () => {
  const code = parse('list("1", "2" ,"3")');

  expect(run(code)).toStrictEqual(['1', '2', '3']);
});
