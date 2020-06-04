import { any, resource, runUntyped, Options } from '../../lib';

export const returnRes = resource({
  type: any,
  async compute(options, code) {
    const result = await runUntyped(options, code.params![0]);

    console.log('return', options);

    for (
      let prototype: Options | undefined = options;
      prototype;
      prototype = prototype?.prototype
    ) {
      prototype.result = result;
      const name = prototype.code?.name;
      if (name === 'fun' || name === 'ask') {
        break;
      }
    }

    return result;
  },
});
