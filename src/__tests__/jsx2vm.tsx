import * as askjsx from '../askjsx';
import { ask } from './lib';
askjsx;

test('jsx', () => {
  expect(2 + 2).toBe(4);
  // const sum = <call name="sum" args={[4, 5]} />;
  // expect(ask(sum)).toBe('9');
});
