const fs = require('fs');

// Include AskScript parser
const parser = require('../parser/askscript.grammar');

describe('AskScript parser', () => {
    test('parses an empty ask file', () => {

        const code = `ask {
        }`;

        // AskScript -> AskJSX AST
        const askJsxStructure = parser.parse(code).print();

        expect(askJsxStructure).not.toBeNull();
    });
});
