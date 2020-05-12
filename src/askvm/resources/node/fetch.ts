import fetchFun from 'node-fetch';
import { any, resource } from '../../lib';

export const fetch = resource({
  type: any,
  async resolver() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const response = await fetchFun(url);
    const json = await response.json();
    return json;
  },
});
