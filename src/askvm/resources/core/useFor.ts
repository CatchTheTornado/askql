import { asyncMap } from '../../../utils';
import { any, resource, run, runUntyped } from '../../lib';
import { isAskCode } from '../../../askcode';

export const useFor = resource({
  type: any,
  async compute(options, code, argsRaw) {
    if (code.params && !Array.isArray(code.params)) {
      throw new Error(`Expecting array, got: ${code.params}`);
    }

    const args: any[] = code.params ?? argsRaw ?? [];
    if (args.length > 2) {
      throw new Error(
        `'useFor' is expecting only 2 arguments: a value and a function to be applied on the value, however additional ${
          args.length - 2
        } argument(s) were found`
      );
    }

    if (args.length < 2) {
      throw new Error(
        `'useFor' is expecting only 2 arguments: a value and a function to be applied on the value, however ${
          args.length - 2
        } were found`
      );
    }

    const [arg, funChild] = args;

    const fun = await runUntyped(options, funChild);
    if (!isAskCode(fun)) {
      throw new Error(`Cannot call ${String(fun)}`);
    }

    const funArgs = await asyncMap([arg], (child) => run(options, child));
    const result = await run(options, fun, funArgs);
    return result; // TODO add result type
  },
});
