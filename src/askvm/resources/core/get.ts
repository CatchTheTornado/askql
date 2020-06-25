import { toAskCode } from '../../../askcode';
import { any, resource, run, runUntyped, typed } from '../../lib';

export const get = resource({
  type: any,
  async compute(options, code, args) {
    if (!code.params && !args) {
      return code;
    }

    const [child] = code.params ?? args ?? [];
    const name = await runUntyped(options, child);
    if (typeof name !== 'string') {
      throw new Error('Get expect string as argument');
    }

    return run(options, toAskCode({ name }));
  },
});
