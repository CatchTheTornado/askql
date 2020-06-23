import { any, resource, run, runUntyped } from '../../lib';

export const whileRes = resource({
  type: any,
  async compute(options, code) {
    const { params } = code;
    const [condition, block] = params!;
    const value = await runUntyped(options, condition);
    if (!value || 'result' in options) {
      return null;
    }
    await run(options, block, []);
    return run(options, code, []);
  },
});
