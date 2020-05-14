import { fromAskScriptAst } from '../askjsx';
import { parse } from '../askscript';
import { resources, runUntyped, Values } from '../askvm';

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

const environment: Values = {
  hello: 'Hello, this is your Ask server!',
  helloFunction: () => 'Hello, this is your Ask server!',
  helloDynamicFunction: () =>
    "Hello, this is your Ask server! It's " + new Date().toString(),
};

function e2e(script: string, values: Values = environment): any {
  const ast = parse(script);
  const askCode = fromAskScriptAst(ast);

  return runUntyped(
    {
      resources,
      values,
    },
    askCode
  );
}

describe('simple e2e tests', () => {
  test('e2e #1', async () => {
    await expect(
      e2e(`ask {
        'Hello world!'
    }`)
    ).resolves.toBe('Hello world!');
  });

  test('e2e #2', async () => {
    await expect(
      e2e(`ask {
      hello
  }`)
    ).resolves.toBe(environment.hello);
  });

  // test('e2e #3 -- not implemented', async () => {
  //   await expect(
  //     e2e(`ask {
  //         helloFunction()
  //   }`)
  //   ).resolves.toBe(environment.helloFunction());
  // });

  // test('e2e #4 -- not implemented', async () => {
  //   await expect(
  //     e2e(`ask {
  //         helloDynamicFunction()
  //   }`)
  //   ).resolves.toBe(environment.helloDynamicFunction()); // This might be 'a bit' flaky, since the time is returned with second precision
  // });
});

describe('running .ask files produces expected output', () => {
  const expectedOutputFilesGlobPath = path.join(
    __dirname,
    '..',
    'askscript',
    '__tests__',
    '[0-9][0-9]-*',
    '*.result.tsx'
  );

  const expectedResultFilePaths = glob.sync(expectedOutputFilesGlobPath);
  // console.log(`expectedOutputFilesGlobPath: ${expectedOutputFilesGlobPath}`);
  // console.log(`expectedResultFilePaths: ${expectedResultFilePaths}`);

  for (const expectedResultFilePath of expectedResultFilePaths) {
    const parts1 = path.parse(expectedResultFilePath);
    const parts2 = path.parse(parts1.name);

    const askScriptFilePath = path.join(parts1.dir, `${parts2.name}.ask`);

    const parts = path.parse(askScriptFilePath);
    // if (parts.base != 'program14d-method_call_args.ask') continue;

    test(`produces correct result for ${parts2.name}.ask`, async () => {
      // Read .ask source code
      const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
      // console.log(`askScriptCode: ${askScriptCode}`);

      // Read environment, if available
      const environmentFilePath = path.join(parts.dir, '_environment.ts');

      let env: Values;
      if (fs.existsSync(environmentFilePath)) {
        const { values } = require(environmentFilePath);
        env = values;
      } else {
        // Using default environment
        env = environment;
      }

      // Run the .ask code
      const result = await e2e(askScriptCode, env);

      // Read expected output
      // console.log('expectedResultFilePath: ' + expectedResultFilePath);
      const debug1 = require(expectedResultFilePath);

      // Validate output
      expect(result).toEqual(debug1.expectedResult);
    });
    // break;
  }
});
