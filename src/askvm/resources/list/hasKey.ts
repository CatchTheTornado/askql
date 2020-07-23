import { any, resource } from '../../lib';

export const hasKey = resource({
  type: any,
  async resolver(list: any[], key: any): Promise<boolean> {
    return key in list;
  },
});
