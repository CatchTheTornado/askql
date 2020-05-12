import { any, resource } from '../../lib';

export const empty = resource({
  type: any,
  resolver: async () => null,
});
