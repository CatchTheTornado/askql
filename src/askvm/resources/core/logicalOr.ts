import { any, resource } from '../../lib';

export const logicalOr = resource({
  type: any,
  async resolver(a: any, b: any): Promise<any> {
    return a || b;
  },
});
