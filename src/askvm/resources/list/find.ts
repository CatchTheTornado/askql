import { runUntyped } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, Typed, typed } from '../../lib/typed';
import { asyncFind } from '../../../utils';

type Value = Typed<any>;

export const find = resource<Value>({
  type: lambda(string, string),
  async resolver(
    list: any[],
    predicate: (value: any, key: number) => Promise<boolean>,
    notSetValue?: any
  ): Promise<any> {
    if (!Array.isArray(list)) {
      throw new Error('Expecting an array in find');
    }

    const result = typed(await asyncFind(list, predicate));
    return result;
  },
  async compute(options, { params }) {
    const list = await runUntyped(options, params![0]);
    const predicate = async (...args: any[]) => {
      return await runUntyped(options, params![1], args.map(typed));
    };
    return this.resolver(list, predicate);
  },
});
