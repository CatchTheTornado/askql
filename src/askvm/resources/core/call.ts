import { asyncMap } from '../../../utils';
import { any, resource, run, runUntyped } from '../../lib';
import { toAskCode, isAskCode } from '../../../askcode';

export const call = resource({
  type: any,
  async compute(options, code, args) {
    if (code.params && !Array.isArray(code.params)) {
      throw new Error(`Expecting array, got: ${code.params}`);
    }
    const [funChild, ...argChildren] = code.params ?? args ?? [];
    const fun = await runUntyped(options, funChild);
    if (!isAskCode(fun)) {
      throw new Error(`Cannot call ${String(fun)}`);
    }
    const argValues = await asyncMap(argChildren, (child) =>
      run(options, child)
    );
    const result = await run(options, fun, argValues ?? []);
    return result; // TODO add result type
  },
});
