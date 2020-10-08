import { isAskCode } from '../../../askcode';
import { any, resource, runUntyped } from '../../lib';
import { asyncMap } from '../../../utils';

export const map = resource<any, any[]>({
  type: any,
  async resolver(
    list: any[],
    predicate: (value: any, key?: number, list?: any[]) => Promise<boolean>
  ): Promise<any> {
    if (!Array.isArray(list)) {
      throw new Error('Expecting an array in map');
    }
    return asyncMap(list, predicate);
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
