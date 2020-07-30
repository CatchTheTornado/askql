import { any, resource } from '../../lib';

export const hasKey = resource({
  type: any,
  async resolver(listOrObject: object, key: any): Promise<boolean> {
    if (listOrObject == null || typeof listOrObject !== 'object') {
      throw new Error('Expecting a list or an object in hasKey');
    }
    return key in listOrObject;
  },
});
