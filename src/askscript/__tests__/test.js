const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Include AskScript parser
const parser = require('../parser/askscript.grammar');


describe('AskScript parser can parse', () => {

    function checkIfParsesFile(absoluteFilePath) {
        const code = fs.readFileSync(absoluteFilePath).toString();

        // AskScript -> AskJSX AST
        const askJsxStructure = parser.parse(code).print();

        expect(askJsxStructure).not.toBeNull();
    }

    const testsGlobPath = path.join(__dirname, 'code', '*.ask');
    const testFilenames = glob.sync(testsGlobPath);

    for (const testFilename of testFilenames) {
        test(`parses ${testFilename}`, () => {
            checkIfParsesFile(testFilename);
        });
    }
    
});


describe('AskScript parser output', () => {
    
    function checkIfParsedFileMatchesOutput(absoluteFilePath, absoluteOutputFilePath) {
        const code = fs.readFileSync(absoluteFilePath).toString();
        
        // AskScript -> AskJSX AST
        const askJsxStructure = parser.parse(code).print();
        
        // Using eval() instead of JSON.parse() saves us from writing a ton of quotes in object keys, which would degrade readability.
        let tmp;
        const expectedOutput = eval('tmp = ' + fs.readFileSync(absoluteOutputFilePath).toString());
        
        expect(askJsxStructure).toEqual(expectedOutput);
    }


    const outputGlobPath = path.join(__dirname, 'code', 'output', '*.ask.out');
    const outputFilePaths = glob.sync(outputGlobPath);

    for (const outputFilePath of outputFilePaths) {
        const parts = path.parse(outputFilePath);
        const testFilePath = path.join(parts.dir, '..', parts.name);

        test(`parsed ${parts.name} matches ${parts.base}`, () => {
            checkIfParsedFileMatchesOutput(testFilePath, outputFilePath);
        });
    }
    
});
