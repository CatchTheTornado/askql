import { any, resource, Options } from '../../lib';

export const breakRes = resource({
  type: any,
  async compute(options, code) {
    for (
      let prototype: Options | undefined = options;
      prototype;
      prototype = prototype?.prototype
    ) {
      prototype.break = true;
      const name = prototype.code?.name;
      if (name === 'fun' || name === 'ask') {
        break;
      }
    }
  },
});
