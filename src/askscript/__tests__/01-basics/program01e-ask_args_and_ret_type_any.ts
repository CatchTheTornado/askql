import { parse, runUntyped } from '../../..';
import source from './program01e-ask_args_and_ret_type_any.ask';
import * as environment from './_environment';

test('program01e-ask_args_and_ret_type_any', async () => {
  await expect(
    runUntyped(environment, parse(source), [0, 0, ''])
  ).resolves.toBe(null);
});
