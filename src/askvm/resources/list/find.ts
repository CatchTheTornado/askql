import { isAskCode } from '../../../askcode';
import { asyncFind } from '../../../utils';
import { any, resource, runUntyped } from '../../lib';

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
    return asyncFind(list, predicate);
  },
  async compute(options, { params }) {
    const [listChild, predChild] = params!;
    const list = await runUntyped(options, listChild);
    const pred = await runUntyped(options, predChild);
    if (!isAskCode(pred)) {
      throw new Error(`Cannot call ${String(pred)}`);
    }

    const predicate = (...args: any[]) => runUntyped(options, pred, args);
    return this.resolver!(list, predicate);
  },
});
