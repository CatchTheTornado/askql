import * as jsx from '..';

test('jsx', () => {
  const sum = jsx.render(<call name="sum" args={[<v>4</v>, <v>5</v>]} />);
  expect(sum).toBe('call(get("sum"),"4","5")');
});
