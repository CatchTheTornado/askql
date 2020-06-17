import { toAskCode } from '../../../askcode';
import { any, resource, run, runUntyped, typed } from '../../lib';

export const get = resource({
  type: any,
  async compute(options, code, args) {
    console.log(code.name, code.params, 'args:', args);

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
