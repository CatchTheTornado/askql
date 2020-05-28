<a href="https://askql.org" align="right">
  <img src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/logo/askql-logo-OW-cut.png" align="right"
     title="AskQL Logo" width="200">
</a>

# AskQL

AskQL is a query language that can express any data request.
Send executable code instead of JSONs.

## Why and what for?

<img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/diagrams/REST_API_approach.png" 
    align="center"
    title="Rest"
    height=50%
    width=50%><img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/diagrams/AskQL_approach.png" 
    align="center"
    title="AskQL"
    height=50%
    width=50%>

- Next milestone after GraphQL
- Send code to servers without the need to deploy
- New safe query language
- 4 - 6 kB of robust code
- Compiled to clean functional code

### Prerequisites

`node >=12.14`

## Quick Start

### Installation

In your Node project run:

```
npm install askql
```

### Usage

Sample index.js file:

```js
const askql = require('askql');

(async () => {
  const result = await askql.runUntyped(
    { resources: askql.askvm.resources },
    askql.parse("ask { 'hello world!' }")
  );

  console.log(JSON.stringify(result, null, 2));
})();
```

[More examples](https://github.com/xFAANG/askql/tree/master/src/askscript/__tests__)

## Development & Contributing

### Installation

1. Clone the repository

`git clone git@github.com:xFAANG/askql.git`

2. Install dependencies
   `npm i`

3. Build the project
   `npm run build`

4. Link the project to askql command
   `npm link`

Now you should be able to launch the interpreter (we use REPL for that).
`askql`

### Usage

1. Write a hello world!

In AskQL we only use single quotes:

```
🦄 'Hello world'
string ask('Hello world')
'Hello world'
```

In the response you get a compiled version of the program that is sent asynchronously to the AskVM.

2. There are two number types

```
🦄 4
int ask(4)
4
```

```
🦄 4.2
float ask(4.2)
4.2
```

3. Let's say we have a table of philosophers and their contribution to computer science as a score:

```
🦄 scorePerPhilosopher
any ask(get('scorePerPhilosopher'))
{
  Aristotle: 385,
  Kant: 42,
  Plato: 1,
  Russel: 7331,
  Turing: 65536,
  Wittgenstein: 420
}
```

Now let's find out the max score with a simple query:

```
🦄 max(scorePerPhilosopher)
int ask(call(get('max'),get('scorePerPhilosopher')))
65536
```

Nice!

4. Write a first query, it can be a multi-liner. First step:

`.editor`

second step, we write the query:

```
query {
  philosophers
}
```

and here we have the answer:

```
any ask(query(node('philosophers',f(get('philosophers')))))
{
  philosophers: [ 'Aristotle', 'Kant', 'Plato', 'Russel', 'Turing', 'Wittgenstein' ]
}
```

5. Exit the console!

`ctrl + d`

### Examples

You can find all the examples in `__test__` folders

### Quick Guide

https://www.notion.so/AskQL-Documentation-cd065c579d0c44d381ddddc4682f5736

### Try It Yourself

### Tools

#### Test server

#### CLI (AskScript interpreter)

In order to run CLI:

1.  Build the code:

        npm run build

1.  Run:

        node dist/cli.js

## FAQ

### What's the difference between ask {<askcode>} and eval(<jscode>)?

JavaScript's eval( <javascript> ) is terrible at ensuring security. Query programs are executed against the same environment as your own programs. In AskQL, ask { <askscript> } runs on AskVM which is a separate execution context that you define yourself with the exact set of resources, values and limits the each incoming program needs.

## Troubleshooting

## Contributing

[Contributing guidelines](https://github.com/xFAANG/askql/blob/master/CONTRIBUTING.md)

## License

The code in this project is licensed under MIT license.

## Core Team

- Marcin Hagmajer (ex-Facebook)
- Łukasz Czerwiński (ex-Google)

<a href="https://xfaang.com" align="left">
  <img 
    src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/logo/logo.png" 
    align="left"
    title="xFAANG Logo" 
    width="236">
</a>
