import { asyncMap } from '../../../utils';
import { any, resource, runUntyped } from '../../lib';

export const list = resource<any, any[]>({
  type: any,
  async resolver(...args) {
    return [...args];
  },
  async compute(options, { params: items }) {
    const itemValues = await asyncMap(items!, (item) =>
      runUntyped(options, item)
    );
    return this.resolver!(...itemValues);
  },
});
