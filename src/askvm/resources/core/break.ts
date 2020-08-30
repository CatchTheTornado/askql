import { any, resource, Options } from '../../lib';

export const breakRes = resource({
  type: any,
  async compute(options, code) {
    let isWhileBlock = false;
    for (
      let prototype: Options | undefined = options;
      prototype;
      prototype = prototype?.prototype
    ) {
      prototype.break = true;
      if (isWhileBlock) {
        break;
      }
      if (prototype?.code?.parent?.name === 'while') {
        isWhileBlock = true;
      }

      const name = prototype.code?.name;
      if (name === 'fun' || name === 'ask') {
        throw new Error('Invalid Break use');
      }
    }
  },
});
