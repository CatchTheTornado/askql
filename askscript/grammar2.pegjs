
query = queryHeader queryBody queryFooter

queryHeader = ws* 'ask' ws* ('(' argList ')')? ws* '{'
queryFooter = '}'

queryBody = topStatementList // top level can contain function definitions but the inner levels can't

topStatementList = ((statement / function) (nl+ (!.)?) )*
statementList = (statement (nl+ (!.)?) )*

statement = 
      variableDefinition
    / if
    / while
    / functionCall

// variables other than of function type
variableDefinition = 
      type ws+ identifier ws+ '=' ws+ value
    / type ws+ identifier

value = 
      functionCall
    / valueLiteral

valueLiteral = 
      int
    / float
    / string
    / array
    / object


function = functionHeader codeBlock functionFooter

functionHeader = ''
functionFooter = '}'

// a block of code 
codeBlock = 'axxx'
argList = 'bxxx'
identifier = 'cxxx'
type = 'dxxx'
statement = 'sxxx'


// === value literals ===
int = [-]?[0-9]+                // TODO: yes, multiple leading zeros possible, I might fix one day
float = [-]?[0-9]+ '.' [0-9]+   // TODO: yes, multiple leading zeros possible, I might fix one day
string = '"' ch*  '"'

// === character classes ===

// character (in string)
ch = 
      [\x20\x21\x23-\x5B\x5D-\xff] // all printable characters except " and \
    / '/' escape
    
escape =
      '"'
    / '\\'  // this is one backslash
    / 'u' hex hex hex hex

// digits (dec and hex)
hex = [0-9A-Fa-f]

digit = [0-9]
onenine = [1-9]

// whitespace
ws = ' ' / '\t'

// new line
nl = '\n' / '\r'
