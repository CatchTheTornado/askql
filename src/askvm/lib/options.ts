import { AskNode } from '../../askcode';
import { resources } from './resources';
import type { Options } from './run';
import { lambdaAny, string, typed } from './typed';
import type { Typed } from './typed';

export function getScope<Key extends keyof any>(node?: AskNode<Key>): any {
  if (!node) {
    return resources;
  }

  if (node.type !== 'fun') {
    return getScope(node.parent);
  }

  return node.scope!;
}

export const options: Options<
  'empty' | 'true' | 'map' | 'typed' | 'call' | 'fun' | 'get' | 'let',
  Typed<any>
> = {
  resolvers: {
    empty() {
      return typed(null);
    },
    true() {
      return typed(true);
    },
    map({ node, run }) {
      const map = new Map();
      if (!node.children || node.children.length % 2 === 1) {
        throw new Error('Maps need to have an even number of children');
      }
      const values = node.children!.map((child) => run(child));
      for (let i = 0; i < values.length; i += 2) {
        map.set(values[i], values[i + 1]);
      }
      return typed(map);
    },
    typed({ node, run }) {
      if (typeof node !== 'string') {
        throw new Error('Expected value to be string');
      }
      return typed(node);
      // TODO assert node is string
      // console.log('typed !', node);
      // const [valueChild, typeChild] = node.children!;
      // const value =
      //   typeof valueChild === 'string' ? valueChild : run(valueChild);
      // const type = typeChild ? run(typeChild) : undefined;
      // return typed(value, type);
    },
    call({ node, run, args }) {
      // call node.type

      const res = resources[node.type];
      if (!res) {
        throw new Error(`Unknown resource ${node.type}!`);
      }

      function baseEvaluate(this: any, { run, args }: any) {
        if (!args) {
          return res.resolver();
        }
        return res.resolver(args.map((arg: any) => run(arg)));
      }
      const { evaluate = baseEvaluate } = res;
      return evaluate({ node, run, options, args });

      // const [funChild, ...argChildren] = node.children!;
      // console.log('call!', node, funChild, argChildren);
      // const args = argChildren!.map((child) => run(child));
      // const result = run(funChild, argChildren as any);
      // return typed(result); // TODO add result type
      return 0;
    },
    fun({ node, run, options, args }) {
      if (!args) {
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
    get({ node, run, options, args }) {
      const { children = [] } = node;
      const key = run(children[0]);

      function isInScope(scope: Record<string, any>): boolean {
        if (!(key.value in scope)) {
          return false;
        }

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

        let argValues: any[] = [];
        if (args) {
          if (!Object.prototype.isPrototypeOf.call(lambdaAny, res.type)) {
            throw new Error('Given resource is not callable');
          }

          // compute args
          // argChildren!.map((child) => run(child));
          argValues = args;
          // argValues = args.map((arg) => typed(arg, res.type.argType));
        }
        function baseEvaluate(this: any, { run, args }: any) {
          if (!args) {
            return this.resolver();
          }
          return this.resolver(args.map((arg: any) => run(arg)));
        }
        const { evaluate = baseEvaluate } = res;
        return evaluate({ node, run, options, args });
        const result = res.resolver(...argValues);
        return typed(result, res.type.retType);
      }

      const result = scope[key.value];
      if (result.type === 'fun' && args) {
        return run(result, args);
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

      // execute zwraca argumenty dla tego zasobu
      // evaluate
      return value;
    },
  },
  valueResolver: 'typed',
};
