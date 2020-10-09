import { isAskCode } from '../../../askcode';
import { any, resource, runUntyped } from '../../lib';
import { asyncEach } from '../../../utils';

/**
 * This implements iterating over list of data - similar to Array.prototype.each in JavaScript
 */
export const each = resource<any, any[]>({
  type: any,
  async resolver(
    list: any[],
    predicate: (value: any, key?: number, list?: any[]) => Promise<boolean>
  ): Promise<any> {
    if (!Array.isArray(list)) {
      throw new Error('Expecting an array in each');
    }
    return asyncEach(list, predicate);
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
