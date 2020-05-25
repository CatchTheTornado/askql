import { any, resource, run, runUntyped } from '../../lib';

export const whileRes = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    const [condition, args2, block] = params!;
    const value = await runUntyped(options, condition);
    return run(options, value ? block : null, []);
  },
});
