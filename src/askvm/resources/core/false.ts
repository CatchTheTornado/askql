import { resource } from '../../lib/resource';
import { boolean, typed, Typed } from '../../lib/typed';

export const falseRes = resource<Typed<false>>({
  type: boolean,
  resolver: () => typed(false),
});
