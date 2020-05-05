import { Options, run, AskCode } from '../lib/run';

test('sum', () => {
  const options: Options<'number' | 'sum', number> = {
    resolvers: {
      number({ node }) {
        return Number(node.children![0]);
      },
      sum({ node, run }) {
        const args = node.children!.map((child) => run(child));
        return args.reduce((result, arg) => result + arg, 0);
      },
    },
    valueResolver: 'number',
  };
  expect(
    run(options, {
      type: 'sum',
      children: ['2', '2'],
    })
  ).toBe(4);
  expect(
    run(options, {
      type: 'sum',
      children: [
        '2',
        {
          type: 'sum',
          children: ['3', '4'],
        },
      ],
    })
  ).toBe(9);
});

test('program', () => {
  interface Type<T> {
    name: string;
    prototype: null | Type<T>;
    validate: (value: any) => value is T;
  }

  const any: Type<any> = {
    name: 'any',
    prototype: null,
    validate: (value): value is any => true,
  };

  const typeType: Type<any> = {
    name: 'type',
    prototype: any,
    validate: (value): value is any => true,
  };

  const empty: Type<null> = {
    name: 'empty',
    prototype: null,
    validate: (value): value is null => value == null,
  };

  const boolean: Type<boolean> = {
    name: 'boolean',
    prototype: any,
    validate: (value): value is boolean => typeof value === 'boolean',
  };

  const string: Type<string> = {
    name: 'string',
    prototype: any,
    validate: (value): value is string => typeof value === 'string',
  };

  type Typed<T> = { type: any; value: T };

  const basicTypes = [empty, boolean, string];

  function typed(value: any, type?: any): Typed<any> {
    if (value && typeof value.type !== 'undefined') {
      // if already a typed value, don't wrap again
      return value;
    }
    if (type) {
      return { value, type };
    }
    if (value != null && typeof value.prototype !== 'undefined') {
      return { value, type: typeType };
    }
    for (let index in basicTypes) {
      if (basicTypes[index].validate(value)) {
        return { value, type: basicTypes[index] };
      }
    }
    return { value, type: any };
  }

  const options: Options<
    'any' | 'empty' | 'true' | 'boolean' | 'typed' | 'call' | 'fun',
    Typed<any>
  > = {
    resolvers: {
      empty() {
        return typed(null);
      },
      any() {
        return typed(any);
      },
      boolean() {
        return typed(boolean);
      },
      true() {
        return typed(true);
      },
      typed({ node, run }) {
        const [valueChild, typeChild] = node.children!;
        const value =
          typeof valueChild === 'string' ? valueChild : run(valueChild);
        const type = typeChild ? run(typeChild) : undefined;
        return typed(value, type);
      },
      call({ node, run }) {
        const [funChild, ...argChildren] = node.children!;
        const args = argChildren!.map((child) => run(child)); // TODO run arg assert
        const result = run(funChild, args);
        return typed(result); // TODO add result type
      },
      fun({ node, run, options }) {
        if (!options.args) {
          return typed(false); // function
        }

        // TODO add arguments in scope
        let result;
        const { children = [] } = node;
        for (let i = 0; i < children.length; i += 1) {
          const child = children[i];
          result = run(child);
        }
        return typed(result);
      },
    },
    valueResolver: 'typed',
  };
  const evaluate = (code: AskCode<keyof typeof options.resolvers>): any =>
    run(options, code);

  expect(
    evaluate({
      type: 'call',
      children: [
        {
          type: 'fun',
          children: ['1', '2', '3'],
        },
      ],
    })
  ).toStrictEqual(typed('3'));
});
