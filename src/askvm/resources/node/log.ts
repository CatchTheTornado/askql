import { resource } from '../../lib/resource';
import { boolean, Typed } from '../../lib/typed';

export const log = resource<Typed<null>>({
  type: boolean,
  async resolver(...messages: any) {
    console.log(...messages);
    return messages[0] ?? null;
  },
});
