// Generates output for all .ask

export = ''; // This dummy line converts this file to a module.

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Include AskScript parser
const parser = require('../../parser/askscript.grammar');

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
  let output = '';
  if (Array.isArray(jsxObj)) {
    output += '[';
    let values = [];
    const arrValue = jsxObj as object[];
    for (const value of arrValue)
      values.push(jsxObjToXml(value, indent + '  ', insideCurlyBraces));
    output += values.join(',');
    output += ']';
    return output;
  } else if (typeof jsxObj != 'object') {
    // for string, numbers etc. return the value

    switch (typeof jsxObj) {
      case 'number':
        output = jsxObj;
        break;
      default:
        if (insideCurlyBraces) {
          output = `'${jsxObj}'`;
        } else {
          output = `${jsxObj}`;
        }
    }

    return output;
  } else {
    const obj = jsxObj as LooseObject;

    output += `<${obj.name}`;
    if ('props' in obj) {
      for (const propKey in obj.props) {
        const propValue = obj.props[propKey];
        if (obj.name == 'ask' && propKey == 'args' && propValue.length == 0) {
          // don't output empty args for ask (avoids: <ask args={[]}>, outputs: <ask> instead)
        } else {
          output += ` ${propKey}={${jsxObjToXml(
            propValue,
            indent + '  ',
            true
          )}}`;
        }
      }
    }

    if ('children' in obj && !isObjectEmpty(obj)) {
      output += '>';
      if (obj.children.length > 0) output += '\n';

      for (const child of obj.children) {
        output += indent + '  ' + jsxObjToXml(child, indent + '  ') + '\n';
      }
      output += indent + `</${obj.name}>`;
    } else {
      output += ' />';
    }
    return output;
  }
}

const askScriptFilesGlobPath = path.join(
  __dirname,
  '..',
  '[0-9][0-9]-*',
  '*.ask'
);
const askScriptFilePaths = glob.sync(askScriptFilesGlobPath);
console.log(askScriptFilePaths);

for (const askScriptFilePath of askScriptFilePaths) {
  const parts = path.parse(askScriptFilePath);
  const outputFilePath = path.join(parts.dir, parts.nam + '.tsx.out');

  // if (!fs.existsSync(outputFilePath)) {
  // If the output file does not exist, create it from the current AskScript parser output.

  const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
  const jsxObj = parser.parse(askScriptCode).print();

  const jsxXml = jsxObjToXml(jsxObj, '  ');

  const fileContents =
    'import * as askjsx from "../../../askjsx";\n' +
    '\n' +
    'export const expectedOutput = (\n' +
    jsxXml +
    '\n' +
    ');\n';

  console.log('filename: ' + askScriptFilePath + '\n\n');
  console.log(JSON.stringify(jsxObj, null, 2));
  console.log('\n\n');
  console.log(fileContents);
  console.log('\n\n\n');

  // break;
  // }/
}

interface LooseObject {
  [key: string]: any;
}
