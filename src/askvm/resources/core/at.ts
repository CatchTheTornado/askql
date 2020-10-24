import { any, resource, typed } from '../../lib';

export const at = resource({
  type: any,
  async resolver(listOrObject: any, key: any): Promise<any> {
    if (
      Array.isArray(listOrObject) &&
      Number.isInteger(key) &&
      (listOrObject.length <= key || key < 0)
    )
      throw Error(
        'Sorry, but index ' +
          key +
          ' is out of bounds for a list with ' +
          listOrObject.length +
          ' elements.'
      );

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
