import { any, resource } from '../../lib';

export const each = resource({
  type: any,
  resolver: async () => null,
});
