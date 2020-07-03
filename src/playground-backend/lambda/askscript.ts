import { customAlphabet } from 'nanoid';
import chalk from 'chalk';
import { askCodeToSource } from '../../askcode';
import { parse as parseAskScript, AskScriptCode } from '../../askscript';
import { resources as builtInResources, runUntyped } from '../../askvm';
import { customResources } from '../lib/resources';
import { customValues } from '../lib/values';
import { sendJson } from '../lib/utils';

exports.handler = async function (event: any, context: any, callback: any) {
  const nanoid = customAlphabet('1234567890abcdef', 8);

  const baseEnvironment = {
    resources: { ...builtInResources, ...customResources },
    values: customValues,
  };

  if (event.httpMethod !== 'POST') {
    sendJson(callback, 404);
    return;
  }

  const body = JSON.parse(event.body);

  if (typeof body !== 'object') {
    sendJson(callback, 400, {
      message: 'Please send JSON data',
    });
    return;
  }

  if (!('code' in body) || typeof body.code !== 'string') {
    sendJson(callback, 400, {
      message: 'Please send Askscript code in "code" property',
    });
    return;
  }
  const code: AskScriptCode = body.code;

  let askCode;
  let askCodeSource;

  const id = nanoid();

  try {
    console.log(id + ' -- ' + new Date().toString());
    console.log(id + ' -- ' + chalk.grey(`➡️ ${code}`));

    askCode = parseAskScript(code);

    askCodeSource = askCodeToSource(askCode);
  } catch (e) {
    console.error(id + ' -- ' + new Date().toString());
    console.error(id + ' -- ' + code);
    console.error(id + ' -- ' + e);
    console.error('\n\n');

    sendJson(callback, 400, {
      message: 'Could not compile your AskScript code',
      error: e.toString(),
    });
    return;
  }

  try {
    const result = await runUntyped(baseEnvironment, askCode, []);

    console.log(id + ' -- ' + chalk.grey(`⬅️ ${JSON.stringify(result)}`));
    console.log('\n\n');
    sendJson(callback, 200, {
      askCodeSource,
      message: 'Code run successfully',
      result,
    });
  } catch (e) {
    console.error(id + ' -- ' + new Date().toString());
    console.error(id + ' -- ' + code);
    console.error(id + ' -- ' + e);
    console.error('\n\n');

    sendJson(callback, 400, {
      message: 'Could not run your code',
      error: e.toString(),
    });
  }
};
