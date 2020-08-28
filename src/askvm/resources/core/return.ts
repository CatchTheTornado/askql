import { any, resource, runUntyped, Options } from '../../lib';

export const returnRes = resource({
  type: any,
  async compute(options, code) {
    const blockName = options.code?.name,
      isLoop = !(blockName === 'fun' || blockName === 'ask');
    if ('break' in options && isLoop) {
      return;
    }
    const result = await runUntyped(options, code.params![0]);

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
