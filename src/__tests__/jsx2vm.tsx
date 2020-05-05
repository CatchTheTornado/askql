import * as jsx from '../askjsx';

test('jsx', () => {
  const x = jsx.render(<ref name="context" />);
  expect(2 + 2).toBe(4);
});
