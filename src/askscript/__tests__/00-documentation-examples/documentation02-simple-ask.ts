import { parse, runUntyped } from '../../..';
import source from './documentation02-simple-ask.ask';
import * as environment from './_environment';

const filePath = 'documentation02-simple-ask';

// środowisko automatycznie do source ładuje dany plik

declare var askScriptTest: Function;

test('documentation02-simple-ask', async () => {
  await expect(runUntyped(environment, parse(source), [0, ''])).resolves.toBe(
    null
  );
});
