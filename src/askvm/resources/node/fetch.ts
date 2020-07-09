import { any, resource } from '../../lib';

const fetchFun = (global as any).fetch;

export const fetch = resource({
  type: any,
  async resolver(url: string) {
    const response = await fetchFun(url);
    const json = await response.json();
    return json;
  },
});
