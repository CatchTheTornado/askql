import { any, resource } from '../../lib';

export const logicalOr = resource({
  type: any,
  async resolver(a: boolean, b: boolean): Promise<boolean> {
    if (typeof a !== 'boolean' || typeof b !== 'boolean') {
      throw new Error('|| operator supports only boolean values');
    }
    return a || b;
  },
});
