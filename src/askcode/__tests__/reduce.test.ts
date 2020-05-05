import { reduce, Reducer } from '../lib/reduce';

export const askCodeReducer: Reducer<string> = {
  node: (name, ...args) => `${name}(${args.join(',')})`,
  id: (name) => name,
  string: (value) => `"${value}"`,
};

describe('reduce', () => {
  const reducer = askCodeReducer;
  test('parses expressions', () => {
    expect(reduce(reducer, ' "Hello world!" ')).toBe('"Hello world!"');
    expect(reduce(reducer, '""')).toBe('""');
    expect(reduce(reducer, '0')).toBe('0');
    expect(reduce(reducer, 'f')).toBe('f');
    expect(reduce(reducer, 'f ( )')).toBe('f()');
    expect(reduce(reducer, 'f( a, b, c )')).toBe('f(a,b,c)');
    expect(reduce(reducer, 'f(g())')).toBe('f(g())');
    expect(() => reduce(reducer, 'a,b,c')).toThrow();
    expect(() => reduce(reducer, '""0')).toThrow();
    expect(() => reduce(reducer, 'f ( , , , )   ')).toThrow();
    expect(() => reduce(reducer, '()')).toThrow();
    expect(() => reduce(reducer, 'f()()')).toThrow();
    expect(() => reduce(reducer, '{}')).toThrow();
    expect(() => reduce(reducer, '{ a b c }')).toThrow();
  });

  test('computes simple values', () => {
    const reducer: Reducer<number> = {
      node: (name, ...args) => (Math as any)[name].call(null, ...args),
      id: (name) => (Math as any)[name],
      string: (value) => Number(value),
    };
    expect(reduce(reducer, 'min("5", "2")')).toBe(2);
    expect(reduce(reducer, 'max("5", min("17", "9", "15"), "7")')).toBe(9);
  });
});
