const fs = require('fs');
const path = require('path')

// Include AskScript parser
const parser = require('../parser/askscript.grammar');

const testFiles = {
    'empty ask file': 'program01-empty.ask',
    'variable':       'program02-variable.ask',
    'string literal': 'program03-string.ask',
    
    // here will come 3 examples for graphql
    
    // here will come an example for call() with a lambda function
}

describe('AskScript parser', () => {

    function checkIfParses(code) {
        // AskScript -> AskJSX AST
        const askJsxStructure = parser.parse(code).print();

        expect(askJsxStructure).not.toBeNull();
    }

    function checkIfParsesFile(filename) {
        const absoluteFilePath = path.join(__dirname, 'code', filename);
        const code = fs.readFileSync(absoluteFilePath).toString();
        checkIfParses(code);
    }

    const tests = [
        'empty ask file',
        'variable',
        'string literal',
        // here will come 3 examples for graphql

        // here will come an example for call() with a lambda function
    ];

    for (const testName of tests) {
        const testFilePath = testFiles[testName];

        test(`parses ${testName}`, () => {
            checkIfParsesFile(testFilePath);
        });
    }
    
});