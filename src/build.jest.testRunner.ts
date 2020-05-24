import type { JestEnvironment } from '@jest/environment';
import type { TestResult } from '@jest/test-result';
import type { Config } from '@jest/types';
import type { RuntimeType as JestRuntime } from 'jest-runtime';
import jasmine2 = require('jest-jasmine2');

async function buildFile(
  globalConfig: Config.GlobalConfig,
  config: Config.ProjectConfig,
  environment: JestEnvironment,
  runtime: JestRuntime,
  testPath: string
): Promise<TestResult> {
  return jasmine2(
    globalConfig,
    config,
    Object.assign(environment, {
      global: Object.assign(environment.global, {
        jestTestPath: testPath,
      }),
    }),
    runtime,
    require.resolve('./jest-build-test')
  );
}

// if (process.env.NODE_ENV === 'build') {
//   const outDirPath = join(__dirname, '../dist2');
//   await rmdir(outDirPath, {
//     recursive: true,
//   });
//   await mkdir(outDirPath);
// }

export = async function buildRunner(
  globalConfig: Config.GlobalConfig,
  config: Config.ProjectConfig,
  environment: JestEnvironment,
  runtime: JestRuntime,
  testPath: string
): Promise<TestResult> {
  return buildFile(globalConfig, config, environment, runtime, testPath);
};
