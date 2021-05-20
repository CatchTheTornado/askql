import { AskCode } from '../../askcode';
import { asyncMap } from '../../utils';
import { Options as RunOptions, runUntyped } from './run';
import * as types from './type';
import { any, Type } from './type';
import { typed, untyped } from './typed';

type ResourceOptions<T, A extends any[]> = Partial<Resource<T, A>>;

/**
 * Resource is the basic value wrapper in AskCode.
 */
export class Resource<T, A extends any[]> {
  constructor(...options: ResourceOptions<T, A>[]) {
    Object.assign(
      this,
      {
        argsType: new Type(...options.map((o) => o.argsType)),
        type: new Type(...options.map((o) => o.type)),
      },
      ...options.map(({ argsType, type, ...rest }) => rest)
    );
  }

  // extends TypedValue ?
  readonly name: string = 'resource';
  readonly type: Type<T> = any;
  readonly argsType: Type<A> = any; // empty list

  async resolver(...argsOrParams: A): Promise<T> {
    throw new Error('This resource requires resolver to be defined');
  }

  async compute(options: RunOptions, code: AskCode, args?: A): Promise<T> {
    const resolverArgs = await asyncMap(code.params ?? args ?? [], (param) =>
      runUntyped(options, param)
    );

    return this.resolver(...untyped(typed(resolverArgs, this.argsType)));
  }
}

export function resource<T, A extends any[]>(
  ...options: ResourceOptions<T, A>[]
) {
  return new Resource(...options);
}

/**
 * Resource factory generates the resource wrappers around all the methods which are on `whitelist` of the `module` passed. Implementation of https://github.com/CatchTheTornado/askql/issues/580 for limited JS function calls inside AskScript
 * @param module JS object which methods will be wrapped as resource handlers
 * @param whitelist list of strings including function/method names of the module to be wrapped out
 */
export function factory(
  jsModule: any,
  whitelist: string[]
): Record<string, Resource<any, any>> {
  const res: Record<string, Resource<any, any>> = {};
  Object.keys(jsModule).forEach((k) => {
    if (whitelist.includes(k)) {
      res[k] = resource({
        type: any,
        async resolver(...args: any) {
          return jsModule[k](...args);
        },
      });
    }
  });
  return res;
}
export type Resources = Record<string, Resource<any, any>>;
