import { any, resource, typed } from '../../lib';

export const at = resource({
  type: any,
  async resolver(listOrObject: any, key: any): Promise<any> {
    return typed(listOrObject[key]);
  },
});
