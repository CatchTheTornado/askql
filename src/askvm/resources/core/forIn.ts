import { any, resource, run, runUntyped } from '../../lib';

export const forIn = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    const [condition, args2, block] = params!;
    const value = await runUntyped(options, condition);
    return run(options, value ? block : null, []);
  },
});

export const forOf = forIn;
