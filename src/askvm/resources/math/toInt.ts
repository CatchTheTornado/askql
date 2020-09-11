import { resource, int } from '../../lib';

export const toInt = resource({
  type: int,
  async resolver(value: any) {
    if ((typeof value === 'object' && value !== null) || isNaN(value)) {
      throw new Error('toInt is unable to convert given value to Integer.');
    }
    return Math.round(value);
  },
});
