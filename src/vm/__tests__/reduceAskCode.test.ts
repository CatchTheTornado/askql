import { askCodeReducer, reduceAskCode, Reducer } from '../lib/reduceAskCode';

describe('reduceAskCode', () => {
  const reducer = askCodeReducer;
  test('parses expressions', () => {
    expect(reduceAskCode(reducer, ' "Hello world!" ')).toBe('"Hello world!"');
    expect(reduceAskCode(reducer, '""')).toBe('""');
    expect(reduceAskCode(reducer, '0')).toBe('0');
    expect(reduceAskCode(reducer, 'f')).toBeDefined();
    expect(reduceAskCode(reducer, 'f ( )')).toBe('f()');
    expect(reduceAskCode(reducer, 'f({ a, b, c })')).toBe('f({a,b,c})');
    expect(reduceAskCode(reducer, '{ a, b, c }')).toBe('{a,b,c}');
    expect(reduceAskCode(reducer, 'f(g(),{})')).toBe('f(g(),{})');
    expect(() => reduceAskCode(reducer, 'a,b,c')).toThrow();
    expect(() => reduceAskCode(reducer, '""0')).toThrow();
    expect(() => reduceAskCode(reducer, 'f ( , , , )   ')).toThrow();
    expect(() => reduceAskCode(reducer, '()')).toThrow();
    expect(() => reduceAskCode(reducer, 'f()()')).toThrow();
    expect(() => reduceAskCode(reducer, '{} {}')).toThrow();
    expect(() => reduceAskCode(reducer, '{ a b c }')).toThrow();
  });

  test('computes simple values', () => {
    const reducer: Reducer<(...args: any[]) => number> = {
      call: (fun, ...args) => () => fun.call(null, ...args.map((arg) => arg())),
      function: (...args) => reduceAskCode(reducer, args[args.length - 1]),
      number: (serialized) => () => Number(serialized),
      reference: (name) => (Math as any)[name],
      string: () => () => NaN,
    };
    expect(reduceAskCode(reducer, '{ 1, min(5, 2, 7) }')()).toBe(2);
    expect(reduceAskCode(reducer, '{ 1, min({ 5, 2, 7 }) }')()).toBe(7);
    expect(reduceAskCode(reducer, 'max(5, min(17, 9, 15), 7)')()).toBe(9);
  });
});

// [
//   {
//     // prototype,
//     ['firstName']: 'John',
//     lastName: 'Smith',
//   },
//   {
//     firstName: 'John',
//     lastName: 'Smith',
//   },
// ];
