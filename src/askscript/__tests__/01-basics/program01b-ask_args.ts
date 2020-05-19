import { parse, runUntyped } from '../../..';
import source from './program01b-ask_args.ask';
import * as environment from './_environment';

test('program01b-ask_args', async () => {
  await expect(
    runUntyped(environment, parse(source), [0, 0, ''])
  ).resolves.toBe(null);
});
