import { fromAskScriptAst } from '../askjsx';
import { parse } from '../askscript';
import { resources, runUntyped, Values, Options, Resource } from '../askvm';
import * as type from '../askvm/lib/type';
import { resource } from '../askvm/lib';
import { e2e, runAskFile } from '../utils/tools';

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as util from 'util';

const myLogger = util.debuglog('');

const defaultEnvironment: Options = {
  values: {
    hello: 'Hello, this is your Ask server!',
  },
  resources: {
    ...resources,

    helloFunction: resource({
      name: 'helloFunction',
      type: type.string,
      argsType: type.empty,
      resolver: async (): Promise<string> => {
        return 'Hello, this is your Ask server!';
      },
    }),

    helloDynamicFunction: resource({
      name: 'helloDynamicFunction',
      type: type.string,
      argsType: type.empty,
      resolver: async (): Promise<string> => {
        return "Hello, this is your Ask server! It's " + new Date().toString();
      },
    }),
  },
};

describe('simple e2e tests', () => {
  test('e2e #1', async () => {
    const output = await e2e(
      `ask {
      'Hello world!'
  }`,
      defaultEnvironment
    );
    expect(output).toBe('Hello world!');
  });

  test('e2e #2', async () => {
    const output = await e2e(
      `ask {
      hello
  }`,
      defaultEnvironment
    );
    expect(output).toBe(defaultEnvironment.values?.hello);
  });

  // // TODO(mh):
  // // Unknown identifier 'helloFunction'!
  // test('e2e #3 -- not implemented', async () => {
  //   const output = await e2e(`ask {
  //         helloFunction()
  //   }`);

  //   expect(output).toBe(
  //     await defaultEnvironment.resources?.helloFunction.resolver()
  //   );
  // });

  // // TODO(mh):
  // // Expected: "Hello, this is your Ask server! It's Thu May 14 2020 23:03:43 GMT+0200 (Central European Summer Time)"
  // // Received: {}
  // test('e2e #4 -- wrong output', async () => {
  //   const output = e2e(`ask {
  //         helloDynamicFunction()
  //   }`);

  //   expect(output).toBe(
  //     await defaultEnvironment.resources?.helloDynamicFunction.resolver()
  //   ); // This might be 'a bit' flaky, since the time is returned with second precision
  // });

  // TODO(mh): This test hangs.  When you fix it, please remove lines with: `if` and 'program15c-function_def_args.ask' from this file and get_test_results.ts
  // test('e2e #5 -- hangs in runtime', async () => {
  //   const output = e2e(`ask {
  //     const plus = (a:int,b:float,c:int): float {
  //     return a:plus(b):plus(c)
  //   }
  //   plus(2, 3.6, 4)
  // }`);

  //   expect(output).toBe(9.6);
  // });
});

// Commented out because there are 17 failing tests.
// describe('running .ask files succeeds', () => {
//   const askScriptFilesGlobPath = path.join(
//     __dirname,
//     '..',
//     'askscript',
//     '__tests__',
//     '[0-9][0-9]-*',
//     '*.ask'
//   );

//   const askScriptFilesFilePaths = glob.sync(askScriptFilesGlobPath);

//   for (const askScriptFilesFilePath of askScriptFilesFilePaths) {
//     const parts = path.parse(askScriptFilesFilePath);

//     if (parts.base == 'program15c-function_def_args.ask') continue; // This test hangs

//     test(`successfully runs ${parts.base}`, async () => {
//       try {
//         await runAskFile(askScriptFilesFilePath, defaultEnvironment);
//       } catch (e) {
//         myLogger(`Warning: Finished with an error:  ${parts.base}`); // TODO(mh): please fix all failing tests and add 'throw e;' below.
//       }
//     });
//   }
// });

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

    // if (parts2.name != 'getting-started-03') continue;

    // Read expected output
    // console.log('expectedResultFilePath: ' + expectedResultFilePath);

    test(`produces correct result for ${parts2.name}.ask`, async () => {
      const { expectedResult } = require(expectedResultFilePath);
      await runAskFile(askScriptFilePath); // check runtime errors
      await expect(runAskFile(askScriptFilePath)).resolves.toEqual(
        expectedResult
      );
    });
  }
});
