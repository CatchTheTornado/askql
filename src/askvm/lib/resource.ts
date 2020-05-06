import { AskCode } from '../../askcode';
import { Frame } from './step';
import { untyped } from './typed';

export class Resource<T, R extends (...args: any[]) => any = any> {
  readonly name?: string;
  readonly type?: any;
  readonly resolver!: R;

  compute(
    { params = [] }: AskCode,
    { args, options, step }: Frame<T, Resources>
  ): T {
    if (!this.resolver) {
      throw new Error('No resolver!');
    }
    if (args) {
      return this.resolver(...args);
    }
    const values = params.map((param) => step(options, param)).map(untyped);
    return this.resolver(...values);
  }
}

export function resource<T, R extends (...args: any[]) => any = any>(
  resource: Partial<Resource<T, R>>
): Resource<T, R> {
  return Object.assign(new Resource(), resource);
}

export type Resources = Record<string, Resource<any, any>>;
