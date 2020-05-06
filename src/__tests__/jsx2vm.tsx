import { parse } from '../askcode';
import * as jsx from '../askjsx';
import { run } from '../askvm';

test('jsx', () => {
  const program = <call name="sum" args={[<v>4</v>, <v>5</v>]} />;
  const sum = jsx.render(program);
  expect(run(parse(sum))).toBe('9');
});
