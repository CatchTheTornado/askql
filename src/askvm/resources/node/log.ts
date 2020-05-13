import { resource, any } from '../../lib';

export const log = resource({
  type: any,
  async resolver(...messages: any) {
    console.log(...messages);
    return messages[0] ?? null;
  },
});
