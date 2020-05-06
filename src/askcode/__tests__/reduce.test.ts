import { reduce, Reducer } from '../lib/reduce';

export const askCodeReducer: Reducer<string> = {
  node: (name, ...args) => `${name}(${args.join(', ')})`,
  id: (name) => name,
  value: (value) => JSON.stringify(value),
};

describe('reduce', () => {
  const reducer = askCodeReducer;
  test('parses expressions', () => {
    expect(reduce(reducer, ' "Hello world!" ')).toBe('"Hello world!"');
    expect(reduce(reducer, ` 'Hello world!' `)).toBe('"Hello world!"');
    expect(reduce(reducer, '""')).toBe('""');
    expect(reduce(reducer, '0')).toBe('0');
    expect(reduce(reducer, '[0, 1, 2]')).toBe('list(0, 1, 2)');
    expect(reduce(reducer, 'f')).toBe('f');
    expect(reduce(reducer, 'f ( )')).toBe('f()');
    expect(reduce(reducer, 'f( a, b, c )')).toBe('f(a, b, c)');
    expect(reduce(reducer, '{ a: b, c: d }')).toBe('object(a, b, c, d)');
    expect(reduce(reducer, 'f(g())')).toBe('f(g())');
    expect(() => reduce(reducer, 'a,b,c')).toThrow();
    expect(() => reduce(reducer, '""0')).toThrow();
    expect(() => reduce(reducer, 'f ( , , , )   ')).toThrow();
    expect(() => reduce(reducer, '()')).toThrow();
    expect(() => reduce(reducer, 'f()()')).toThrow();
    expect(() => reduce(reducer, '{ a b c }')).toThrow();
  });

  test('computes simple values', () => {
    const reducer: Reducer<number> = {
      node: (name, ...args) => (Math as any)[name].call(null, ...args),
      id: (name) => (Math as any)[name],
      value: (value) => Number(value),
    };
    expect(reduce(reducer, 'min(5, 2)')).toBe(2);
    expect(reduce(reducer, 'max(5, min(17, 9, 15), 7)')).toBe(9);
  });
});
