const fs = require('fs');
const path = require('path')

// Include AskScript parser
const parser = require('../parser/askscript.grammar');

const testFilenames = {
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
        const testFilename = testFilenames[testName];

        test(`parses ${testName}`, () => {
            checkIfParsesFile(testFilename);
        });
    }
    
});


describe('AskScript parser', () => {
    
    function checkIfParsedFileMatchesOutput(testFilename, outputFilename) {
        const absoluteFilePath = path.join(__dirname, 'code', testFilename);
        const code = fs.readFileSync(absoluteFilePath).toString();
        
        // AskScript -> AskJSX AST
        const askJsxStructure = parser.parse(code).print();
        
        const absoluteOutputFilePath = path.join(__dirname, 'output', outputFilename);
        let tmp;
        // Using eval() instead of JSON.parse() saves us from writing a ton of quotes in object keys, which would degrade readability.
        const expectedOutput = eval('tmp = ' + fs.readFileSync(absoluteOutputFilePath).toString());
        expect(askJsxStructure).toEqual(expectedOutput);
    }


    const testsOut = [
        'empty ask file',
        'variable',
        'string literal',
        // here will come 3 examples for graphql

        // here will come an example for call() with a lambda function
    ];

    for (const testName of testsOut) {
        const testFilename = testFilenames[testName];

        const parts = path.parse(testFilename);
        const outputFilename = parts.name + '.out';
        test(`parsed ${testName} matches ${outputFilename}`, () => {
            checkIfParsedFileMatchesOutput(testFilename, outputFilename);
        });
    }
    
});
