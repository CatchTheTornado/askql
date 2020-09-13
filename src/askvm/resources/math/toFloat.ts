import { resource, float } from '../../lib';

export const toFloat = resource({
  type: float,
  async resolver(value: any) {
    if ((typeof value === 'object' && value !== null) || isNaN(value)) {
      throw new Error('toFloat is unable to convert given value to Float.');
    }
    return Number(value);
  },
});
