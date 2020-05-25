import { boolean, resource } from '../../lib';

export const equals = resource({
  type: boolean,
  async resolver(a: any, b: any) {
    return a === b;
  },
});
