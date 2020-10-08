import { any, resource } from '../../lib';

const typesError = () => {
  throw new Error('Expecting 2 objects in objectExtend');
};

export const objectExtend = resource<any, any[]>({
  type: any,
  async resolver(list: {}, listExtension: any[] | {}): Promise<any> {
    if (
      typeof list !== 'object' ||
      typeof listExtension !== 'object' ||
      Array.isArray(list) ||
      Array.isArray(listExtension)
    ) {
      return typesError();
    }

    return { ...list, ...listExtension };
  },
});
