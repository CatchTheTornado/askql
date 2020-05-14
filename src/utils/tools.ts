import * as path from 'path';
import * as fs from 'fs';
import { Options, resources, runUntyped } from '../askvm';
import { parse } from '../askscript';
import { fromAskScriptAst } from '../askjsx';
import * as util from 'util';

const myLogger = util.debuglog('');

export async function e2e(script: string, environment: Options): Promise<any> {
  const ast = parse(script);
  const askCode = fromAskScriptAst(ast);

  return runUntyped(environment, askCode);
}

export async function runAskFile(
  askScriptFilePath: string,
  defaultEnvironment: Options = { values: {}, resources: {} },
  debugPrintEnvValues: boolean = false
): Promise<any> {
  const parts = path.parse(askScriptFilePath);

  myLogger(`askScriptFilePath: ${askScriptFilePath}`);

  // Read .ask source code
  const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
  // console.log(`askScriptCode: ${askScriptCode}`);

  // Read environment, if available
  const environmentFilePath = path.join(parts.dir, '_environment.ts');

  let environment: Options;
  if (fs.existsSync(environmentFilePath)) {
    const newEnvironment = require(environmentFilePath);
    environment = {
      values: newEnvironment.values,
      resources: { ...resources, ...newEnvironment.resources },
    };
  } else {
    // Using default environment
    environment = defaultEnvironment;
  }

  if (debugPrintEnvValues) {
    myLogger(
      `environment values: ${JSON.stringify(environment.values, null, 2)}`
    );
  }
  // Run the .ask code
  const result = await e2e(askScriptCode, environment);

  return result;
}
