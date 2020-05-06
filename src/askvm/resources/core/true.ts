import { resource } from '../../lib/resource';
import { boolean, Typed } from '../../lib/typed';

export const trueRes = resource<Typed<true>>({
  type: boolean,
  resolver: () => true,
});
