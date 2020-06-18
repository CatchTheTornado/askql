import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { createElement, fromAskScriptAst } from '../askjsx';
import { parseToAst, AskScriptCode } from '../askscript';
import { Options, resources, runUntyped } from '../askvm';

const myLogger = util.debuglog('');

export async function e2e(
  askScriptCode: AskScriptCode,
  environment: Options,
  args?: any[]
): Promise<any> {
  const ast = parseToAst(askScriptCode);
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
