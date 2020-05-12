import { resource, any, runUntyped } from '../../lib';

export const returnRes = resource({
  type: any,
  async compute(options, code) {
    const result = await runUntyped(options, code.params![0]);
    (options as any).returnedValue = result; // IDEA return directly from this function
    return result;
  },
});
