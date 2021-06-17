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

export type Resources = Record<string, Resource<any, any>>;
