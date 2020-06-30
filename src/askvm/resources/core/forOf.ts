import { any, resource, run, runUntyped } from '../../lib';
import { isAskCode } from '../../../askcode';

export const forOf = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    if (!params || params?.length !== 3) {
      throw new Error('forOf expects exactly 3 params');
    }
    const [key, of, block] = params;
    if (key === null || of === null || block === null) {
      throw new Error('forOf expects non-null key, of and block');
    }
    if (!isAskCode(key)) {
      throw new Error('forOf expects key to be a statement');
    }
    if (!['let', 'const'].includes(key.name)) {
      throw new Error('forOf expects key to be a "let" or "const" statement');
    }
    if (!Array.isArray(key.params)) {
      throw new Error('forOf expects key to have params!');
    }

    const valueOf = await runUntyped(options, of);

    if (valueOf === null || ['boolean', 'number'].includes(typeof valueOf)) {
      throw new Error(
        'forOf expects "of" to be an array, an object or a string'
      );
    }

    const values: any[] =
      typeof valueOf === 'string' ? valueOf.split('') : Object.values(valueOf);

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
