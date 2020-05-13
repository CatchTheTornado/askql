import { asyncFind } from '../../../utils';
import { any, resource, runUntyped, typed } from '../../lib';

export const find = resource<any, any[]>({
  type: any,
  async resolver(
    list: any[],
    predicate: (value: any, key: number) => Promise<boolean>,
    notSetValue?: any
  ): Promise<any> {
    if (!Array.isArray(list)) {
      throw new Error('Expecting an array in find');
    }

    const result = await asyncFind(list, predicate);
    return result;
  },
  async compute(options, { params }) {
    const list = await runUntyped(options, params![0]);
    const predicate = async (...args: any[]) => {
      return await runUntyped(
        options,
        params![1],
        args.map((arg) => typed(arg))
      );
    };
    return this.resolver!(list, predicate);
  },
});
