import type { JestEnvironment } from '@jest/environment';
import type { TestResult } from '@jest/test-result';
import type { Config } from '@jest/types';
import type { RuntimeType as JestRuntime } from 'jest-runtime';
import jasmine2 = require('jest-jasmine2');

export = async function buildRunner(
  globalConfig: Config.GlobalConfig,
  config: Config.ProjectConfig,
  environment: JestEnvironment,
  runtime: JestRuntime,
  testPath: string
): Promise<TestResult> {
  Error.stackTraceLimit = 100;
  Object.assign(environment.global, { jestTestPath: testPath });
  return jasmine2(
    globalConfig,
    config,
    environment,
    runtime,
    require.resolve('./jest-build-test')
  );
};
