import * as jsx from '../askjsx';
import { parse } from '../askcode';
import { run } from '../askvm';
import { AskElement } from '../jsx';

test('jsx', () => {
  const program = <call name="sum" args={[<v>4</v>, <v>5</v>]} />;
  const sum = jsx.render(program);
  expect(run(parse(sum))).toBe('9');
});
