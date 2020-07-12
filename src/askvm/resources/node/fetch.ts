import { any, resource } from '../../lib';

import nodeFetch from 'node-fetch';

export const fetch = resource({
  type: any,
  async resolver(url: string) {
    const response = await nodeFetch(url);
    const json = await response.json();
    return json;
  },
});
