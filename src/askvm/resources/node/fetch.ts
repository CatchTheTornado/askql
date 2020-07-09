import { any, resource } from '../../lib';

const globalFetch = (global as any).fetch;

export const fetch = resource({
  type: any,
  async resolver(url: string) {
    const response = await globalFetch(url);
    const json = await response.json();
    return json;
  },
});
