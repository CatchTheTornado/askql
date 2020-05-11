import { AskCode } from '../../askcode';
import { asyncMap } from '../../utils';
import { Options, run } from './run';
import { untyped } from './typed';

export class Resource<T, R extends (...args: any[]) => Promise<T> = any> {
  readonly name?: string;
  readonly type?: any;
  readonly resolver?: R;

  async compute(options: Options, code: AskCode, args?: any[]): Promise<T> {
    if (!this.resolver) {
      throw new Error('No resolver!');
    }
    if (args) {
      // map(untyped); ?
      return this.resolver(...args);
    }
    const values = (
      await asyncMap(code.params ?? [], (param) => run(options, param))
    ).map(untyped);
    return this.resolver(...values);
  }
}

export function resource<T, R extends (...args: any[]) => Promise<T> = any>(
  resource: Partial<Resource<T, R>>
): Resource<T, R> {
  return Object.assign(new Resource(), resource);
}

export type Resources = Record<string, Resource<any>>;
