import { boolean, resource } from '../../lib';

export const trueRes = resource({
  type: boolean,
  resolver: async () => true,
});
