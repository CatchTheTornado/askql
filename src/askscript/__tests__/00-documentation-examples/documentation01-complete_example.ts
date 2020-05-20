import { parse, runUntyped } from '../../..';
import source from './documentation01-complete_example.ask';
import * as environment from './_environment';

test('documentation01-complete_example', async () => {
  await expect(runUntyped(environment, parse(source), [5])).resolves.toBe(
    '121'
  );
});
