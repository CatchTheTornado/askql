import { any, resource } from '../../lib';

import jp from 'jsonpath';

export const jsonPath = resource({
  type: any,
  async resolver(dataObject: any, query: string) {
    const json = jp.query(dataObject, query);
    return json;
  },
});
