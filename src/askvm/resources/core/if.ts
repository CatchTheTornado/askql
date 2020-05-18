import { any, resource, run, runUntyped } from '../../lib';

export const ifRes = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    const [condition, thenBlock, elseBlock] = params!;
    const value = await runUntyped(options, condition);
    return run(options, value ? thenBlock : elseBlock, []);
  },
});
