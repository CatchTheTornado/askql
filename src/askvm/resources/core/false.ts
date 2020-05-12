import { boolean, resource } from '../../lib';

export const falseRes = resource({
  type: boolean,
  resolver: async () => false,
});
