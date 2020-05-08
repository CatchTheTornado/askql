import { resource } from '../../lib/resource';
import { boolean, Typed, typed } from '../../lib/typed';

export const delay = resource<Typed<null>>({
  type: boolean,
  async resolver() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
});
