const fs = require('fs');
const path = require('path')

// Include AskScript parser
const parser = require('../parser/askscript.grammar');

const testFiles = {
    'empty ask file': 'program01-empty.ask',
    'variable':       'program02-variable.ask',
    'string literal': 'program03-string.ask',

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
        'string literal'
    ];

    for (const testName of tests) {
        const testFilePath = testFiles[testName];
        test(`parses ${testName}`, () => {
            checkIfParsesFile(testFilePath);
        });
    }
    
});
