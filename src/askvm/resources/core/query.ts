import { askCode, toAskCode, isValue } from '../../../askcode';
import { fromEntries } from '../../../utils';
import { any, extendOptions, JSONable, resource, runUntyped } from '../../lib';

export const node = resource({
  type: any,
  async compute(options, code, args) {
    const [, valueGetter, ...children] = code.params!;
    const [arg]: (object | undefined)[] = args ?? [];
    const childOptions = extendOptions(options);
    Object.assign(childOptions.values!, arg);

    async function process(value?: JSONable) {
      if (
        typeof value === null ||
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        typeof value === 'string' ||
        Array.isArray(value)
      ) {
        return value;
      }

      return fromEntries<JSONable>(
        await Promise.all(
          children.map(
            async (child): Promise<[string, JSONable]> => {
              const [nameGetter] = askCode(child).params!; // TODO use runtime type from the VM lib here instead
              const nodeName = (await runUntyped(childOptions, nameGetter, [
                value,
              ])) as string;
              const nodeValue = await runUntyped(childOptions, child, [value]);
              return [nodeName, nodeValue];
            }
          )
        )
      );
    }

    const value = await runUntyped(childOptions, valueGetter);
    return Array.isArray(value)
      ? Promise.all(value.map(process))
      : process(value);
  },
});

export const query = resource({
  type: any,
  async compute(options, { params: children }) {
    return node.compute(
      options,
      toAskCode({
        name: 'node',
        params: ['value', {}, ...children!],
      })
    );
  },
});
