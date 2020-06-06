import { isAskCode, toAskCode } from '../../../askcode';
import { asyncMap } from '../../../utils';
import { any, resource, run, runUntyped } from '../../lib';

export const call = resource({
  type: any,
  async compute(options, code, args) {
    const [child, ...callParams] = code.params!;
    console.log('run', child);
    const name = await runUntyped(options, child);
    console.log({ name, code, child });

    if (isAskCode(name)) {
      const callArgs = await asyncMap(callParams, (child) =>
        run(options, child)
      );
      return run(options, name, callArgs);
    }

    if (typeof name !== 'string') {
      throw new Error('Get expect string as argument');
    }

    return run(options, toAskCode({ name, params: callParams }));
  },
});
