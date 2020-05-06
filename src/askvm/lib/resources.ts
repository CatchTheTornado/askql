import { AskNode } from '../../askcode';
import { boolean, lambda, string, typed, untyped } from './typed';

const empty = {
  type: boolean,
  resolver: () => null,
};

export const resources: Record<string, any> = {
  empty,
  null: empty,
  typed: {
    type: lambda(string, string),
    evaluate({ node, evaluate }: any) {
      const value = evaluate(node.children[0]);
      const type = evaluate(node.children[1]);
      return typed(value, type);
    },
  },
  string,
  false: {
    type: boolean,
    resolver: () => false,
  },
  true: {
    type: boolean,
    resolver: () => true,
  },
  not: {
    type: lambda(boolean, boolean),
    resolver(a: boolean): boolean {
      return !a;
    },
  },
  sum: {
    type: lambda(string, string),
    resolver(a: any, b: any): any {
      return String(Number(a.value) + Number(b.value));
    },
  },
  list: {
    type: lambda(string, string),
    resolver(...args: any[]): any {
      return [...args]; // typed
    },
    evaluate({ node, evaluate, options }: any) {
      return this.resolver(
        ...node.children.map((child: any) => evaluate(child))
      );
    },
  },
  object: {
    type: lambda(string, string),
    resolver(...args: any[]): any {
      const result: Record<string, any> = {};
      for (let i = 0; i + 1 < args.length; i += 2) {
        result[String(args[i])] = args[i + 1];
      }
      return result; // typed
    },
    evaluate({ node, evaluate, options }: any) {
      // TODO allow bare identifiers instead of string (syntax sugar)
      // TODO accept list of pairs from syntax sugar
      return this.resolver(
        ...node.children.map((child: any) => evaluate(child)).map(untyped)
      );
    },
  },
  map: {
    type: lambda(string, string),
    resolver(...values: any[]): any {
      const map = new Map();
      if (!values || values.length % 2 === 1) {
        throw new Error('Maps need to have an even number of children');
      }
      for (let i = 0; i < values.length; i += 2) {
        map.set(values[i], values[i + 1]);
      }
      return map; // typed
    },
    evaluate({ node, evaluate, options }: any) {
      // TODO allow bare identifiers instead of string (syntax sugar)
      // TODO accept list of pairs from syntax sugar
      return this.resolver(
        ...node.children.map((child: any) => evaluate(child)).map(untyped)
      );
    },
  },
  fun: {
    type: lambda(string, string),
    resolver(...args: any[]): any {
      return typed([...args]);
    },
    evaluate({ node, evaluate, options, args }: any) {
      if (!args) {
        return typed(node); // TODO typed musi rozumieć tę strukturę
      }

      // create scope for this function
      node.scope = {};

      // TODO add arguments in scope with assertion
      let result;
      const { children = [] } = node;
      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        result = evaluate(child);
      }
      return typed(result);
    },
  },
  call: {
    type: lambda(string, string),
    evaluate({ node, evaluate }: any) {
      const [funChild, ...argChildren] = node.children!;
      const args = argChildren!.map((child: any) => evaluate(child));
      const result = evaluate(funChild, args);
      return typed(result); // TODO add result type
    },
  },
  get: {
    type: lambda(string, string),
    evaluate({ node, evaluate, args }: any) {
      const [child] = node.children!;
      const name = evaluate(child, args);
      return evaluate({ type: untyped(name) }, args);
    },
  },
  let: {
    type: lambda(string, string),
    evaluate({ node, evaluate }: any) {
      const { children = [] } = node;
      const value = evaluate(children[1]);
      const key = evaluate(children[0]);

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
};

export function getScope<Key extends keyof any>(node?: AskNode<Key>): any {
  if (!node) {
    return resources;
  }

  if (node.type !== 'fun') {
    return getScope(node.parent);
  }

  return node.scope!;
}
