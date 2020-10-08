import { any, resource } from '../../lib';

const typesError = () => {
  throw new Error('Expecting 2 arrays in arrayExtend');
};

function asyncExtendArray(list: any[], listExtension: any[]) {
  return [...list, ...listExtension];
}

export const arrayExtend = resource<any, any[]>({
  type: any,
  async resolver(list: any[] | {}, listExtension: any[] | {}): Promise<any> {
    if (typeof list !== 'object' || typeof listExtension !== 'object') {
      return typesError();
    }

    if (Array.isArray(list)) {
      if (!Array.isArray(listExtension)) {
        return typesError();
      }
      return asyncExtendArray(list, listExtension);
    }
  },
});
