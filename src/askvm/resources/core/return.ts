import { any, resource, runUntyped } from '../../lib';

export const returnRes = resource({
  type: any,
  async compute(options, code) {
    const result = await runUntyped(options, code.params![0]);

    for (
      let { prototype } = options;
      prototype;
      prototype = prototype?.prototype
    ) {
      prototype.result = result;
      if (prototype.code?.name === 'fun') {
        break;
      }
    }

    return result;
  },
});
