import { typed, boolean, string, lambda } from './typed';

export const resources: Record<string, any> = {
  false: {
    type: boolean,
    resolver: () => false,
  },
  true: {
    type: boolean,
    resolver: () => true,
  },
  myFun: {
    type: boolean,
    resolver: () => false,
  },
  not: {
    type: lambda(boolean, boolean),
    resolver(a: boolean): boolean {
      return !a;
    },
  },
  sum: {
    type: lambda(string, string),
    // resolver works outside of the VM - doesn't accept any VM args?
    resolver(a: any, b: any): any {
      return String(Number(a.value) + Number(b.value));
    },
    // custom run which computes arguments and runs resolver
    // get VM args, process
  },
  // TODO list: typed(lambda(string, string), function() ...)
  list: {
    type: lambda(string, string),
    resolver(...args: any[]): any {
      return typed([...args]);
    },
    evaluate({ node, run, options }: any) {
      return [...node.children.map((child: any) => run(child))];
    },
  },
  fun: {
    type: lambda(string, string),
    resolver(...args: any[]): any {
      return typed([...args]);
    },
    evaluate({ node, run, options, args }: any) {
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
        result = run(child);
      }
      return typed(result);
    },
  },
  call: {
    type: lambda(string, string),
    resolver(...args: any[]): any {
      return typed([...args]);
    },
    evaluate({ node, run, options }: any) {
      const [funChild, ...argChildren] = node.children!;
      const args = argChildren!.map((child: any) => run(child));
      const result = run(funChild, args);
      return typed(result); // TODO add result type
    },
  },
};
