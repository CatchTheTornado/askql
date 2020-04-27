import { Context, fun } from '..';

export function $if(context: Context, condition: any, $then: fun, $else: fun) {
  $then.block = true;
  $else.block = true;
  return condition ? $then(context) : $else(context);
}
