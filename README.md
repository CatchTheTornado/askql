<a href="https://askql.org" align="right">
  <img src="https://xfaang-assets.s3.eu-west-3.amazonaws.com/logo/askql-logo-OW-cut.png" align="right"
     title="AskQL Logo" width="200">
 </a>

# AskQL

AskQL is a query language that can express every data request

## Why and what for?

- next milestone after GraphQL
- sending code to servers without the need to deploy
- new safe query language
- 4 - 6 kB of robust code
- compiled to clean functional code

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
const askql = require("askql");

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

### Instalation

1. Clone the repository

`git clone git@github.com:xFAANG/askql.git`

2. Install dependencies
   `npm i`

3. Build the project
   `npm run build`

4) Link the project to askql command
   `npm link`

Now it should be able to enter the console! (We use REPL for that)
`askql`

### Usage

1. Write a hello world!

In AskQL we only use single quotes:

```
🦄 'Hello world'
string ask('Hello world')
'Hello world'
```

In the response you get a compiled version of the program what is send asynchronously to the AskVM

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

3. Let's say we have a table of philosophers and their scores let's say in the meaning of their contribution for computer science!

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

Awesome!

4. Now let's find the max score with a simple query:

```
🦄 max(scorePerPhilosopher)
int ask(call(get('max'),get('scorePerPhilosopher')))
65536
```

Nice!

5. Write first query
   A query can be a multiliner!
   For that we write first:

`.editor`

and as second we write the first query:

```
query {
  philosophers
}
```

and here you have your answer:

```
any ask(query(node('philosophers',f(get('philosophers')))))
{
  philosophers: [ 'Aristotle', 'Kant', 'Plato', 'Russel', 'Turing', 'Wittgenstein' ]
}
```

6. Exit the console!

`ctrl + d`

### Examples

You can find all the examples in `__test__` folders

### Quick Guide

https://www.notion.so/AskQL-Documentation-cd065c579d0c44d381ddddc4682f5736

### Try It Yourself

### Tools

#### Test server

#### CLI

## Troubleshooting

## Contributing

[Contributing guidelines](https://github.com/xFAANG/askql/blob/master/CONTRIBUTING.md)

## License

The code in this project is licensed under MIT license.

## Core Team

- Marcin Hagmajer (ex-Facebook)
- Łukasz Czerwiński (ex-Google)
