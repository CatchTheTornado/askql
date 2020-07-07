import { boolean, resource } from '../../lib';
import { not } from './not';
import { equals } from './equals';

export const notEquals = resource({
  type: boolean,
  async resolver(a: any, b: any) {
    return not.resolver(await equals.resolver(a, b));
  },
});
