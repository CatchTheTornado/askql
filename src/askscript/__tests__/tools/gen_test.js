// Generates output for all .ask

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Include AskScript parser
const parser = require('../../parser/askscript.grammar');

function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function jsxObjToXml(jsxObj, indent) {
  if (typeof indent === 'undefined') indent = '';

  let output = '';
  if (Array.isArray(jsxObj)) {
    output += '[';
    let values = [];
    for (value of jsxObj) values.push(jsxObjToXml(value, indent + '  '));
    output += values.join(',');
    output += ']';
    return output;
  } else if (typeof jsxObj != 'object') {
    // for string, numbers etc. return the value
    output = jsxObj;
    return output;
  } else {
    output += `<${jsxObj.name}`;
    if ('props' in jsxObj) {
      for (propKey in jsxObj.props) {
        const propValue = jsxObj.props[propKey];
        if (
          jsxObj.name == 'ask' &&
          propKey == 'args' &&
          propValue.length == 0
        ) {
          // don't output empty args for ask (avoids: <ask args={[]}>, outputs: <ask> instead)
        } else {
          output += ` ${propKey}={${jsxObjToXml(propValue, indent + '  ')}}`;
        }
      }
    }

    if ('children' in jsxObj && !isObjectEmpty(jsxObj)) {
      output += '>';
      if (jsxObj.children.length > 0) output += '\n';

      for (child of jsxObj.children) {
        output += indent + '  ' + jsxObjToXml(child, indent + '  ') + '\n';
      }
      output += indent + `</${jsxObj.name}>`;
    } else {
      output += '/>';
    }
    return output;
  }
}

const askScriptFilesGlobPath = path.join(__dirname, '..', 'code', '*.ask');
const askScriptFilePaths = glob.sync(askScriptFilesGlobPath);

for (askScriptFilePath of askScriptFilePaths) {
  const parts = path.parse(askScriptFilePath);
  const outputFilePath = path.join(
    __dirname,
    '..',
    'code',
    'output',
    parts.base + '.out'
  );

  if (!fs.existsSync(outputFilePath)) {
    // If the output file does not exist, create it from the current AskScript parser output.

    const askScriptCode = fs.readFileSync(askScriptFilePath).toString();
    const jsxObj = parser.parse(askScriptCode).print();

    const jsxXml = jsxObjToXml(jsxObj);
    console.log(JSON.stringify(jsxObj));
    console.log('\n\n\n');
    console.log(jsxXml);
    console.log('\n\n\n');

    // break;
  }
}
