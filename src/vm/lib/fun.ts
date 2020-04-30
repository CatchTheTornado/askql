import { Context, Scope } from '..';
import { evaluate, source } from './evaluate';

export type funtype = ((context: Context, ...args: any[]) => any) & {
  userSpace: boolean;
  scope: Scope;
  block: boolean;
};

export function fun(context: Context, ...expressions: source[]): funtype {
  return Object.assign(
    (context: Context) => {
      let result;
      for (let i = 0; i < expressions.length; i += 1) {
        const expr = expressions[i];

        result = evaluate(expr, {
          operation: 'function call',
          context,
        });

        if (context.stack[context.stack.length - 1].returnedValue) {
          return context.stack[context.stack.length - 1].returnedValue;
        }
      }
      return result;
    },
    {
      userSpace: true,
      scope: {
        '[[Prototype]]': context.stack[context.stack.length - 1].scope,
      },
      block: false,
    }
  );
}
