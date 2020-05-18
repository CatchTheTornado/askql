import { AskCode } from '../../askcode';
import { asyncMap } from '../../utils';
import { Options as RunOptions, runUntyped } from './run';
import { any, Type } from './type';
import { typed, untyped } from './typed';

/**
 * Resource is the basic value wrapper in AskCode.
 */
export class Resource<T, A extends any[]> {
  // extends TypedValue ?
  readonly name!: string;
  readonly type!: Type<T>;
  readonly argsType!: Type<A>;

  async resolver(...argsOrParams: A): Promise<T> {
    throw new Error('This resource requires resolver to be defined');
  }

  async compute(options: RunOptions, code: AskCode, args?: A): Promise<T> {
    const resolverArgs =
      args ??
      (await asyncMap(code.params ?? [], (param) =>
        runUntyped(options, param)
      ));

    return this.resolver(...untyped(typed(resolverArgs, this.argsType)));
  }
}

const defaults: Pick<Resource<any, any>, 'type' | 'name' | 'argsType'> = {
  type: any,
  name: 'resource',
  argsType: any, // TODO empty list
};

export function resource<T, A extends any[]>(
  options?: Partial<Resource<T, A>>
): Resource<T, A> {
  return Object.assign(
    new Resource(),
    defaults as Partial<Resource<T, A>>,
    options
  );
}

export type Resources = Record<string, Resource<any, any>>;
