import { AskCode } from '../../askcode';
import { Options, run } from './run';
import { untyped } from './typed';
import { asyncMap } from '../../utils';

export class Resource<T, R extends (...args: any[]) => any = any> {
  readonly name?: string;
  readonly type?: any;
  readonly resolver!: R;

  async compute(
    options: Options,
    { params = [] }: AskCode,
    args?: any[]
  ): Promise<T> {
    if (!this.resolver) {
      throw new Error('No resolver!');
    }
    if (args) {
      // map(untyped); ?
      return this.resolver(...args);
    }
    const values = (await asyncMap(params, (param) => run(options, param))).map(
      untyped
    );
    return this.resolver(...values);
  }
}

export function resource<T, R extends (...args: any[]) => any = any>(
  resource: Partial<Resource<T, R>>
): Resource<T, R> {
  return Object.assign(new Resource(), resource);
}

export type Resources = Record<string, Resource<any>>;
