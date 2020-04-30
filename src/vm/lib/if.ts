import { Context } from '..';
import type { funtype } from './fun';

export function $if(
  context: Context,
  condition: any,
  $then: funtype,
  $else: funtype
) {
  $then.block = true;
  $else.block = true;
  return condition ? $then(context) : $else(context);
}
