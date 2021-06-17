import { resource, Resource } from './resource';
import { any } from './type';

/**
 * Resource factory generates the resource wrappers around all the methods which are on `whitelist` of the `module` passed. Implementation of https://github.com/CatchTheTornado/askql/issues/580 for limited JS function calls inside AskScript
 * @param module JS object which methods will be wrapped as resource handlers
 * @param whitelist list of strings including function/method names of the module to be wrapped out
 */
export function factory(
  jsModule: any,
  whitelist: string[]
): Record<string, Resource<any, any>> {
  const res: Record<string, Resource<any, any>> = {};
  whitelist.forEach((k) => {
    if (k in jsModule) {
      res[k] = resource({
        type: any,
        async resolver(...args: any) {
          return jsModule[k](...args);
        },
      });
    }
  });
  return res;
}
