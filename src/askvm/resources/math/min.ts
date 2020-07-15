import { flatten } from '../../../utils';
import { any, array, number, record, resource, union3 } from '../../lib';

const argsType = array(number);
argsType.itemType = union3(
  argsType,
  argsType.itemType,
  record(argsType.itemType)
) as any;

export const min = resource({
  type: any,
  argsType,
  async resolver(...numbers: number[]): Promise<number> {
    const flatNumbers = flatten(numbers, {
      arrays: true,
      objectValues: true,
    });
    return Math.min(...flatNumbers);
  },
});
