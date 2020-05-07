import { runUntyped } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, Typed, typed } from '../../lib/typed';

type Value = Typed<any>;

export const find = resource<Value>({
  type: lambda(string, string),
  resolver(
    list: any[],
    predicate: (value: any, key: number) => boolean,
    notSetValue?: any
  ): any {
    if (!Array.isArray(list)) {
      throw new Error('Expecting an array in find');
    }

    return typed(list.find(predicate));
  },
  compute(options, { params }) {
    const list = runUntyped(options, params![0]);
    const predicate = (...args: any[]) =>
      runUntyped(options, params![1], args.map(typed));
    return this.resolver(list, predicate);
  },
});
