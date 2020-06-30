import { any, resource, run, runUntyped } from '../../lib';
import { isAskCode } from '../../../askcode';

export const forIn = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    if (!params || params?.length !== 3) {
      throw new Error('forIn expects exactly 3 params');
    }
    const [key, of, block] = params;
    if (key === null || of === null || block === null) {
      throw new Error('forIn expects non-null key, in and block');
    }
    if (!isAskCode(key)) {
      throw new Error('forIn expects key to be a statement');
    }
    if (!['let', 'const'].includes(key.name)) {
      throw new Error('forIn expects key to be a "let" or "const" statement');
    }
    if (!Array.isArray(key.params)) {
      throw new Error('forIn expects key to have params!');
    }

    const valueOf = await runUntyped(options, of);

    if (
      valueOf === null ||
      typeof valueOf == 'boolean' ||
      typeof valueOf == 'number'
    ) {
      throw new Error(
        'forIn expects "in" to be an array, an object or a string'
      );
    }

    const values: any[] =
      typeof valueOf === 'object'
        ? Object.keys(valueOf)
        : Array.from({ length: valueOf.length }, (value, key) => key);

    for (const value of values) {
      key.params[1] = value;
      await runUntyped(options, key);

      await runUntyped(options, block, []);
      if ('result' in options) {
        return null;
      }
    }
  },
});

export const forOf = forIn;
