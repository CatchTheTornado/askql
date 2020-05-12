import { any, resource, runUntyped, typed } from '../../lib';

export const typedRes = resource({
  type: any,
  async compute(options, code) {
    const value = await runUntyped(options, code.params![0]);
    const type = await runUntyped(options, code.params![1]);
    return typed(value, type);
  },
});
