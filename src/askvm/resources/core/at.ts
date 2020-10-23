import { any, resource, typed } from '../../lib';

export const at = resource({
  type: any,
  async resolver(listOrObject: any, key: any): Promise<any> {
    // TODO what is list comes as listOrObject
    // if the requested index is out of bounds, then 'out of bounds' error should be thrown

    if (Array.isArray(listOrObject) && listOrObject.length < 0 + key)
      throw Error('Index out of bounds.');
    if (
      listOrObject !== null &&
      typeof listOrObject === 'object' &&
      !(key in listOrObject)
    )
      throw Error(
        'Requested property key was not defined so it is not possible to get its value.'
      );
    return typed(listOrObject[key]);
  },
});
