import { resource } from '../../lib/resource';
import { boolean, Typed, typed } from '../../lib/typed';

export const empty = resource<Typed<null>>({
  type: boolean,
  resolver: () => typed(null),
});
