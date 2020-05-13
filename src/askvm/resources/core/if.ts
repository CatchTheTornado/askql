import { any, resource, run, runUntyped } from '../../lib';

export const ifRes = resource({
  type: any,
  async compute(options, code, args) {
    const { params } = code;
    const [condition, thenFun, elseFun] = params!;
    const value = await runUntyped(options, condition);
    return run(options, value ? thenFun : elseFun, []);
  },
});
