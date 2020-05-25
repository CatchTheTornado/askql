import { any, resource, run, runUntyped } from '../../lib';

export const forRes = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    const [init, condition, final, block] = params!;
    const value = await runUntyped(options, condition);
    return run(options, value ? block : null, []);
  },
});
