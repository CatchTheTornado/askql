import { isAskCode } from '../../../askcode';
import { asyncFind } from '../../../utils';
import { any, resource, runUntyped } from '../../lib';

const typesError = () => {
  throw new Error('Expecting 2 arrays or 2 objects in extend');
};

function asyncExtendArray(list: any[], listExtension: any[]) {
  return [...list, ...listExtension];
}

export const extend = resource<any, any[]>({
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

    if (Array.isArray(listExtension)) {
      return typesError();
    }

    return { ...list, ...listExtension };
  },
});
