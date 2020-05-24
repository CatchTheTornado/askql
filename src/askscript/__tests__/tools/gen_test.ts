// Generates output for all .ask which don't have a corresponding .out.tsx nor .out.tsx.notImplemented file
// using the output from the AskScript parser. Please note that we are using the parser itself to generate
// files with which parser output will be later compared during tests. Please please read each and every such
// file to make sure the output is correct and fix any mistake.
//
// This script was found useful when adding a dozen of .ask test files at once, because it is easier to eyeball the JSX
// output to verify whether it looks valid rather than type all of the JSX files manually (typos, typos, typos, braces,
// braces, braces...).
//
// Usage: npx ts-node src/askscript/__tests__/tools/gen_test.ts     (no args)
//

export {}; // This dummy line converts this file to a module.

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { parseToJSON } from '../../../askscript';

function isObjectEmpty(obj: object) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function jsxObjToXml(
  jsxObj: object,
  indent: string = '',
  insideCurlyBraces: boolean = false
) {
  // console.log('jsxObj: ' + JSON.stringify(jsxObj, null, 2));

  let output = '';
  if (jsxObj === null) {
    if (insideCurlyBraces) {
      output += 'null';
    } else {
      output += '{null}';
    }
    return output;
  }

  if (Array.isArray(jsxObj)) {
    output += '[';
    let values = [];
    const arrValue = jsxObj as object[];
    for (const value of arrValue)
      values.push(jsxObjToXml(value, `${indent}  `, insideCurlyBraces));
    output += values.join(', ');
    output += ']';
    return output;
  }

  if (typeof jsxObj != 'object') {
    // for string, numbers etc. return the value

    switch (typeof jsxObj) {
      case 'number':
        if (insideCurlyBraces) {
          output = jsxObj;
        } else {
          output = `{${jsxObj}}`;
        }
        break;

      case 'boolean':
        const text = jsxObj ? 'true' : 'false';
        if (insideCurlyBraces) {
          output = text;
        } else {
          output = `{${text}}`;
        }
        break;

      default:
        // console.log(`typeof ${jsxObj} = ${typeof jsxObj}`);
        if (insideCurlyBraces) {
          output = `'${jsxObj}'`;
        } else {
          output = `{'${jsxObj}'}`;
        }
    }

    return output;
  }

  // -- jsxObj is an object here: --

  const obj = jsxObj as LooseObject;

  // if this object hold a value of type object, output it, like we do with an array above
  if ('jsxValue' in obj) {
    output += '{';
    let values = [];
    const objValue = obj.jsxValue as object[];
    for (const key in objValue) {
      const value = objValue[key];
      values.push(
        `${key}: ${jsxObjToXml(value, `${indent}  `, insideCurlyBraces)}`
      );
    }
    output += values.join(', ');
    output += '}';
    return output;
  }

  // -- here the object holds the program structure --
  output += `<${obj.name}`;
  if ('props' in obj) {
    for (const propKey in obj.props) {
      const propValue = obj.props[propKey];
      if (obj.name == 'ask' && propKey == 'args' && propValue.length == 0) {
        // don't output empty args for ask (avoids: <ask args={[]}>, outputs: <ask> instead)
      } else {
        output += ` ${propKey}={${jsxObjToXml(
          propValue,
          `${indent}  `,
          true
        )}}`;
      }
    }
  }

  if ('children' in obj && !isObjectEmpty(obj)) {
    output += '>';
    if (obj.children.length > 0) {
      output += '\n';
    }

    for (const child of obj.children) {
      output += `${indent}  ${jsxObjToXml(child, `${indent}  `)}\n`;
    }
    if (obj.children.length > 0) {
      output += indent;
    }
    output += `</${obj.name}>`;
  } else {
    output += ' />';
  }
  return output;
}

// Workaround to make the inclusion for askscript.grammar.pegjs.classes work
process.env.NODE_ENV = 'test';

const askScriptFilesGlobPath = path.join(
  __dirname,
  '..',
  '[0-9][0-9]-*',
  '*.ask'
);
const askScriptFilePaths = glob.sync(askScriptFilesGlobPath);
console.log('All .ask files: \n');
console.log(askScriptFilePaths);
console.log('\n===================================\n\n');

let filesGenerated: number = 0;
let filesErrors: number = 0;

for (const askScriptFilePath of askScriptFilePaths) {
  const parts = path.parse(askScriptFilePath);
  const outputFilePath = path.join(parts.dir, `${parts.name}.out.tsx`);
  const outputFileNotImplementedPath = path.join(
    parts.dir,
    `${parts.name}.out.tsx.notImplemented`
  );

  // If the output file does not exist, create it from the current AskScript parser output.
  // Of course later on you need to eyeball it to check whether it looks OK.
  if (
    !fs.existsSync(outputFilePath) &&
    !fs.existsSync(outputFileNotImplementedPath)
  ) {
    try {
      console.log(`Filename: ${askScriptFilePath}\n\n`);

      const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
      const jsxObj = parseToJSON(askScriptCode);

      const jsxXml = `  ${jsxObjToXml(jsxObj, '  ')}`;

      const fileContents =
        "import * as askjsx from '../../../askjsx';\n" +
        'askjsx;\n' +
        '\n' +
        'export const expectedOutput = (\n' +
        jsxXml +
        '\n' +
        ');\n';

      console.log(askScriptCode);
      console.log('\n\n----\n\n');
      console.log(JSON.stringify(jsxObj, null, 2));
      console.log('\n\n----\n\n');
      console.log(fileContents);
      console.log('\n\n');
      console.log(`Saving JSX file as ${outputFilePath}\n`);
      fs.writeFileSync(outputFilePath, fileContents);
      console.log('\n===================================\n\n');

      ++filesGenerated;
    } catch (e) {
      ++filesErrors;

      console.log(`Got an error while parsing:`);
      console.log(
        `${e.message}\nLocation:\n${JSON.stringify(e.location, null, 2)}`
      );
      console.log(e.stack);
    }
  }
}

console.log('\n\n\n');
if (filesGenerated == 0) {
  console.log('No new files generated as all .out.tsx files already existed.');
} else {
  console.log(`Generated ${filesGenerated} new .out.tsx file(s).`);
}
console.log('\n\n');

if (filesErrors > 0) {
  console.warn(`Got errors when generating ${filesErrors} file(s).`);
}

interface LooseObject {
  [key: string]: any;
}
