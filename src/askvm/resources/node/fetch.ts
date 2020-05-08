import { resource } from '../../lib/resource';
import { boolean, Typed, typed } from '../../lib/typed';
import fetchFun from 'node-fetch';

export const fetch = resource<Typed<null>>({
  type: boolean,
  async resolver() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const response = await fetchFun(url);
    const json = await response.json();
    return json;
  },
});
