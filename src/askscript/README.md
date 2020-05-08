## How to generate the AskScript parser
Output: `parser/askscript.grammar.js` file

```bash
pegjs --allowed-start-rules ask,askForRepl parser/askscript.grammar.pegjs
```

## How to transpile AskScript -> AskJSX AST
Using `node` run the following Javascript code:

```javascript
// Include AskScript parser
const parser = require('./parser/askscript.grammar');

// Read AskScript source code
const code = fs.readFileSync('examples/program3.ask').toString();

// AskScript -> AskJSX AST
const askJsxStructure = parser.parse(code).print();

// Print the AskJSX AST structure for debugging purposes
console.log(JSON.stringify(askJsxStructure, null, 2));
```
