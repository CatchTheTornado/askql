import { any, resource, typed } from '../../lib';

export const at = resource({
  type: any,
  async resolver(listOrObject: any, key: any): Promise<any> {
    if (!(key in listOrObject))
      throw Error(
        'Requested property key was not defined so it is not possible to get its value.'
      );
    return typed(listOrObject[key]);
  },
});
