
query = queryHeader nl+ queryBody nl+ queryFooter

queryHeader = ws* 'ask' ws* ('(' argList ')')? ws* '{' ws*
queryFooter = ws* '}' (ws / nl)* eof

queryBody = statementList

statementList = nl* / nl* statement nl* / statement nl+ statementList

statement = 
      functionDefinition
    / variableDefinition
    / if
    / while
    / value

// variables other than of function type
variableDefinition = 
      type ws+ identifier ws+ '=' ws+ value
    / type ws+ identifier

value = 
      functionCall
    / methodCall
    / valueLiteral



functionDefinition = functionHeader codeBlock functionFooter

functionHeader = ''
functionFooter = '}'

// a block of code 
codeBlock = statementList

argList = arg / arg ',' argList
arg = ws* identifier ws* ':' ws* type ws* 

callArgList = valueList
valueList = value / value ',' valueList

if =       'if' ws* '(' value ')' ws* '{' nl+ codeBlock nl* '}'
while = 'while' ws* '(' value ')' ws* '{' nl+ codeBlock nl* '}'
functionCall = identifier ws* '(' callArgList ')'
methodCall   = identifier ws* ':' ws* identifier ws* ('(' callArgList ')')?

// === simple elements ===
type = identifier

valueLiteral = 
      int
    / float
    / string
    / array
    / map


string = '"' ch*  '"'

array = '[' valueList ']'
map = '{' mapEntryList '}'

mapEntryList = mapEntry / mapEntry ',' mapEntryList
mapEntry = identifier ':' value





// === literals ===
identifier = [_$a-zA-Z][-_$a-zA-Z0-9]* // TODO: add Unicode here
int = [-]?[0-9]+                // TODO: yes, multiple leading zeros possible, I might fix one day
float = [-]?[0-9]+ '.' [0-9]+   // TODO: yes, multiple leading zeros possible, I might fix one day

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
nl = '\n' / '\r' / eof

// end of file
eof = (!.)?
