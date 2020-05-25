import * as path from 'path';
import * as fs from 'fs';
import { Options, resources, runUntyped } from '../askvm';
import { parseToJSON } from '../askscript';
import { fromAskScriptAst, createElement } from '../askjsx';
import * as util from 'util';

const myLogger = util.debuglog('');

export async function e2e(
  script: string,
  environment: Options,
  args?: any[]
): Promise<any> {
  const ast = parseToJSON(script);
  const askCode = fromAskScriptAst(ast, createElement);

  return runUntyped(environment, askCode, args);
}

export async function runAskFile(
  askScriptFilePath: string,
  args?: any[],
  debugPrintEnvValues: boolean = false
): Promise<any> {
  const parts = path.parse(askScriptFilePath);

  if (debugPrintEnvValues) myLogger(`askScriptFilePath: ${askScriptFilePath}`);

  // Read .ask source code
  const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
  // console.log(`askScriptCode: ${askScriptCode}`);

  // Read environment, if available
  const environmentFilePath = path.resolve(
    path.join(parts.dir, '_environment.ts')
  );
  if (debugPrintEnvValues)
    myLogger(`environmentFilePath: ${environmentFilePath}`);

  let environment: Options;
  if (fs.existsSync(environmentFilePath)) {
    const newEnvironment = require(environmentFilePath);
    environment = {
      values: newEnvironment.values,
      resources: { ...resources, ...newEnvironment.resources },
    };
  } else {
    // Using default environment
    environment = {
      values: {},
      resources: resources,
    };
  }

  if (debugPrintEnvValues) {
    myLogger(
      `environment values: ${JSON.stringify(environment.values, null, 2)}`
    );
  }
  // Run the .ask code
  const result = await e2e(askScriptCode, environment, args);

  return result;
}
