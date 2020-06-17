import { asyncMap } from '../../../utils';
import { any, resource, run, runUntyped } from '../../lib';
import { toAskCode, isAskCode } from '../../../askcode';

export const call = resource({
  type: any,
  async compute(options, code, args) {
    console.log(code.name, code.params, 'args:', args);

    if (!code.params && !args) {
      return code;
    }

    if (code.params && !Array.isArray(code.params)) {
      throw new Error(`Expecting array, got: ${code.params}`);
    }
    const [funChild, ...argChildren] = code.params ?? args ?? [];
    const fun =
      isAskCode(funChild) && !funChild.params
        ? funChild
        : await runUntyped(options, funChild);
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
