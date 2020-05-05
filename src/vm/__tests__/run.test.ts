import { Options, run, AskCode, AskNode } from '../lib/run';

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

  interface LambdaType<R, A> extends Type<(arg: A) => R> {
    retType: Type<R>;
    argType: Type<A>;
  }

  function lambda<T, A>(retType: Type<T>, argType: Type<A>): LambdaType<T, A> {
    return {
      name: 'lambda',
      retType,
      argType,
      prototype: any,
      validate: (value): value is (arg: A) => T => typeof value === 'function',
    };
  }

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

  const resources: Record<string, any> = {
    false: {
      type: boolean,
      resolver: () => false,
    },
    myFun: {
      type: boolean,
      resolver: () => false,
    },
    not: {
      type: lambda(boolean, boolean),
      resolver: (a: boolean): boolean => !a,
    },
  };

  function getScope<Key extends keyof any>(node?: AskNode<Key>): any {
    if (!node) {
      return resources;
    }

    if (node.type !== 'fun') {
      return getScope(node.parent);
    }

    return node.scope!;
  }

  const options: Options<
    | 'any'
    | 'empty'
    | 'true'
    | 'boolean'
    | 'typed'
    | 'call'
    | 'fun'
    | 'get'
    | 'let',
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
        const args = argChildren!.map((child) => run(child));
        const result = run(funChild, args);
        return typed(result); // TODO add result type
      },
      fun({ node, run, options }) {
        if (!options.args) {
          return typed(node); // function
        }

        // create scope for this function
        node.scope = {};

        // TODO add arguments in scope with assertion
        let result;
        const { children = [] } = node;
        for (let i = 0; i < children.length; i += 1) {
          const child = children[i];
          result = run(child);
        }
        return typed(result);
      },
      get({ node, run, options }) {
        const { children = [] } = node;
        const key = run(children[0]);

        function isInScope(scope: Record<string, any>): boolean {
          if (!(key.value in scope)) {
            return false;
          }

          const res = scope[key.value];

          return true;
        }

        // get value of key from scope
        // visit nodes up to root to check scopes.
        // TODO if arguments are provided match with correct lambda
        let parent = node.parent;

        while (parent && (!parent.scope || !isInScope(parent.scope))) {
          parent = parent.parent;
        }
        const scope = parent?.scope ?? resources;
        if (!isInScope(scope)) {
          throw new Error(`Unknown resource ${key.value}`);
        }

        if (scope === resources) {
          const res = resources[key.value as keyof typeof resources];
          return typed(res.resolver, res.type).value(...(options.args ?? []));
        }

        const result = scope[key.value];
        if (result.type === 'fun' && options.args) {
          return run(result, options.args);
        }
        return result;
      },
      let({ node, run }) {
        const { children = [] } = node;
        const value = run(children[1]);
        const key = run(children[0]);

        if (key.type !== string) {
          throw new Error(`Expected set key to be string, got: ${key.type}`);
        }

        const scope = getScope(node);
        if (key.value in scope) {
          throw new Error(`Scope already has key ${key.value}`);
        }
        scope[key.value] = value;
        return value;
      },
    },
    valueResolver: 'typed',
  };
  const evaluate = (code: AskCode<keyof typeof options.resolvers>): any =>
    run(options, addParentInfo(code));

  expect(
    evaluate({
      type: 'call',
      children: [
        {
          type: 'fun',
          children: [
            {
              type: 'let',
              children: ['test', '5'],
            },
            {
              type: 'let',
              children: [
                'myFun',
                {
                  type: 'fun',
                  children: ['10'],
                },
              ],
            },
            '1',
            '2',
            '3',
            {
              type: 'call',
              children: [
                {
                  type: 'get',
                  children: ['myFun'],
                },
              ],
            },
          ],
        },
      ],
    })
  ).toStrictEqual(typed('10'));

  expect(
    evaluate({
      type: 'call',
      children: [
        {
          type: 'get',
          children: ['not'],
        },
        '10',
      ],
    })
  ).toStrictEqual(typed(false));
});

function addParentInfo<Key extends keyof any>(
  code: AskCode<Key>,
  parent?: AskNode<Key>
): AskCode<Key> {
  if (typeof code === 'string') {
    return code;
  }

  code.parent = parent;
  code.children?.forEach((child) => addParentInfo(child, code));
  return code;
}
