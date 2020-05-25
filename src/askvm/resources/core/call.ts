import { asyncMap } from '../../../utils';
import { any, resource, run } from '../../lib';

export const call = resource({
  type: any,
  async compute(options, { params }, args2) {
    // if (!Array.isArray(params)) {
    //   throw new Error(`Expecting array, got: ${params}`);
    // }
    const [funChild, ...argChildren] = params ?? args2 ?? [];
    const args = await asyncMap(argChildren, (child) => run(options, child));
    const result = await run(options, funChild, args ?? []);
    return result; // TODO add result type
  },
});
